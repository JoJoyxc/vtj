import { PropType } from 'vue';
import { IconParam } from '../icon';
import { ComponentPropsType, BaseSize } from '../shared';

export const titleProps = {
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
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
  },
  border: {
    type: Boolean
  },
  more: {
    type: Boolean
  }
};

export type TitleProps = ComponentPropsType<typeof titleProps>;

export type TitleEmits = {
  click: [];
};
