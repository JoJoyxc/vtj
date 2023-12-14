import { type Ref, watchEffect } from 'vue';
import {
  logger,
  type Dependencie,
  Service,
  ProjectModel,
  emitter,
  EVENT_PROJECT_ACTIVED
} from '@vtj/core';
import { parseDeps, createAssetsCss, createAssetScripts } from '@vtj/renderer';
import { Assets } from './assets';
import { Renderer } from './renderer';

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
  assets: Assets;
  globals: Record<string, any>;
  service: Service;
}

export class Simulator {
  public contentWindow: Window | null = null;
  public assets: Assets;
  public globals: Record<string, any>;
  public renderer: Renderer | null = null;
  public service: Service;
  constructor(options: SimulatorOptions) {
    const { assets, globals = {}, service } = options;
    this.assets = assets;
    this.globals = globals;
    this.service = service;
    emitter.on(EVENT_PROJECT_ACTIVED, (project) => {
      const block = (project as ProjectModel).current;
      this.renderer?.dispose();
      if (block) {
        this.renderer?.render(block);
      }
    });
  }
  init(iframe: Ref<HTMLIFrameElement | undefined>, deps: Ref<Dependencie[]>) {
    watchEffect(() => {
      if (iframe.value && deps.value.length) {
        this.setup(iframe.value, deps.value);
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
              background: #fff;
              padding: 0;
              margin: 0;
              min-height: 100vh;
              width: 100%;
              height: 100%;
              font-size:14px;
            }
         </style>
         ${createAssetsCss(css)}
         ${createAssetScripts(scripts)}
         ${createAssetScripts(materials)}
       </head>
       <body> 
       </body>
       <script>
       __simulator__.ready(${JSON.stringify(libraryExports)},
        ${JSON.stringify(materialExports)}, 
    ${JSON.stringify(materialMapLibrary)});
     </script> 
     </html>
    `);
    doc.close();
  }

  ready(
    libraryExports: string[] = [],
    materialExports: string[] = [],
    materialMapLibrary: Record<string, string> = {}
  ) {
    const cw = this.contentWindow as any;
    const materials = materialExports.map((name: string) => {
      return cw[name];
    });

    this.assets.load(materials);
    const env = this.createEnv(
      libraryExports,
      materialExports,
      materialMapLibrary
    );
    this.renderer = new Renderer(env, this.service);
  }

  createEnv(
    libraryExports: string[] = [],
    materialExports: string[] = [],
    materialMapLibrary: Record<string, string> = {}
  ): SimulatorEnv {
    const cw = this.contentWindow as any;
    const materials = materialExports.reduce((prev, cur) => {
      prev[cur] = cw[cur];
      return prev;
    }, {} as any);

    const library = libraryExports.reduce((prev, cur) => {
      prev[cur] = cw[cur];
      return prev;
    }, {} as any);

    const components: Record<string, any> = {};

    const { groups, componentMap } = this.assets;
    for (const group of groups) {
      const names = group.names || [];
      const lib = library[materialMapLibrary[group.library || '']];
      if (lib) {
        names.forEach((name) => {
          const desc = componentMap.get(name);
          if (desc) {
            components[name] = desc.parent
              ? lib[desc.parent]?.[desc.alias || name]
              : lib[desc.alias || name];
          } else {
            components[name] = lib[name];
          }
        });
      }
    }

    return {
      window: cw,
      Vue: cw.Vue,
      library,
      materials,
      components,
      container: cw.document.body,
      apis: {},
      globals: this.globals
    };
  }

  dispose() {
    this.renderer?.dispose();
    this.contentWindow = null;
    this.renderer = null;
  }
}
