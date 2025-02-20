import type { UniConfig, JSFunction } from '@vtj/core';
import type { Provider } from '@vtj/renderer';
import type { SetupUniAppOptions, UniRoute } from '../types';
import { mergeOptions } from '../utils';
import { APP_LIFE_CYCLE } from '../constants';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures,
  injectUniCSS
} from '../injects';

import { install } from './plugin';

export function setupUniApp(options: SetupUniAppOptions) {
  const opts = mergeOptions(options);
  const {
    Vue,
    App,
    UniH5,
    routes = [],
    pagesJson = {},
    manifestJson = {},
    window,
    css = ''
  } = opts;
  const { plugin, setupApp } = UniH5;
  injectUniFeatures(opts, window);
  injectUniConfig(opts, window);
  injectUniGlobal(UniH5, window);
  injectUniRoutes(Vue, UniH5, routes, pagesJson, window);
  injectUniCSS(manifestJson.appid || Date.now(), css, window);
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

export async function createUniRoutes(
  provider: Provider,
  createRenderer: any,
  includeBlock: boolean = false,
  basePath: string = '/pages'
) {
  const pages = provider.project?.pages || [];
  const routes: UniRoute[] = [];
  for (const page of pages) {
    const dsl = await provider.getDsl(page.id);
    if (!dsl) continue;
    const { renderer } = createRenderer({ dsl, components: {} });
    const home = provider.project?.homepage === page.id;
    routes.push({
      id: page.id,
      path: `${basePath}/${page.id}`,
      component: renderer,
      style: {
        navigationBarTitleText: page.title,
        ...page.style
      },
      needLogin: page.needLogin,
      home
    });
  }

  const homeRoute = routes.find((route) => !!route.home) || routes[0];
  if (homeRoute) {
    routes.unshift({
      ...homeRoute,
      path: '/'
    });
    routes.unshift({
      ...homeRoute,
      path: basePath
    });
  }

  if (includeBlock) {
    const blocks = provider.project?.blocks || [];
    for (const block of blocks) {
      const dsl = await provider.getDsl(block.id);
      if (!dsl) continue;
      const { renderer } = createRenderer({ dsl, components: {} });
      routes.push({
        id: block.id,
        path: `${basePath}/${block.id}`,
        component: renderer,
        style: {
          navigationStyle: 'custom'
        }
      });
    }
  }

  return routes;
}
