import { PropType, ExtractPropTypes } from 'vue';
import {
  ElTooltipProps,
  BadgeProps,
  dropdownProps,
  ButtonProps
} from 'element-plus';
import { ComponentPropsType, BaseSize, BaseType } from '../shared';
import { IconParam } from '../icon';

export type ActionMode = 'button' | 'text' | 'icon';

export interface ActionMenuItem {
  command: string | number | object;
  disabled?: boolean;
  divided?: boolean;
  icon?: IconParam;
  label?: string;
}

export type ActionDropdown = Partial<ExtractPropTypes<typeof dropdownProps>>;

export const actionProps = {
  /**
   * 动作名称标识
   */
  name: {
    type: String
  },
  /**
   * 动作标题文本
   */
  label: {
    type: String
  },
  /**
   * 动作值，预留备用
   */
  value: {
    type: [String, Number, Object, Array, Boolean] as PropType<unknown>
  },
  /**
   *  图标配置
   */
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  /**
   * 模式
   */
  mode: {
    type: String as PropType<ActionMode>,
    default: 'button'
  },

  /**
   * 下拉菜单配置
   */
  menus: {
    type: Array as PropType<ActionMenuItem[]>
  },

  /**
   *  tooltip 配置
   */
  tooltip: {
    type: [String, Object] as PropType<string | Partial<ElTooltipProps>>
  },
  /**
   * Badge 配置
   */
  badge: {
    type: [String, Number, Object] as PropType<
      string | number | Partial<BadgeProps>
    >
  },
  /**
   * ElDropdown 组件配置
   */
  dropdown: {
    type: Object as PropType<ActionDropdown>
  },
  /**
   * ElButton 组件配置，mode为button时有效
   */
  button: {
    type: Object as PropType<Partial<ButtonProps>>
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
  },
  /**
   * 颜色类型
   */
  type: {
    type: String as PropType<BaseType>,
    default: 'primary'
  },

  /**
   * icon 背景设置，单 mode为 icon 时有效
   */
  iconBackground: {
    type: String as PropType<'always' | 'hover'>,
    default: 'always'
  }
};

export type ActionProps = ComponentPropsType<typeof actionProps>;
