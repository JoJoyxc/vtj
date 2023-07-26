import {
  createApp,
  App,
  ShallowRef,
  shallowRef,
  ComputedRef,
  computed
} from 'vue';
import { Router, useRouter } from 'vue-router';
import { merge } from '@vtj/utils';
import { XSimpleMask } from '@vtj/ui';
import IDELink from './components/Link';
import PageContainer from './components/PageContainer';
import PreviewContainer from './components/PreviewContainer';
import MaskContainer from './components/MaskContainer';
import Homepage from './components/Homepage';
import { ServiceType, Service } from './Service';

import {
  VUE,
  parseDependencies,
  loadCss,
  loadScripts,
  getLibs,
  parseApis,
  install,
  ProjectSchema,
  PageSchema,
  SummarySchema,
  getPages
} from './shared';

export interface ProjectProvider {
  // 项目id
  id: string;
  // 项目名称
  name: string;
  // 路由模式
  mode: 'hash' | 'history';
  // 路由前缀路径
  base: string;
  // 页面路由前缀路径
  page: string;
  // 区块预览路由前缀路径
  preview: string;
  // 首页路由
  home: string;
}

export interface IDEProvider extends Record<string, any> {
  // IDE 路径
  path?: string;
  // 链接按钮文本
  text?: string;
}

export interface ProviderBuiltinComponents {
  // 框架母版组件
  Mask?: any;

  // 404页面组件
  Empty?: any;
}

export interface ProviderOptions {
  //服务类型
  service: ServiceType;

  // 项目配置
  project: ProjectProvider;

  // 文件模块 service = file 是，需要传
  modules?: Record<string, () => Promise<any>>;

  // IDE 配置
  ide?: null | IDEProvider;

  // Vue应用
  app?: App;

  // 路由实例
  router?: Router;

  // 显示启动页
  startup?: boolean;

  // 内置组件
  components?: ProviderBuiltinComponents;
}

const defaults: ProviderOptions = {
  service: 'storage',
  project: {
    id: '',
    name: '',
    base: '/',
    mode: 'hash',
    page: '/page',
    preview: '/preview',
    home: '/'
  },
  components: {},
  ide: undefined
};

export class Provider {
  public options: ProviderOptions;
  public caches: Record<string, any> = {};
  public service: Service;
  public dsl: ShallowRef<ProjectSchema | null> = shallowRef(null);
  public pages?: ComputedRef<PageSchema[]>;
  public blocks?: ComputedRef<SummarySchema[]>;
  public apis?: ComputedRef<Record<string, any>>;
  constructor(options: Partial<ProviderOptions> = {}) {
    const app = options.app;
    // merge app 会引发警告
    delete options.app;
    this.options = merge(
      {},
      defaults,
      window.__VTJ_PROVIDER_OPTIONS__,
      options
    );
    this.options.app = app;
    const { service, project, modules } = this.options;
    this.service = new Service(service, project.id, modules);
  }
  async init() {
    const { ide, router, app } = this.options;
    this.dsl.value = await this.service.getProject();
    this.pages = computed(() => getPages(this.dsl.value?.pages ?? []));
    this.blocks = computed(() => this.dsl.value?.blocks ?? []);
    this.apis = computed(() => parseApis(this.dsl.value?.apis || []));
    if (app) {
      await this.setup(app);
    }
    if (ide) {
      this.createLink(ide);
    }
    if (router) {
      this.createRoutes();
    }
  }

  private createLink(props: IDEProvider) {
    const app = createApp(IDELink, props);
    const el = document.createElement('div');
    document.body.appendChild(el);
    app.mount(el);
  }
  private createRoutes() {
    const { router, components = {}, project, startup } = this.options;
    const { Mask = XSimpleMask } = components;
    if (!router) return;

    if (Mask) {
      router.addRoute({
        path: project.preview,
        name: 'VtjPreviewMask',
        component: MaskContainer,
        children: [
          {
            path: ':id',
            name: 'vtj-preview',
            props: (route: any) => route.query,
            component: PreviewContainer
          }
        ]
      });
      router.addRoute({
        path: project.page,
        name: 'VtjPageMask',
        component: MaskContainer,
        children: [
          {
            path: ':id',
            name: 'VtjPage',
            props: (route: any) => route.query,
            component: PageContainer
          }
        ]
      });
    } else {
      router.addRoute({
        path: `${project.preview}/:id`,
        name: 'VtjPpreview',
        props: (route: any) => route.query,
        component: PreviewContainer
      });
      router.addRoute({
        path: `${project.page}/:id`,
        name: 'VtjPage',
        props: (route: any) => route.query,
        component: PageContainer
      });
    }

    if (startup) {
      router.addRoute({
        name: 'startup',
        path: project.home,
        component: Homepage
      });
    }
  }

  public async setup(app?: App) {
    const { caches, options, dsl } = this;
    const { id } = options.project;
    let cache = caches[id];
    if (cache) return cache;
    const { dependencies = [] } = dsl.value || {};
    const deps = dependencies.filter((n) => !!n.enabled && n.library !== VUE);
    const { scripts, css, assets, libraries } = parseDependencies(deps);
    loadCss(css);
    await loadScripts(scripts);
    await loadScripts(assets);
    const { libs, components } = getLibs(libraries);
    cache = caches[id] = { libs, components, apis: this.apis?.value };
    if (app) {
      install(app, libs);
    }
    return cache;
  }

  public go(id: string, query: Record<string, any> = {}) {
    const router = useRouter();
    router.push({ name: 'VtjPage', params: { id }, query });
  }
}

export async function createProvider(options: Partial<ProviderOptions> = {}) {
  const instance = new Provider(options);
  await instance.init();
  return {
    instance,
    install: (app: App) => {
      app.config.globalProperties.$provider = instance;
    }
  };
}
