import { JSExpression, JSFunction, JSONValue, StateSchema } from './shared';
import { NodeSchema } from './node';
import { DataSourceSchema } from './dataSource';

export interface WatchSchema {
  id?: string;
  source: JSFunction | JSExpression;
  deep?: boolean;
  immediate?: boolean;
  handler: JSFunction;
}

export type PropDataType = 'String' | 'Number' | 'Boolean' | 'Array' | 'Object';

export interface DefinePropSchema {
  name: string;
  type?: PropDataType | PropDataType[];
  required?: boolean;
  default?: JSONValue | JSExpression;
}

export type DefineProps = Array<string | DefinePropSchema>;

export interface DefineSlotSchema {
  name: string;
  params?: string[];
}
export type DefineSlotsSchema = Array<string | DefineSlotSchema>;

export interface InjectSchema {
  name: string;
  from?: string | JSExpression;
  default?: JSONValue | JSExpression;
}

export type LifeCyclesSchema = Record<string, JSFunction>;
export type ComputedSchema = Record<string, JSFunction>;
export type MethodsSchema = Record<string, JSFunction>;

// 组件引用 {依赖包名/本地文件路径：[组件名]}
export type ComponentsSchema = Record<string, string[]>;
// 工具引用
export type UtilsSchema = Record<string, string[]>;

export interface SummarySchema {
  id?: string;
  // 组件名
  name: string;

  // 中文描述
  title?: string;
}

export interface BlockSchema extends SummarySchema {
  /**
   * 注入
   */
  inject?: InjectSchema[];
  /**
   * 状态数据
   */
  state?: StateSchema;
  /**
   * 生命周期集
   */
  lifeCycles?: LifeCyclesSchema;

  /**
   * 自定义方法
   */
  methods?: MethodsSchema;

  /**
   * 计算属性
   */
  computed?: ComputedSchema;

  /**
   * 侦听器
   */
  watch?: WatchSchema[];

  // 样式
  css?: string;

  // 定义属性参数
  props?: DefineProps;

  // 定义事件
  emits?: string[];

  // 定义插槽
  slots?: string[];

  // 节点树
  children?: NodeSchema[];

  // 数据源
  dataSources?: Record<string, DataSourceSchema>;

  // babel代码转换缓存
  transform?: Record<string, string>;

  // 标记
  __VTJ_BLOCK__?: boolean;
}
