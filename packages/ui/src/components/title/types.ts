import type { TextProps } from 'element-plus';
import { ExtractPropTypes, PropType } from 'vue';
import { IconParam } from '../icon';

export type TitleLevel =
  | 'extra-large'
  | 'large'
  | 'medium'
  | 'base'
  | 'small'
  | 'extra-small';

export const titleProps = {
  level: {
    type: String as PropType<TitleLevel>,
    default: 'base'
  },
  content: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String
  },
  icon: {
    type: [String, Object] as PropType<IconParam>
  }
};

export type TitleProps = Partial<ExtractPropTypes<typeof titleProps>> &
  TextProps;
