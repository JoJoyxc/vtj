import {
  defineAsyncComponent,
  openBlock,
  createBlock,
  createVNode,
  withCtx
} from 'vue';
//@ts-ignore
import { PageComponent, setupPage, getApp } from '@dcloudio/uni-h5';

import type { UniRoute } from '../types';

function createPageComponent(loader: any) {
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
  const { path, meta = {} } = route;

  const isEntry = index === 0;
  // todo
  return {
    isQuit: isEntry,
    isEntry: isEntry,
    navigationBar: {
      titleText: 'uni-app3',
      type: 'default',
      style: 'default'
    },
    isNVue: false,
    route: path,
    ...meta
  };
}

export function injectUniRoutes(routes: UniRoute[], global: any = window) {
  const uniRoutes = routes.map((item, index) => {
    const component = createPageComponent(item.component);
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
