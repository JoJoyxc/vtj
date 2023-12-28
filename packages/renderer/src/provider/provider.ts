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
import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent
} from '../utils';
import { ContextMode } from '../constants';

export interface ProviderOptions {
  service: Service;
  project: ProjectSchema;
  mode?: ContextMode;
  adapter?: Partial<ProvideAdapter>;
  dependencies?: Record<string, () => Promise<any>>;
  globals?: Record<string, any>;
  file?: PageFile | BlockFile;
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
      this.load(project);
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

  ready(callback: () => void) {
    if (this.isReady) {
      callback();
    } else {
      this.listeners.push(callback);
    }
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
