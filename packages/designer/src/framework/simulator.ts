import { type Ref, watchEffect } from 'vue';
import { logger, type Dependencie } from '@vtj/core';
import { parseDeps, createAssetsCss, createAssetScripts } from '@vtj/renderer';
import { Assets } from './assets';
declare global {
  interface Window {
    __simulator__: Simulator;
    Vue?: any;
    VueRouter?: any;
    ElementPlus?: any;
  }
}

export class Simulator {
  public contentWindow: Window | null = null;
  constructor(public assets: Assets) {}
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
    const { scripts, css, materials, libraryExports, materialExports } =
      parseDeps(deps);
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
       __simulator__.ready(
        ${JSON.stringify(libraryExports)}, ${JSON.stringify(materialExports)}
       );
     </script> 
     </html>
    `);
    doc.close();
  }

  ready(libraryExports: string[] = [], materialExports: string[] = []) {
    const cw = this.contentWindow as any;
    const materials = materialExports.map((name: string) => {
      return cw[name];
    });

    this.assets.load(materials);

    console.log('ready', libraryExports, materialExports, materials);
  }
}
