// import { createApp } from 'vue';
//@ts-ignore
// import { plugin, setupApp } from '@dcloudio/uni-h5';
import type {
  UniConfig,
  JSFunction,
  PageFile,
  ProjectSchema,
  BlockSchema
} from '@vtj/core';
import type { SetupUniAppOptions, UniRoute } from '../types';
import { mergeOptions } from '../utils';
import { APP_LIFE_CYCLE } from '../constants';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures
} from '../injects';

import { install } from './plugin';

export function setupUniApp(options: SetupUniAppOptions) {
  const opts = mergeOptions(options);
  const { Vue, App, UniH5, routes = [], pagesJson = {}, window } = opts;
  const { plugin, setupApp } = UniH5;
  injectUniFeatures(opts, window);
  injectUniConfig(opts, window);
  injectUniGlobal(UniH5, window);
  injectUniRoutes(Vue, UniH5, routes, pagesJson, window);
  const app = Vue.createApp(setupApp(App));
  app.use(install, UniH5);
  app.use(plugin);
  return app;
}

export function createUniAppComponent(
  uniConfig: UniConfig,
  parser: (script: JSFunction) => Function
) {
  const comp: Record<string, Function> = {};
  Object.entries(uniConfig).forEach(([name, value]) => {
    if (APP_LIFE_CYCLE.includes(name) && value) {
      comp[name] = parser(value);
    }
  });
  return comp;
}

export function createUniRoutes(
  Vue: any,
  pages: PageFile[],
  homepage?: string
) {
  console.log(Vue, pages, homepage);
}

const dsl: BlockSchema = {
  name: 'UniPageDemo',

  nodes: [
    {
      name: 'View',
      children: [
        {
          name: 'Button',
          children: 'Button'
        }
      ]
    }
  ],
  lifeCycles: {
    onLoad: {
      type: 'JSFunction',
      value: `
      (opt)=>{
      console.log('onLoad app',opt, uni)
      }
        `
    },
    onShow: {
      type: 'JSFunction',
      value: `
      ()=>{
      console.log('onShow app')
      }
        `
    }
  }
};

export function createPreviewUniRoutes(
  Vue: any,
  createRenderer: any
): UniRoute[] {
  // const loader = async () => {
  //   console.log('loader');
  //   return {
  //     setup() {
  //       console.log('setup--');
  //     },
  //     render() {
  //       return Vue.h('View', 'aaaa');
  //     }
  //   };
  // };
  const { renderer } = createRenderer({ dsl, components: {} });

  const ComponentContainer = Vue.defineComponent({
    setup() {
      return () => Vue.h(renderer);
    }
  });

  return [
    {
      path: '/pages/1',
      component: renderer,
      style: {
        navigationBarTitleText: 'Page 1'
      },
      home: false
    }
  ];
}
