import type { UniConfig, JSFunction, PageFile } from '@vtj/core';
import type { Provider } from '@vtj/renderer';
import type { SetupUniAppOptions, UniRoute } from '../types';
import { mergeOptions } from '../utils';
import { APP_LIFE_CYCLE } from '../constants';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures
} from '../injects';

import { install } from './plugin';

export function setupUniApp(options: SetupUniAppOptions) {
  const opts = mergeOptions(options);
  const { Vue, App, UniH5, routes = [], pagesJson = {}, window } = opts;
  const { plugin, setupApp } = UniH5;
  injectUniFeatures(opts, window);
  injectUniConfig(opts, window);
  injectUniGlobal(UniH5, window);
  injectUniRoutes(Vue, UniH5, routes, pagesJson, window);
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

export async function createUniRoutes(provider: Provider, createRenderer: any) {
  const pages = provider.project?.pages || [];
  const routes: UniRoute[] = [];
  for (const page of pages) {
    const dsl = await provider.getDsl(page.id);
    if (!dsl) continue;
    const { renderer } = createRenderer({ dsl, components: {} });
    const home = provider.project?.homepage === page.id;
    if (home) {
      routes.unshift({
        id: page.id,
        path: '/',
        component: renderer,
        style: {
          navigationBarTitleText: page.title,
          ...page.style
        },
        needLogin: page.needLogin,
        home
      });
    }
    routes.push({
      id: page.id,
      path: `/pages/${page.id}`,
      component: renderer,
      style: {
        navigationBarTitleText: page.title,
        ...page.style
      },
      needLogin: page.needLogin,
      home
    });
  }
}

export async function createPreviewUniRoutes(
  provider: Provider,
  id: string,
  createRenderer: any
): Promise<UniRoute[]> {
  const file = provider.getFile(id);
  const dsl = await provider.getDsl(id);
  if (!file || !dsl) return [];

  const { renderer } = createRenderer({ dsl, components: {} });
  const home = provider.project?.homepage === id;
  return [
    {
      id,
      path: `/pages/${id}`,
      component: renderer,
      style: {
        navigationBarTitleText: file.title,
        ...(file as PageFile).style
      },
      needLogin: (file as PageFile).needLogin,
      home
    }
  ];
}
