import {
  createProvider,
  LocalService,
  NodeEnv,
  ContextMode,
  createAdapter,
  createServiceRequest,
  createRenderer,
  parseFunction,
  type Provider
} from '@vtj/renderer';
import type { BlockSchema } from '@vtj/core';
import {
  setupUniApp,
  createUniAppComponent,
  createPreviewUniRoutes
} from '@vtj/uni';
import { notify, loading } from './shared';

const adapter = createAdapter({ loading, notify });
const service = new LocalService(createServiceRequest(notify));
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

const init = (provider: Provider) => {
  const { Vue, UniH5 } = window as any;
  const project = provider.project;
  if (!project) return;
  // const { renderer } = createRenderer({ dsl, components: {} });

  const App = createUniAppComponent(project.uniConfig || {}, (script: any) =>
    parseFunction(script, window, false, true)
  );

  const routes = createPreviewUniRoutes(Vue, createRenderer);

  const app = setupUniApp({
    Vue,
    App,
    UniH5,
    routes
  });
  app.use(provider);
  app.mount(document.body);
};

onReady(() => init(provider));
