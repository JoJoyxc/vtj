import { PropType, ExtractPropTypes } from 'vue';
import { Emits } from '@vtj/ui';
import type Component from './Component.vue';

/**
 * 定义组件属性参数
 */
export const componentProps = {
  //   prop: {
  //     type: String as PropType<string>,
  //     default: 'default'
  //   }
};

/**
 * 定义组件事件
 */
export const componentEmits = {
  //   eventName: (param: any) => true
};

/**
 * 组件属性类型
 */
export type ComponentProps = Partial<ExtractPropTypes<typeof componentProps>>;

/**
 * 组件事件类型
 */
export type ComponentEmits = Emits<typeof componentEmits>;

/**
 * 组件实例
 */
export type ComponentInstance = InstanceType<typeof Component>;
