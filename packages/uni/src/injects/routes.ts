import {
  defineAsyncComponent,
  openBlock,
  createBlock,
  createVNode,
  withCtx
} from 'vue';
//@ts-ignore
import { PageComponent, setupPage, getApp } from '@dcloudio/uni-h5';

export interface UniRoute {
  path: string;
  component: any;
  meta?: Record<string, any>;
}

function createPageComponent(loader: any) {
  return {
    mpType: 'page',
    setup() {
      const app = getApp();
      const query = (app && app.$route && app.$route.query) || {};
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

function createPageMeta(meta: Record<string, any> = {}) {
  return {
    isQuit: true,
    isEntry: true,
    navigationBar: {
      titleText: 'uni-app3',
      type: 'default',
      style: 'default'
    },
    isNVue: false,
    route: 'pages/index/index',
    ...meta
  };
}

export function injectUniRoutes(routes: UniRoute[], global: any = window) {
  const uniRoutes = routes.map((item) => {
    const component = createPageComponent(item.component);
    const meta = createPageMeta(item.meta);
    return {
      path: item.path,
      alias: item.path,
      meta,
      component
    };
  });
  global.__uniRoutes = uniRoutes;
}
