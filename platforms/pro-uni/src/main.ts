import {
  createProvider,
  LocalService,
  NodeEnv,
  ContextMode,
  createAdapter,
  createServiceRequest,
  createRenderer
} from '@vtj/renderer';
import type { BlockSchema } from '@vtj/core';
import { setupUniApp } from '@vtj/uni';

// import { createApp } from 'vue';
// import router from './router';
// import App from './App.vue';
// import { name } from '../package.json';
// import './style/index.scss';

const adapter = createAdapter({});
const service = new LocalService(createServiceRequest());
const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Runtime,
  materialPath: '../',
  adapter,
  service,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
  }
});

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
const init = () => {
  const { renderer } = createRenderer({ dsl, components: {} });
  const { Vue, UniH5 } = window as any;
  return setupUniApp({
    Vue,
    App: {},
    UniH5,
    routes: [
      {
        path: '/pages/:id',
        component: renderer,
        style: {
          navigationBarTitleText: 'Page 1'
        },
        home: false
      }
    ]
  });
};

onReady(async () => {
  const app = init();
  app.use(provider);
  app.mount(document.body);
});
