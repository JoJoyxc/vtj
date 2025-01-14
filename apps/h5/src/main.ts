import {
  createProvider,
  LocalService,
  createModules,
  NodeEnv,
  autoUpdate,
  ContextMode,
  notify,
  loading,
  createAdapter,
  createServiceRequest
} from '@vtj/h5';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { name } from '../package.json';
import './style/index.scss';

const app = createApp(App);
const adapter = createAdapter({ loading, notify });
const service = new LocalService(createServiceRequest(notify));
const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Raw,
  modules: createModules(),
  adapter,
  service,
  router,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
  },
  project: {
    id: name
  }
});

onReady(async () => {
  app.use(router);
  app.use(provider);
  app.mount('#app');
});

if (process.env.NODE_ENV === 'production') {
  autoUpdate();
}