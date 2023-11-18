import type { JSExpression, JSFunction, JSONValue } from '../shared';
import type { NodeSchema } from './node';
import type { DataSourceSchema } from './dataSource';
export interface BlockSchema {
  /**
   * 标识
   */
  id?: string;

  /**
   * 组件名
   */
  name: string;

  /**
   * 中文描述
   */
  title?: string;

  /**
   * 注入
   */
  inject?: BlockInject[];

  /**
   * 状态数据
   */
  state?: BlockState;

  /**
   * 生命周期集
   */
  lifeCycles?: Record<string, JSFunction>;

  /**
   * 自定义方法
   */
  methods?: Record<string, JSFunction>;

  /**
   * 计算属性
   */
  computed?: Record<string, JSFunction>;

  /**
   * 侦听器
   */
  watch?: BlockWatch[];

  /**
   * 样式
   */
  css?: string;

  /**
   * 定义属性参数
   */
  props?: Array<string | BlockProp>;

  /**
   * 定义事件
   */
  emits?: string[];

  /**
   * 定义插槽
   */
  slots?: string[];

  /**
   * 节点树
   */
  children?: NodeSchema[];

  /**
   * 数据源
   */
  dataSources?: Record<string, DataSourceSchema>;

  /**
   * 标记
   */
  __VTJ_BLOCK__?: boolean;
}

/**
 * 注入描述
 */
export interface BlockInject {
  name: string;
  from?: string | JSExpression;
  default?: JSONValue | JSExpression;
}

/**
 * 组件状态描述
 */
export type BlockState = Record<string, JSONValue | JSExpression | JSFunction>;

/**
 * 侦听器描述
 */
export interface BlockWatch {
  id?: string;
  source: JSFunction | JSExpression;
  deep?: boolean;
  immediate?: boolean;
  handler: JSFunction;
}

export interface BlockProp {
  name: string;
  type?: BlockPropDataType | BlockPropDataType[];
  required?: boolean;
  default?: JSONValue | JSExpression;
}

export type BlockPropDataType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Array'
  | 'Object';