import { type App, type InjectionKey, inject } from 'vue';
import { type Router } from 'vue-router';
import {
  type ProjectSchema,
  type PageFile,
  type BlockFile,
  type Service,
  type Material
} from '@vtj/core';
import { type IStaticRequest, type Jsonp, jsonp, loadScript } from '@vtj/utils';
import { request } from './defaults';
import { createSchemaApis } from './apis';
import { logger, isVuePlugin } from '../utils';

import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent
} from '../utils';
import { ContextMode } from '../constants';
import { createRenderer, createLoader } from '../render';
import { PageContainer } from './page';

export const providerKey: InjectionKey<Provider> = Symbol('Provider');

export interface ProviderOptions {
  service: Service;
  project?: Partial<ProjectSchema>;
  modules?: Record<string, () => Promise<any>>;
  mode?: ContextMode;
  adapter?: Partial<ProvideAdapter>;
  router?: Router;
  dependencies?: Record<string, () => Promise<any>>;
  globals?: Record<string, any>;
}

export interface ProvideAdapter {
  request: IStaticRequest;
  jsonp: Jsonp;
}

export class Provider {
  public mode: ContextMode;
  public globals: Record<string, any> = {};
  public modules: Record<string, () => Promise<any>> = {};
  public adapter: ProvideAdapter = { request, jsonp };
  public apis: Record<string, (...args: any[]) => Promise<any>> = {};
  public dependencies: Record<string, () => Promise<any>> = {};
  public library: Record<string, any> = {};
  public service: Service;
  public project: ProjectSchema | null = null;
  public components: Record<string, any> = {};
  private router: Router | null = null;
  private listeners: Array<() => void> = [];
  private isReady: boolean = false;
  constructor(options: ProviderOptions) {
    const {
      service,
      mode = process.env.NODE_ENV === 'production'
        ? ContextMode.Raw
        : ContextMode.Runtime,
      dependencies,
      project = {},
      adapter = {},
      globals = {},
      modules = {},
      router = null
    } = options;
    this.mode = mode;
    this.modules = modules;
    this.service = service;
    this.router = router;
    if (dependencies) {
      this.dependencies = dependencies;
    }
    Object.assign(this.globals, globals);
    Object.assign(this.adapter, adapter);
    this.load(project as ProjectSchema);
  }

  async load(project: ProjectSchema) {
    const module = this.modules['.vtj/project.json'];
    this.project = module ? await module() : await this.service.init(project);
    if (!this.project) {
      throw new Error('project is null');
    }
    const { dependencies: deps = [], apis } = this.project as ProjectSchema;
    const { dependencies, library, components } = this;
    const {
      libraryExports,
      libraryMap,
      materials,
      materialExports,
      materialMapLibrary
    } = parseDeps(deps);

    for (const libraryName of libraryExports) {
      const raw = dependencies[libraryName];
      if (raw) {
        (window as any)[libraryName] = library[libraryName] = await raw();
      } else {
        const urls = libraryMap[libraryName] || [];
        for (const url of urls) {
          if (isCSSUrl(url)) {
            await loadCss(libraryName, url);
          }
          if (isJSUrl(url)) {
            await loadScript(url);
          }
          library[libraryName] = (window as any)[libraryName];
        }
      }
    }

    for (const materialUrl of materials) {
      await loadScript(materialUrl);
    }

    for (const materialExport of materialExports) {
      const material = (window as any)[materialExport] as Material;
      const lib = (window as any)[materialMapLibrary[materialExport]];
      if (material && lib) {
        material.components.forEach((item) => {
          components[item.name] = getRawComponent(item, lib);
        });
      }
    }

    if (apis) {
      this.apis = createSchemaApis(apis, this.adapter);
    }
    this.initRouter();
    this.emits();
  }

  private initRouter() {
    const { router, project } = this;
    if (!router) return;
    router.addRoute({
      path: '/page/:id',
      name: 'VtjPage',
      component: PageContainer
    });

    if (project?.homepage) {
      router.addRoute({
        path: '/',
        name: 'VtjHomepage',
        component: PageContainer
      });
    }
  }

  private emits() {
    this.isReady = true;
    for (const listener of this.listeners) {
      listener();
    }
    this.listeners = [];
  }

  install(app: App) {
    const installed = app.config.globalProperties.installed || {};
    for (const [name, library] of Object.entries(this.library)) {
      if (!installed[name] && isVuePlugin(library)) {
        app.use(library);
        installed[name] = true;
      }
    }
    app.provide(providerKey, this);
    app.config.globalProperties.installed = installed;
  }

  ready(callback: () => void) {
    if (this.isReady) {
      callback();
    } else {
      this.listeners.push(callback);
    }
  }
  getFile(id: string): PageFile | BlockFile | null {
    const { blocks = [] } = this.project || {};
    return this.getPage(id) || blocks.find((item) => item.id === id) || null;
  }
  getPage(id: string): PageFile | null {
    const { pages = [] } = this.project || {};
    const finder = (
      id: string,
      pages: PageFile[] = []
    ): PageFile | undefined => {
      for (const page of pages) {
        if (page.id === id) {
          return page;
        } else {
          if (page.children && page.children.length) {
            const match = finder(id, page.children);
            if (match) {
              return match;
            }
          }
        }
      }
    };
    return finder(id, pages) || null;
  }
  getHomepage(): PageFile | null {
    const { homepage } = this.project || {};
    if (!homepage) return null;
    return this.getPage(homepage);
  }
  async getDsl(id: string) {
    const module = this.modules[`.vtj/files/${id}.json`];
    return module ? await module() : this.service.getFile(id).catch(() => null);
  }
  async getRenderComponent(id: string) {
    const file = this.getFile(id);
    if (!file) {
      logger.warn(`Can not find file: ${id}`);
      return null;
    }
    const rawPath = `.vtj/vue/${id}.vue`;
    const rawModule = this.modules[rawPath];
    if (rawModule) {
      return await rawModule();
    }
    const dsl = await this.getDsl(file.id);
    if (!dsl) {
      logger.warn(`Can not find dsl: ${id}`);
      return null;
    }
    const { library, components, mode, apis } = this;
    const options = {
      mode,
      Vue: library.Vue,
      components,
      libs: library,
      apis,
      window
    };
    const loader = createLoader({
      getDsl: async (id: string) => {
        return (await this.getDsl(id)) || null;
      },
      options
    });

    const { renderer } = createRenderer({
      ...options,
      dsl,
      loader
    });

    return renderer;
  }
}

export function createProvider(options: ProviderOptions) {
  const provider = new Provider(options);
  const onReady = (callback: () => void) => provider.ready(callback);
  return {
    provider,
    onReady
  };
}

export function useProvider(): Provider {
  const provider = inject(providerKey);
  if (!provider) {
    throw new Error('Can not find provider');
  }
  return provider;
}
