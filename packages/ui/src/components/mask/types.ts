import { PropType, ShallowRef, InjectionKey, ShallowReactive } from 'vue';
import { ComponentPropsType } from '../shared';
import { MenuDataItem } from '../';

export const MASK_STATE_KEY: InjectionKey<ShallowReactive<MaskState>> =
  Symbol('maskState');

export const maskProps = {
  /**
   * 菜单项数据
   */
  menus: {
    type: [Array, Function] as PropType<
      MenuDataItem[] | (() => Promise<MenuDataItem[]> | MenuDataItem[])
    >,
    default() {
      return [];
    }
  },
  /**
   * 收藏菜单项
   */
  favorites: {
    type: [Array, Function] as PropType<
      MenuDataItem[] | (() => Promise<MenuDataItem[]> | MenuDataItem[])
    >,
    default() {
      return [];
    }
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export interface MaskState {
  menus: ShallowRef<MenuDataItem[]>;
  favorites: ShallowRef<MenuDataItem[]>;
}
