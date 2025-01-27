import { createApp } from 'vue';
//@ts-ignore
import { plugin, setupApp } from '@dcloudio/uni-h5';
import type { SetupUniAppOptions } from '../types';
import { mergeOptions } from '../utils';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures
} from '../injects';

export function setupUniApp(options: SetupUniAppOptions) {
  const opts = mergeOptions(options);
  const { App, routes } = opts;
  injectUniFeatures(opts);
  injectUniConfig(opts);
  injectUniGlobal();
  injectUniRoutes(routes);
  const app = createApp(setupApp(App));
  app.use(plugin);
  return app;
}
