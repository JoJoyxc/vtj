import { type Ref, watch } from 'vue';
import { logger, type Dependencie } from '@vtj/core';
import { parseDeps, createAssetsCss, createAssetScripts } from '@vtj/renderer';

declare global {
  interface Window {
    __simulator__: Simulator;
  }
}

export class Simulator {
  public contentWindow: Window | null = null;
  constructor() {}
  init(iframe: Ref<HTMLIFrameElement | undefined>, deps: Ref<Dependencie[]>) {
    watch(
      [iframe, deps],
      ([el, v]) => {
        if (el && v) {
          this.setup(el, v);
        }
      },
      {
        immediate: true
      }
    );
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
    const { scripts, css } = parseDeps(deps);

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
              font-size:12px;
            }
         </style>
         ${createAssetsCss(css)}
         ${createAssetScripts(scripts)}
       </head>
       <body> 
       </body>
       <script>
       __simulator__.ready();
     </script> 
     </html>
    `);
    doc.close();
  }

  ready() {
    console.log('simulator ready');
  }
}
