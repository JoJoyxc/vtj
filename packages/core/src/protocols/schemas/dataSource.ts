import type { JSFunction, JSExpression } from '../shared';

/**
 * 数据源类型，目前仅实现api类型
 */
export type DataSourceType = 'api' | 'cube' | 'meta';

/**
 * 项目级API类型数据源
 */
export interface ApiSchema {
  /**
   * 唯一标识
   */
  id: string;
  /**
   * 接口名称
   */
  name: string;

  /**
   * 接口描述说明
   */
  label?: string;

  /**
   * 接口请求url
   */
  url: string;

  /**
   * 接口请求方法
   */
  method?: string;

  /**
   * 请求 设置配置
   */
  settings?: JSExpression;
}

/**
 * 页面级引用数据源
 */
export interface DataSourceSchema {
  /**
   * 数据源类型
   */
  type: DataSourceType;

  /**
   * 数据源引用唯一标识
   */

  ref: string;

  /**
   * 数据源名称
   */
  name: string;

  /**
   * 描述标题
   */
  label?: string;

  /**
   * 数据转换函数
   */
  transform?: JSFunction;

  /**
   * 测试用例
   */
  test?: JSFunction;
}
