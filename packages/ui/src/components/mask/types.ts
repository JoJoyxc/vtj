import {
  PropType,
  ShallowRef,
  InjectionKey,
  ShallowReactive,
  ComputedRef,
  ComponentInternalInstance
} from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import {
  MenuDataItem,
  ActionBarItems,
  ActionProps,
  ActionMenuItem,
  ComponentPropsType
} from '../';
import logo from './assets/logo.png';
import type Mask from './Mask.vue';

export const MASK_INSTANCE_KEY: InjectionKey<ComponentInternalInstance> =
  Symbol('$mask');

export const TAB_ITEM_WIDTH = 140;

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
  manual: {
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
   * 主页路由路径
   */
  homepage: {
    type: String,
    default: '/'
  },

  /**
   * 最大tabs数量
   */
  tabs: {
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
  theme: {
    type: Boolean
  },
  /**
   * 禁用框架容器
   */
  disabled: {
    type: Boolean
  },
  addFavorite: {
    type: Function as PropType<(menu: MenuDataItem) => void>
  },
  removeFavorite: {
    type: Function as PropType<(menu: MenuDataItem) => void>
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export type MaskInstance = InstanceType<typeof Mask>;

export type MaskEmits = {
  select: [menu: MenuDataItem];
  actionClick: [action: ActionProps];
  actionCommand: [action: ActionProps, item: ActionMenuItem];
};

export type MaskSlots = {
  default(): any;
  user(): any;
};

export interface MaskTab {
  menu: MenuDataItem;
  closable?: boolean;
  dialog?: boolean;
}
