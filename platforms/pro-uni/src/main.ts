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
import {
  setupUniApp,
  createUniAppComponent,
  createUniRoutes,
  notify,
  loading
} from '@vtj/uni';

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

const init = async (provider: Provider) => {
  const { Vue, UniH5 } = window as any;
  const project = provider.project;
  if (!project) return;

  const App = createUniAppComponent(project.uniConfig || {}, (script) =>
    parseFunction(script, window, false, true)
  );
  const routes = await createUniRoutes(provider, createRenderer);

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
