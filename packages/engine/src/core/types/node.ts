import { PropsSchema, JSExpression, JSFunction } from './shared';

export type NodeChildrenSchema = string | JSExpression | NodeSchema[];

export type NodeModifiers = Record<string, boolean>;

// 组件指令定义
export interface NodeDirectiveSchema {
  id?: string;
  // 指令名称
  name: string;
  // 参数
  arg?: string | JSExpression;
  // 修饰符
  modifiers?: NodeModifiers;
  // 指令值
  value?: JSExpression;
  // v-for 迭代器
  iterator?: {
    item: string;
    index: string;
  };
}

export interface NodeEventSchema {
  handler: JSFunction;
  modifiers?: NodeModifiers;
}

export interface NodeEventsSchema {
  [name: string]: NodeEventSchema;
}

export interface NodeSlotSchema {
  name: string;
  params?: string[];
}

export interface FromSchema {
  type: 'Schema';
  id: string;
}

export interface FromUrlSchema {
  type: 'UrlSchema';
  url: string;
}

export interface FromRemote {
  type: 'Remote';
  urls: string;
  library?: string;
}

export type NodeFrom = string | FromSchema | FromUrlSchema | FromRemote;

// 节点描述
export interface NodeSchema {
  // id标识
  id?: string;
  // 标签名, slot 可以定义插槽
  name: string;

  // 组件来源：npm package name
  from?: NodeFrom;
  // 是否不可见
  invisible?: boolean;
  // 组件参数， 当 name 为 slot 时 props 是 插槽的参数
  props?: PropsSchema;
  // 子组件
  children?: NodeChildrenSchema;
  // 内置指令
  directives?: NodeDirectiveSchema[];

  // 把节点传入到的插槽描述
  slot?: string | NodeSlotSchema;

  // 绑定事件
  events?: NodeEventsSchema;
}
