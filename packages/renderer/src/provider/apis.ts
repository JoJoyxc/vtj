import { type ApiSchema } from '@vtj/core';
import {
  type IRequestConfig,
  merge,
  pathToRegexp,
  pathToRegexpMatch,
  url as urlUtil,
  formDataToJson
} from '@vtj/utils';
import Mock from 'mockjs';
import { parseExpression } from '../utils';

import { type ProvideAdapter } from './provider';

export function createSchemaApi(schema: ApiSchema, adapter: ProvideAdapter) {
  const { jsonp, request } = adapter;
  if (schema.method === 'jsonp') {
    return (query: Record<string, any> = {}) =>
      jsonp(schema.url, {
        ...schema.jsonpOptions,
        query
      });
  } else {
    const headers = schema.headers
      ? parseExpression(schema.headers, {}, true)
      : undefined;
    const config: IRequestConfig = {
      url: schema.url,
      method: schema.method,
      settings: {
        ...schema.settings,
        headers
      }
    };
    return (data: any, opts?: IRequestConfig) =>
      request.send(merge(config, opts || {}, { data }));
  }
}

export function createSchemaApis(
  schema: ApiSchema[] = [],
  adapter: ProvideAdapter
) {
  return schema.reduce(
    (apis, api) => {
      apis[api.id] = createSchemaApi(api, adapter);
      return apis;
    },
    {} as Record<string, any>
  );
}

export function mockApis(schemas: ApiSchema[] = []) {
  Mock.setup({
    timeout: '50-500'
  });
  mockCleanup();
  schemas.forEach((n) => mockApi(n));
}

export interface MockCallbackOptions {
  url: string;
  type: string;
  body: string | FormData;
  query?: Record<string, any>;
  params?: Record<string, any>;
  data?: any;
}

export function mockApi(schema: ApiSchema) {
  if (!schema.mock) return;
  const { url, mockTemplate } = schema;
  if (url && mockTemplate) {
    const rUrl = pathToRegexp(`${url}(.*)`);
    const match = pathToRegexpMatch(url, { decode: decodeURIComponent });
    const handler = parseExpression(mockTemplate, {}, true);
    Mock.mock(rUrl, (options: MockCallbackOptions) => {
      const params = urlUtil.parse(options.url) || {};
      const data =
        options.body instanceof FormData
          ? formDataToJson(options.body)
          : options.body;
      const query = (match(options.url) as any)?.params;
      Object.assign(options, { data, params, query });
      return Mock.mock(handler(options));
    });
  }
}

export function mockCleanup() {
  // 清除已设置的模拟数据配置
  (Mock as any)._mocked = {};
}
