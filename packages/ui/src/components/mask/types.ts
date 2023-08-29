import {
  PropType,
  ShallowRef,
  InjectionKey,
  ShallowReactive,
  ComputedRef,
  ComponentInternalInstance
} from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { ComponentPropsType } from '../shared';
import { MenuDataItem, ActionBarItems, ActionProps, ActionMenuItem } from '../';
import logo from './logo.png';
import type Mask from './Mask.vue';

export const MASK_STATE_KEY: InjectionKey<ShallowReactive<MaskState>> =
  Symbol('maskState');

export const MASK_INSTANCE_KEY: InjectionKey<ComponentInternalInstance> =
  Symbol('$mask');

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
   * 手动处理菜单打开，设置true，需要自行侦听 menu-select 事件实现菜单打开页面
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
  /**
   * home tab 配置
   */
  home: {
    type: Object as PropType<Partial<MenuDataItem>>
  },

  /**
   * 最大tabs数量
   */
  maxTabs: {
    type: Number,
    default: 20
  },
  /**
   * 右上角工具条配置
   */
  actions: {
    type: Array as PropType<ActionBarItems>
  },

  /**
   * 用户头像图片url
   */
  avatar: {
    type: String
  },
  /**
   * 开启主题切换
   */
  themeSwitch: {
    type: Boolean
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export type MaskInstance = InstanceType<typeof Mask>;

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
  actionClick: [action: ActionProps];
  actionCommand: [action: ActionProps, item: ActionMenuItem];
};

export type MaskSlots = {
  default(): any;
  user(): any;
};
