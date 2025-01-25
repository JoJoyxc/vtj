import type { DefineComponent } from 'vue';

export interface UniRoute {
  path: string;
  component: DefineComponent | (() => Promise<DefineComponent>);
  meta?: Record<string, any>;
}

export type RouterMode = 'hash' | 'history';

export interface SetupUniAppOptions {
  App: any;
  routes: UniRoute[];
  manifest?: Record<string, any>;
  globalStyle?: Record<string, any>;
  tabBar?: Record<string, any>;
  // routerMode?: RouterMode;
  // base?: string;
  // routerBase?: string;
}
