import { type InjectionKey, type App, inject } from 'vue';
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import {
  storage,
  cookie,
  toArray,
  Request,
  delay,
  unAES,
  MD5
} from '@vtj/utils';
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
   * 授权登录页面 pathname
   */
  auth?: string | ((search: string) => void);

  /**
   * 判断是否登录页面
   * @param path
   * @returns
   */
  isAuth?: (to: RouteLocationNormalized) => boolean;

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
  alert?: (message: string, options: Record<string, any>) => Promise<any>;

  /**
   * 未登录提示文本
   */
  unauthorizedMessage?: string;

  /**
   * 密钥
   */
  crypto?: string;
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
  private mode?: ContextMode = ContextMode.Raw;
  constructor(options: Partial<AccessOptions>) {
    this.options = Object.assign({}, defaults, options);
    this.loadData();
  }

  connect(params: AccessConnectParams) {
    const { mode, router, request } = params;
    this.mode = mode;
    if (router && mode === ContextMode.Raw) {
      this.setGuard(router);
    }
    if (request) {
      this.setRequest(request);
    }
  }

  login(data: AccessData | string) {
    const { storageKey, storagePrefix, session, authKey } = this.options;
    this.setData(data);
    if (!this.data) return;

    storage.save(storageKey, data, {
      type: 'local',
      prefix: storagePrefix
    });
    if (session) {
      cookie.set(authKey, this.data.token);
    }
  }

  clear() {
    const { storageKey, storagePrefix, session, authKey } = this.options;
    this.data = null;
    storage.remove(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });
    if (session) {
      cookie.remove(authKey);
    }
  }

  logout() {
    this.clear();
    this.toLogin();
  }

  getData() {
    return this.data;
  }

  can(code: string | string[] | ((p: Record<string, boolean>) => boolean)) {
    const { permissions = {} } = this.data || {};
    if (typeof code === 'function') {
      return code(permissions);
    }
    const codes = toArray(code);
    return codes.every((n) => permissions[n]);
  }

  some(code: string | string[]) {
    const { permissions = {} } = this.data || {};
    const codes = toArray(code);
    return codes.some((n) => permissions[n]);
  }

  install(app: App) {
    if (!app.config.globalProperties.$access) {
      app.config.globalProperties.$access = this;
    }
    app.provide(ACCESS_KEY, this);
  }

  private isAuthPath(to: RouteLocationNormalized) {
    const { auth, isAuth } = this.options;
    if (isAuth) {
      return isAuth(to);
    }
    if (to.path && typeof auth === 'string') {
      const path = auth.split('#')[1] || auth;
      return to.path === path;
    }
    return false;
  }

  private toLogin() {
    const { auth, redirectParam } = this.options;
    if (!auth) return;
    if (this.mode !== ContextMode.Raw) return;
    const search = redirectParam
      ? `?${redirectParam}=${encodeURIComponent(location.href)}`
      : '';
    if (typeof auth === 'function') {
      auth(search);
    } else {
      location.href = redirectParam ? `${auth}${search}` : auth;
    }
  }

  private setData(data: any) {
    const { crypto } = this.options;
    if (typeof data === 'string') {
      try {
        this.data = JSON.parse(
          crypto ? unAES(data, MD5(crypto.toLowerCase())) : data
        ) as AccessData;
      } catch (e) {
        console.warn(e);
      }
    } else {
      this.data = data;
    }
  }

  private loadData() {
    const { storageKey, storagePrefix } = this.options;
    const data = storage.get(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });

    this.setData(data);
  }

  private isLogined() {
    const { session, authKey } = this.options;
    if (session && authKey) {
      return !!cookie.get(authKey);
    }
    return !!this.data;
  }

  private hasRoutePermission(to: RouteLocationNormalized) {
    const id = to.params.id;
    return id && this.can(id);
  }

  private setGuard(router: Router) {
    router.beforeEach((to, _from, next) => this.guard(to, next));
  }

  private guard(to: RouteLocationNormalized, next: NavigationGuardNext) {
    if (
      this.isWhiteList(to) ||
      this.isLogined() ||
      this.isAuthPath(to) ||
      this.hasRoutePermission(to)
    ) {
      return next();
    } else {
      next(false);
      this.toLogin();
    }
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

  private async showUnauthorizedAlert(res: any) {
    const { alert, unauthorizedMessage = '登录已失效' } = this.options;
    if (this.isUnauthorized(res) && alert) {
      // 延时是为了提示层渲染在loading的层级之上
      await delay(150);
      await alert(unauthorizedMessage, {
        title: '提示',
        type: 'warning'
      }).catch((e) => e);
      this.toLogin();
    }
  }

  private setRequest(request: Request) {
    request.useRequest((req) => {
      const token = this.data?.token;
      if (token) {
        req.headers[this.options.authKey] = this.data?.token;
      }
      return req;
    });
    request.useResponse(
      async (res) => {
        await this.showUnauthorizedAlert(res);
        return res;
      },
      async (err) => {
        const res = err.response || err || {};
        await this.showUnauthorizedAlert(res);
        return Promise.reject(err);
      }
    );
  }
}

export function useAccess() {
  const access = inject(ACCESS_KEY, null);
  if (!access) {
    // console.warn(`access is null`);
  }
  return access as Access;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $access: Access;
  }
}
