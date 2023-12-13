import { type BlockPropDataType } from '@vtj/core';

export enum ContextMode {
  /**
   * 运行时
   */
  Runtime = 'Runtime',

  /**
   * 设计模式
   */
  Design = 'Design',

  /**
   * 源码模式
   */
  Raw = 'Raw',

  /**
   * 虚拟节点
   */
  VNode = 'VNodess'
}

/**
 * vue 组件实例提供的属性名
 */
export const CONTEXT_HOST = [
  '$el',
  '$emit',
  '$nextTick',
  '$parent',
  '$root',
  '$attrs',
  '$slots',
  '$watch',
  '$props',
  '$options',
  '$forceUpdate'
];

/**
 * 内置指令
 */
export const BUILDIN_DIRECTIVES = ['vIf', 'vShow', 'vModel', 'vFor', 'vBind'];

/**
 * 数据类型
 */
export const DATA_TYPES: Record<BlockPropDataType, any> = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Array: Array,
  Object: Object
};
