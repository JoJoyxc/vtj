import { pick, trim, merge, template, uuid } from './util';
import type { AxiosRequestConfig, AxiosResponse } from './axios';
import { AxiosError } from './axios';
import instance from './axios';

const TYPES = {
  form: 'application/x-www-form-urlencoded',
  json: 'application/json',
  data: 'multipart/form-data'
};

const LOCAL_REQUEST_ID = 'Local-Request-Id';
const DATA_METHODS = ['put', 'post', 'patch'];
const RequestCache: Record<string, any> = {};
const loadingArray: any[] = [];
let loadingTimer: any = null;
let isLoading: boolean = false;
let requestId: any = null;
let responseId: any = null;

export interface ApiResponse<T = any> {
  code: number;
  data: T | null;
  msg: string;
  success: boolean;
  promise?: Promise<any>;
}

export interface ApiSettings<OriginResponse, ValidSuccess> {
  loading?: boolean;
  showLoading?: () => void;
  hideLoading?: () => void;
  loadingTime?: number;
  type?: 'form' | 'json' | 'data';
  originResponse?: OriginResponse;
  validSuccess?: ValidSuccess;
  validate?: (res: AxiosResponse) => boolean;
  failMessage?: boolean;
  showError?: (msg: string, e: AxiosError | AxiosResponse<ApiResponse>) => void;
  headers?:
    | Record<string, string>
    | ((config: ApiRequestConfig) => Record<string, string>);
  defaults?: Record<string, any>;
  trim?: boolean;
  picked?: boolean;
  pickFilter?: (v: any) => boolean;
  skipWarnResponseCode?: number;
  skipWarnExecutor?: () => void;
  skipWarnCallback?: () => void;
  skipWarnFinally?: () => void;
  skipWarn?: boolean;
}

export type ApiRequestConfig<
  RequestData = any,
  OriginResponse = boolean,
  ValidSuccess = boolean
> = AxiosRequestConfig<RequestData> & {
  settings?: ApiSettings<OriginResponse, ValidSuccess>;
};

const __settings__: ApiSettings<boolean, boolean> = {
  loading: true,
  // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  loadingTime: 50,
  // 发送数据类型，支持：form、json、data
  type: 'form',
  // 响应原始 Response 对象
  originResponse: false,
  // 校验成功
  validSuccess: true,
  // 校验成功函数
  validate: (res) => !!res.data?.success,
  // 显示失败信息
  failMessage: true,
  // 覆盖 axios 实例的 defaults 属性
  defaults: Object.create(null),
  // 清除字段值两旁的空格
  trim: true,
  // 剔除null、undefined 空字符串的参数
  picked: true,
  // 自定义剔除函数
  pickFilter: (v: any) => v !== null && v !== undefined && v !== '',
  // 警告响应code编码值
  skipWarnResponseCode: 7,
  skipWarn: false
};

export function setRequestSettings(settings: ApiSettings<boolean, boolean>) {
  merge(__settings__, settings);
  const defaults = __settings__.defaults || {};
  Object.entries(defaults).forEach(([name, value]) => {
    (instance.defaults as any)[name] = value;
  });
}

function createHeaders(
  options: AxiosRequestConfig,
  settings: ApiSettings<boolean, boolean>
): Record<string, any> {
  const headers = options.headers || Object.create(null);
  const requestHeaders = Object.create(null);
  const contentType = TYPES[settings.type || 'form'];
  if (contentType) {
    requestHeaders['Content-Type'] = contentType;
  }
  const { headers: injectHeaders, skipWarnExecutor } = settings;
  if (injectHeaders) {
    Object.assign(
      requestHeaders,
      typeof injectHeaders === 'function'
        ? injectHeaders(options)
        : injectHeaders
    );
  }
  if (skipWarnExecutor) {
    const id = uuid(false);
    requestHeaders[LOCAL_REQUEST_ID] = id;
    RequestCache[id] = {
      options,
      settings
    };
  }

  return Object.assign(requestHeaders, headers);
}

function pickData(data: any, pickFilter?: (v: any) => boolean) {
  // 只对对象进行过滤
  if (!data || Array.isArray(data)) return data;
  return pick(data, pickFilter);
}

function toFormData<T extends object>(
  data: T,
  type: string = 'data'
): FormData | URLSearchParams {
  if (data instanceof FormData || data instanceof URLSearchParams) return data;
  const params = type === 'data' ? new FormData() : new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params;
}

function openLoading(settings: ApiSettings<boolean, boolean>) {
  const { loading, loadingTime, showLoading } = settings;
  if (!loading || !showLoading) return;
  loadingArray.push(true);
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    if (isLoading) return;
    isLoading = true;
    showLoading();
  }, loadingTime);
}

function closeLoading(settings: ApiSettings<boolean, boolean>) {
  const { loading, hideLoading } = settings;
  if (!loading || !hideLoading) return;
  clearTimeout(loadingTimer);
  loadingArray.pop();
  if (loadingArray.length === 0 && isLoading) {
    hideLoading();
    isLoading = false;
  }
}

function showErrorMessage(
  settings: ApiSettings<boolean, boolean>,
  content: string,
  e: AxiosError | AxiosResponse
) {
  const { showError, failMessage } = settings;
  if (!failMessage || !showError) return;
  showError(content, e);
}

function processSuccess(
  settings: ApiSettings<boolean, boolean>,
  res: AxiosResponse
) {
  const { originResponse, validSuccess, validate } = settings;

  const data = res.data;
  if (data && data.promise) {
    return data.promise;
  }
  if (validSuccess && validate) {
    const success = !!validate(res);
    if (success) {
      return originResponse ? res : data.data;
    } else {
      return processCustomError(settings, res);
    }
  } else {
    return originResponse ? res : data;
  }
}

function processAxiosError(
  settings: ApiSettings<boolean, boolean>,
  e: AxiosError
) {
  if (e && e.message) {
    showErrorMessage(settings, e.message, e);
  }
}

function processCustomError(
  settings: ApiSettings<boolean, boolean>,
  res: AxiosResponse<ApiResponse>
) {
  const data: any = res.data;
  if (data) {
    let message = (data.message || data.msg || '').replace(
      /^\[4:ReqFailure]/,
      ''
    );
    if (data && data.code === 500) {
      message = '系统繁忙，请稍后重试！';
    }
    showErrorMessage(settings, message, res);
  }
  return Promise.reject(res);
}

// 重载1：返回验证成功后的业务data
async function request<Req = any, Res = any>(
  options: ApiRequestConfig<Req, false, true>,
  currentSettings?: ApiSettings<boolean, boolean>
): Promise<Res>;

// 重载2： 返回 AxiosResponse 的 data
async function request<Req = any, Res = any>(
  options: ApiRequestConfig<Req, false, false>,
  currentSettings?: ApiSettings<boolean, boolean>
): Promise<ApiResponse<Res>>;

// 重载3： 返回AxiosResponse原始响应对象
async function request<Req = any, Res = any>(
  options: ApiRequestConfig<Req, true, boolean>,
  currentSettings?: ApiSettings<boolean, boolean>
): Promise<AxiosResponse<ApiResponse<Res>>>;

// 重载4：无指定设置，返回未知对象
async function request<Req = any, Res = any>(
  options: ApiRequestConfig<Req, boolean, boolean>,
  currentSettings?: ApiSettings<boolean, boolean>
): Promise<Res> {
  const { url, method = 'get' } = options;
  const settings = {
    ...__settings__,
    ...(options.settings || {}),
    ...currentSettings
  };
  const headers = createHeaders(options, settings);
  delete options.settings;
  let { data, params } = options;
  if (settings.picked) {
    const { pickFilter } = settings;
    data = data ? pickData(data, pickFilter) : data;
    params = params ? pickData(params, pickFilter) : params;
  }
  if (settings.trim) {
    data = data ? trim(data) : data;
    params = params ? trim(params) : params;
  }
  const { skipWarnExecutor, skipWarn } = settings;
  if (DATA_METHODS.includes(method.toLowerCase())) {
    data = skipWarnExecutor
      ? (Object.assign(data || {}, { skipWarn }) as any)
      : data;
    data =
      settings.type !== 'json'
        ? (toFormData(data || {}, settings.type) as any)
        : data;
  } else {
    params = skipWarnExecutor
      ? Object.assign(params || {}, { skipWarn })
      : params;
    params = {
      ...params,
      ...data
    };
  }
  const config: AxiosRequestConfig = {
    ...options,
    url,
    method,
    params,
    data,
    headers
  };
  openLoading(settings);
  const result = await instance<Req, Res>(config)
    .catch((e) => e)
    .finally(() => {
      closeLoading(settings);
    });
  if (result instanceof AxiosError) {
    processAxiosError(settings, result);
  }
  return processSuccess(settings, result);
}
function isSuccess(data: ApiResponse) {
  return !!data.success === true;
}

instance.interceptors.response.use((res: AxiosResponse) => {
  const headers: Record<string, any> = res.config?.headers || {};
  const requestId = headers[LOCAL_REQUEST_ID] as string;
  const requestCache = RequestCache[requestId];
  delete RequestCache[requestId];
  const { data } = res;
  if (data && typeof data === 'object') {
    data.isSuccess = () => isSuccess(data);
    data.isFail = () => !isSuccess(data);
  }
  if (!requestCache) return res;
  const { settings = {}, options } = requestCache;
  const {
    skipWarnExecutor,
    skipWarnResponseCode,
    skipWarnCallback,
    skipWarnFinally
  } = settings;
  if (!skipWarnExecutor || (data && typeof data !== 'object')) return res;
  if (Number.parseInt(data?.code, 10) === skipWarnResponseCode) {
    skipWarnCallback && skipWarnCallback(data);
    const promise = new Promise(skipWarnExecutor).then(() => {
      settings.skipWarn = true;
      const currentSettings = Object.assign({}, options.settings, settings);
      return request({
        ...options,
        settings: currentSettings
      });
    });
    promise
      .catch((e) => e)
      .finally(() => {
        skipWarnFinally && skipWarnFinally();
      });
    data.promise = promise;
  }
  return res;
});

export function setRequest(success: any, fail?: any) {
  const request = instance.interceptors.request;
  if (requestId) {
    request.eject(requestId);
  }
  requestId = request.use(success, fail);
  return requestId;
}

export function setResponse(success: any, fail?: any) {
  const response = instance.interceptors.response;
  if (responseId) {
    response.eject(responseId);
  }
  responseId = response.use(success, fail);
  return responseId;
}

function createApi<Req = any, Res = any>(
  options: string | ApiRequestConfig<Req, false, true>
): (
  data?: Req,
  currentSettings?: ApiSettings<boolean, boolean>
) => Promise<Res>;

function createApi<Req = any, Res = any>(
  options: string | ApiRequestConfig<Req, false, false>
): (
  data?: Req,
  currentSettings?: ApiSettings<boolean, boolean>
) => Promise<ApiResponse<Res>>;

function createApi<Req = any, Res = any>(
  options: string | ApiRequestConfig<Req, true, boolean>
): (
  data?: Req,
  currentSettings?: ApiSettings<boolean, boolean>
) => Promise<AxiosResponse<ApiResponse<Res>>>;

function createApi<Req = any, Res = any>(
  options: string | ApiRequestConfig
): (
  data?: Req,
  currentSettings?: ApiSettings<boolean, boolean>
) => Promise<Res> {
  const dataType = typeof options;
  const opts: ApiRequestConfig =
    dataType === 'string'
      ? ({ url: options as string } as ApiRequestConfig)
      : (options as ApiRequestConfig);
  if (!opts.url) throw new Error('missing request url');
  return (data?: Req, currentSettings?: ApiSettings<boolean, boolean>) => {
    let url = opts.url;
    if (!url) {
      throw new Error('url is empty');
    }
    if (url.includes('${')) {
      const compiled = template(url);
      url = compiled(data || {});
    }
    const settings = Object.assign({}, opts.settings, currentSettings);
    return request<Req, Res>({
      ...opts,
      url,
      data,
      settings
    } as any);
  };
}

export {
  request,
  createApi,
  instance as axiosInstance,
  __settings__ as requestSettings,
  LOCAL_REQUEST_ID
};
