import { type InjectionKey, type App, inject } from 'vue';
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import { storage, cookie, toArray, Request } from '@vtj/utils';
import { ContextMode } from '../constants';

export interface AccessOptions {
  /**
   * 开启session, token 储存到cookie，关闭浏览器将登录失效
   */
  session: boolean;

  /**
   * 请求头和cookie记录token名称
   */
  authKey: string;

  /**
   * 本地缓存key前缀
   */
  storagePrefix: string;

  /**
   * 本地缓存key
   */
  storageKey: string;

  /**
   * 路由拦截白名单
   */
  whiteList?: string[] | ((to: RouteLocationNormalized) => boolean);

  /**
   * 未授权页面路由路径
   */
  unauthorized?: string | (() => void);

  /**
   * 授权登录页面路由路径或url
   */
  auth?: string | (() => void);

  /**
   * 重定向参数名
   */
  redirectParam?: string;

  /**
   * 未登录响应状态码
   */
  unauthorizedCode?: number;

  /**
   * 提示信息方法
   * @param message
   * @returns
   */
  alert?: (message: string) => void;

  unauthorizedMessage?: string;
}

export interface AccessData {
  token: string;
  permissions: Record<string, boolean>;
  [index: string]: any;
}

export interface AccessConnectParams {
  /**
   * 请求类
   */
  request?: Request | null;
  /**
   * 路由
   */
  router?: Router | null;

  /**
   * 模式
   */
  mode?: ContextMode;
}

const defaults: AccessOptions = {
  session: false,
  authKey: 'Authorization',
  storageKey: 'ACCESS_STORAGE',
  storagePrefix: '__VTJ__',
  unauthorized: '/unauthorized',
  auth: '/#/login',
  redirectParam: 'r',
  unauthorizedCode: 401,
  unauthorizedMessage: '登录已经失效，请重新登录！'
};

export const ACCESS_KEY: InjectionKey<Access> = Symbol('access');

export class Access {
  private options: AccessOptions;
  private data: AccessData | null = null;
  constructor(options: Partial<AccessOptions>) {
    this.options = Object.assign({}, defaults, options);
    this.loadData();
  }

  connect(params: AccessConnectParams) {
    const { mode, router, request } = params;
    if (router && mode === ContextMode.Raw) {
      this.setGuard(router);
    }
    if (request) {
      this.setRequest(request);
    }
  }

  login(data: AccessData) {
    const { storageKey, storagePrefix, session, authKey } = this.options;
    this.data = data;
    storage.save(storageKey, data, {
      type: 'local',
      prefix: storagePrefix
    });
    if (session) {
      cookie.set(authKey, data.token);
    }
  }

  logout() {
    const { storageKey, storagePrefix } = this.options;
    this.data = null;
    storage.remove(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });
    this.toLogin();
  }

  getData() {
    return this.data;
  }

  can(code: string | string[]) {
    const { permissions = {} } = this.data || {};
    const codes = toArray(code);
    return codes.every((n) => permissions[n]);
  }

  some(code: string | string[]) {
    const { permissions = {} } = this.data || {};
    const codes = toArray(code);
    return codes.some((n) => permissions[n]);
  }

  install(app: App) {
    app.config.globalProperties.$access = this;
    app.provide(ACCESS_KEY, this);
  }

  private isAuthUrl() {
    const { auth } = this.options;
    return auth && typeof auth === 'string' && location.href.includes(auth);
  }

  private toLogin() {
    const { auth, redirectParam } = this.options;
    if (!auth || this.isAuthUrl()) return;
    if (typeof auth === 'function') {
      auth();
    } else {
      location.href = redirectParam
        ? `${auth}?${redirectParam}=${encodeURIComponent(location.href)}`
        : auth;
    }
  }

  private loadData() {
    const { storageKey, storagePrefix } = this.options;
    this.data = storage.get(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });
  }

  private isLogined() {
    const { session, authKey } = this.options;
    if (session && authKey) {
      return !!cookie.get(authKey);
    }
    return !!this.data;
  }

  private setGuard(router: Router) {
    router.beforeEach((to, _from, next) => this.guard(to, next));
  }

  private guard(to: RouteLocationNormalized, next: NavigationGuardNext) {
    if (this.isWhiteList(to)) return next();
    if (this.isLogined()) return next();
    next(false);
    this.toLogin();
  }

  private isWhiteList(to: RouteLocationNormalized) {
    const { whiteList } = this.options;
    if (!whiteList) return false;
    if (Array.isArray(whiteList)) {
      return whiteList.some((n) => to.fullPath.startsWith(n));
    } else {
      return whiteList(to);
    }
  }

  private isUnauthorized(res: any) {
    const { unauthorizedCode = 401 } = this.options;
    return (
      res.status === unauthorizedCode || res.data.code === unauthorizedCode
    );
  }

  private setRequest(request: Request) {
    const { alert, unauthorizedMessage = '登录已失效' } = this.options;
    request.useRequest((req) => {
      req.headers.Authorization = this.data?.token;
      return req;
    });
    request.useResponse(
      (res) => {
        if (this.isUnauthorized(res) && alert) {
          alert(unauthorizedMessage);
        }
        return res;
      },
      (err) => {
        const res = err.response || err || {};
        if (this.isUnauthorized(res) && alert) {
          alert(unauthorizedMessage);
        }
        return err;
      }
    );
  }
}

export function useAccess() {
  const access = inject(ACCESS_KEY, null);
  if (!access) {
    console.warn(`access is null`);
  }
  return access as Access;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $access: Access;
  }
}
