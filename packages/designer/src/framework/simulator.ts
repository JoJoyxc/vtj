import { type Ref, type ShallowRef, shallowRef, watchEffect, watch } from 'vue';
import { type Dependencie } from '@vtj/core';
import {
  parseDeps,
  createAssetsCss,
  createAssetScripts,
  createSchemaApis,
  getRawComponent,
  logger
} from '@vtj/renderer';
import { Renderer } from './renderer';
import { Designer } from './designer';
import { type Engine } from './engine';
declare global {
  interface Window {
    __simulator__: Simulator;
    Vue?: any;
    VueRouter?: any;
    ElementPlus?: any;
  }
}

export interface SimulatorEnv {
  window: Window;
  Vue: any;
  library: Record<string, any>;
  materials: Record<string, any>;
  components: Record<string, any>;
  apis: Record<string, any>;
  container: HTMLElement;
  globals: Record<string, any>;
}

export interface SimulatorOptions {
  engine: Engine;
}

export class Simulator {
  private listeners: Array<() => void> = [];
  private isReady: boolean = false;
  public contentWindow: Window | null = null;
  public renderer: Renderer | null = null;
  public designer: ShallowRef<Designer | null> = shallowRef(null);
  public engine: Engine;
  constructor(options: SimulatorOptions) {
    const { engine } = options;
    this.engine = engine;

    watch(this.engine.current, () => {
      this.refresh();
    });
  }
  init(iframe: Ref<HTMLIFrameElement | undefined>, deps: Ref<Dependencie[]>) {
    watchEffect(() => {
      if (iframe.value && deps.value.length) {
        this.isReady = false;
        this.setup(iframe.value, deps.value);
        if (this.contentWindow) {
          this.designer.value?.dispose();
          this.designer.value = new Designer(
            this.engine,
            this.contentWindow,
            deps
          );
        }
      }
    });
  }

  private setup(iframe: HTMLIFrameElement, deps: Dependencie[]) {
    const cw = iframe.contentWindow;
    if (!cw) {
      logger.warn('Simulator contentWindow is null');
      return;
    }
    cw.__simulator__ = this;
    const doc = cw.document;
    this.contentWindow = cw;
    const {
      scripts,
      css,
      materials,
      libraryExports,
      materialExports,
      materialMapLibrary
    } = parseDeps(deps);
    doc.open();
    doc.write(`
     <!DOCTYPE html>
     <html lang="zh-CN">
       <head>
       <meta charset="utf-8">
       <meta name="viewport"
             content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,viewport-fit=cover"/>
         <style>
            html, body, #app {
              padding: 0;
              margin: 0;
              min-height: 100vh;
              width: 100%;
              background: #fff;
            }
         </style>
         ${createAssetsCss(css)}
         ${createAssetScripts(scripts)}
         ${createAssetScripts(materials)}
       </head>
       <body> 
       </body>
       <script>
       __simulator__.emitReady(${JSON.stringify(libraryExports)},
        ${JSON.stringify(materialExports)}, 
    ${JSON.stringify(materialMapLibrary)});
     </script> 
     </html>
    `);
    doc.close();
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

  emitReady(
    libraryExports: string[] = [],
    materialExports: string[] = [],
    materialMapLibrary: Record<string, string> = {}
  ) {
    this.renderer?.dispose();
    this.renderer = null;
    const cw = this.contentWindow as any;
    const materials = materialExports.map((name: string) => {
      return cw[name];
    });
    const { assets, service, current } = this.engine;

    assets.load(materials);
    const env = this.createEnv(
      libraryExports,
      materialExports,
      materialMapLibrary
    );
    this.renderer = new Renderer(env, service, this.designer.value);
    if (current.value) {
      this.renderer.render(current.value);
    }
    this.emits();
  }

  createEnv(
    libraryExports: string[] = [],
    materialExports: string[] = [],
    materialMapLibrary: Record<string, string> = {}
  ): SimulatorEnv {
    const cw = this.contentWindow as any;
    const { engine } = this;
    const { project, assets, provider } = engine;
    const materials = materialExports.reduce((prev, cur) => {
      prev[cur] = cw[cur];
      return prev;
    }, {} as any);

    const library = libraryExports.reduce((prev, cur) => {
      prev[cur] = cw[cur];
      return prev;
    }, {} as any);

    const components: Record<string, any> = {};

    const { groups, componentMap } = assets;
    for (const group of groups) {
      const names = group.names || [];
      const lib = library[materialMapLibrary[group.library || '']];
      if (lib) {
        names.forEach((name) => {
          const desc = componentMap.get(name);
          if (desc) {
            components[name] = getRawComponent(desc, lib);
          } else {
            components[name] = lib[name];
          }
        });
      }
    }

    const { adapter, globals } = provider;
    const apis = createSchemaApis(project.value?.apis, adapter);

    return {
      window: cw,
      Vue: cw.Vue,
      library,
      materials,
      components,
      container: cw.document.body,
      apis,
      globals
    };
  }

  refresh() {
    this.renderer?.dispose();
    const current = this.engine.current.value;
    if (current) {
      this.renderer?.render(current);
    }
  }

  dispose() {
    this.renderer?.dispose();
    this.designer.value?.dispose();
    this.contentWindow = null;
    this.renderer = null;
    this.designer.value = null;
  }
}
