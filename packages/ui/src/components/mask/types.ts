import {
  PropType,
  ShallowRef,
  InjectionKey,
  ShallowReactive,
  ComputedRef
} from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { ComponentPropsType } from '../shared';
import { MenuDataItem } from '../';
import logo from './logo.png';

export const MASK_STATE_KEY: InjectionKey<ShallowReactive<MaskState>> =
  Symbol('maskState');

export const maskProps = {
  /**
   * 系统logo
   */
  logo: {
    type: String,
    default: logo
  },
  /**
   * 系统标题
   */
  title: {
    type: String,
    default: 'VTJ.PRO'
  },
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
  },
  /**
   * 手动处理菜单打开
   */
  manualMenu: {
    type: Boolean
  },
  /**
   * 设置初始化选中菜单函数
   */
  defaultActiveMenu: {
    type: Function as PropType<
      (
        to: RouteLocationNormalizedLoaded,
        menus: MenuDataItem[]
      ) => MenuDataItem | undefined | null
    >
  },
  home: {
    type: Object as PropType<Partial<MenuDataItem>>
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export interface MaskState {
  menus: ShallowRef<MenuDataItem[]>;
  favorites: ShallowRef<MenuDataItem[]>;
  flatMenus: ComputedRef<MenuDataItem[]>;
  activeMenu: ShallowRef<MenuDataItem | null | undefined>;
  tabs: ShallowRef<MenuDataItem[]>;
  home: ShallowRef<MenuDataItem | null | undefined>;
}

export type MaskEmits = {
  menuSelect: [menu: MenuDataItem];
};
