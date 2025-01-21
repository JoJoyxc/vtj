import { createApp } from 'vue';
//@ts-ignore
import { plugin, setupApp } from '@dcloudio/uni-h5';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  type UniRoute
} from './injects';

export interface SetupUniAppOptions {
  App: any;
  routes: UniRoute[];
  manifest?: Record<string, any>;
  globalStyle?: Record<string, any>;
  tabBar?: Record<string, any>;
}

export function setupUniApp(options: SetupUniAppOptions) {
  const { App, routes } = options;
  injectUniConfig();
  injectUniGlobal();
  injectUniRoutes(routes);
  const app = createApp(setupApp(App));
  app.use(plugin);
  return app;
}
