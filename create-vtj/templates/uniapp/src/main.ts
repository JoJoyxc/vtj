import { createSSRApp } from 'vue';
import {
  NodeEnv,
  ContextMode,
  createAdapter,
  LocalService,
  createServiceRequest,
  createProvider,
  createModules,
  loading,
  notify
} from '@vtj/uni-app';
import App from './App.vue';
import { name } from '../package.json';

const adapter = createAdapter({ loading, notify });
const service = new LocalService(createServiceRequest(notify));

const { provider } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Raw,
  modules: createModules(),
  adapter,
  service,
  project: {
    id: name
  }
});

export function createApp() {
  const app = createSSRApp(App);
  app.use(provider);

  return {
    app
  };
}
