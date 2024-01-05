import { type App, type InjectionKey } from 'vue';
import {
  type ProjectSchema,
  type PageFile,
  type BlockFile,
  type Service,
  type Material
} from '@vtj/core';
import { type Request, type Jsonp, jsonp, loadScript } from '@vtj/utils';
import { request } from './defaults';
import { createApis } from './apis';
import { logger } from '../utils';

import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent
} from '../utils';
import { ContextMode } from '../constants';
import { createRenderer, createLoader } from '../render';

export const providerKey: InjectionKey<Provider> = Symbol('Provider');

export interface ProviderOptions {
  service: Service;
  project: Partial<ProjectSchema>;
  mode?: ContextMode;
  adapter?: Partial<ProvideAdapter>;
  dependencies?: Record<string, () => Promise<any>>;
  globals?: Record<string, any>;
}

export interface ProvideAdapter {
  request: Request;
  jsonp: Jsonp;
}

export class Provider {
  public mode: ContextMode;
  public globals: Record<string, any> = {};
  public adapter: ProvideAdapter = { request, jsonp };
  public apis: Record<string, (...args: any[]) => Promise<any>> = {};
  public dependencies: Record<string, () => Promise<any>> = {};
  public library: Record<string, any> = {};
  public service: Service;
  public project: ProjectSchema | null = null;
  public components: Record<string, any> = {};
  private listeners: Array<() => void> = [];
  private isReady: boolean = false;
  constructor(options: ProviderOptions) {
    const {
      mode = ContextMode.Runtime,
      dependencies,
      project,
      service,
      adapter = {},
      globals = {}
    } = options;
    this.mode = mode;
    this.service = service;
    if (dependencies) {
      this.dependencies = dependencies;
    }
    Object.assign(this.globals, globals);
    Object.assign(this.adapter, adapter);

    if (mode === ContextMode.Runtime) {
      this.load(project as ProjectSchema);
    } else {
      this.emits();
    }
  }

  async load(project: ProjectSchema) {
    this.project = await this.service.init(project);
    const { dependencies: deps = [], apis } = this.project;
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
      this.apis = createApis(apis, this.adapter);
    }

    this.emits();
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
      if (
        !installed[name] &&
        (typeof library.install === 'function' || typeof library === 'function')
      ) {
        app.use(library);
        installed[name] = true;
      }
    }

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
  async getRenderComponent(id: string) {
    const file = this.getFile(id);
    if (!file) {
      logger.warn(`Can not find file: ${id}`);
      return null;
    }
    const dsl = await this.service.getFile(file.id).catch(() => null);
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
        return (await this.service.getFile(id)) || null;
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
