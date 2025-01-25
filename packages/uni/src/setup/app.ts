import { createApp } from 'vue';
//@ts-ignore
import { plugin, setupApp } from '@dcloudio/uni-h5';
import type { SetupUniAppOptions } from '../types';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures
} from '../injects';

export function setupUniApp(options: SetupUniAppOptions) {
  const { App, routes } = options;
  injectUniFeatures(options);
  injectUniConfig();
  injectUniGlobal();
  injectUniRoutes(routes);
  const app = createApp(setupApp(App));
  app.use(plugin);
  return app;
}
