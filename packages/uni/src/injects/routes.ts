// import {
//   defineAsyncComponent,
//   openBlock,
//   createBlock,
//   createVNode,
//   withCtx
// } from 'vue';
//@ts-ignore
// import { PageComponent, setupPage, getApp } from '@dcloudio/uni-h5';

import type { UniRoute } from '../types';

import { getNavigationBar } from '../utils';

function createPageComponent(Vue: any, UniH5: any, loader: any) {
  const { defineAsyncComponent, openBlock, createBlock, withCtx, createVNode } =
    Vue;
  const { PageComponent, setupPage, getApp } = UniH5;
  return {
    mpType: 'page',
    setup() {
      const app = getApp();
      const query = app?.$route?.query || {};
      const component =
        typeof loader === 'function' ? defineAsyncComponent(loader) : loader;

      return () => (
        openBlock(),
        createBlock(PageComponent, null, {
          page: withCtx(() => [
            createVNode(
              setupPage(component),
              Object.assign({}, query, { ref: 'page' }),
              null,
              512
            )
          ]),
          _: 1
        })
      );
    }
  };
}

function createPageMeta(route: UniRoute, index: number) {
  const { path, style = {}, meta = {} } = route;

  const isEntry = index === 0;
  // todo
  return {
    isQuit: isEntry,
    isEntry: isEntry,
    navigationBar: {
      type: 'default',
      ...getNavigationBar(style)
    },
    isNVue: false,
    route: path,
    ...meta
  };
}

export function injectUniRoutes(
  Vue: any,
  UniH5: any,
  routes: UniRoute[],
  global: any = window
) {
  const uniRoutes = routes.map((item, index) => {
    const component = createPageComponent(Vue, UniH5, item.component);
    const meta = createPageMeta(item, index);
    const { path } = item;
    return {
      path,
      alias: path,
      meta,
      component
    };
  });
  global.__uniRoutes = uniRoutes;
}
