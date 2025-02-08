// import { createApp } from 'vue';
//@ts-ignore
// import { plugin, setupApp } from '@dcloudio/uni-h5';
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
  const { Vue, App, UniH5, routes = [], window } = opts;
  const { plugin, setupApp } = UniH5;
  injectUniFeatures(opts, window);
  injectUniConfig(opts, window);
  injectUniGlobal(UniH5, window);
  injectUniRoutes(Vue, UniH5, routes, window);
  const app = Vue.createApp(setupApp(App));
  app.use(plugin);
  return app;
}
