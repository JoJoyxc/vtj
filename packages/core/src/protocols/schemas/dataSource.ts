import type { JSFunction, JSExpression } from '../shared';
export type DataSourceType = 'api' | 'cube' | 'meta';

export interface ApiSchema {
  // 接口名称
  name: string;
  // 接口描述说明
  title?: string;
  // 接口请求url
  url: string;
  // 接口请求方法
  method?: string;
  // 请求 设置配置
  settings?: JSExpression;
}

export interface DataSourceSchema {
  //数据源类型
  type: DataSourceType;
  // 数据源引用详情名称
  detail: string;
  // 数据源名称
  name: string;
  // 描述标题
  title?: string;
  // 数据转换函数
  transform?: JSFunction;
  // 测试用例
  test?: JSFunction;
}
