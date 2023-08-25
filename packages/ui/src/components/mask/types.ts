import { PropType } from 'vue';
import { ComponentPropsType } from '../shared';
import { MenuDataItem } from '../';
import type Mask from './Mask.vue';
export const maskProps = {
  menus: {
    type: Array as PropType<MenuDataItem[]>,
    default() {
      return [];
    }
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export type MaskInstance = InstanceType<typeof Mask>;
