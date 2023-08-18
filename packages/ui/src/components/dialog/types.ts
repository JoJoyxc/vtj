import { PropType, VNode, DefineComponent } from 'vue';
import { ComponentPropsType } from '../shared';
import { IconParam } from '../../';

export type DialogMode = 'normal' | 'maximized' | 'minimized';

export const dialogProps = {
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  width: {
    type: [Number, String],
    default: '70%'
  },
  height: {
    type: [Number, String],
    default: '70%'
  },
  modal: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: [Boolean, Object]
  },
  resizable: {
    type: [Boolean, Object]
  },
  closable: {
    type: Boolean,
    default: true
  },
  maximizable: {
    type: Boolean,
    default: true
  },
  minimizable: {
    type: Boolean,
    default: true
  },
  mode: {
    type: String as PropType<DialogMode>,
    default: 'normal'
  },
  content: {
    type: Object as PropType<VNode | DefineComponent<any, any, any, any>>
  },
  src: {
    type: String
  },
  beforeClose: {
    type: Function as PropType<() => boolean | Promise<boolean>>
  },
  submit: {
    type: [Boolean, String]
  },
  cancel: {
    type: [Boolean, String]
  }
};

export type DialogProps = ComponentPropsType<typeof dialogProps>;

export type DialogEmits = {
  close: [];
  maximize: [];
  minimize: [];
  normal: [];
  modeChange: [mode: DialogMode];
};

export interface DialogState {
  mode: DialogMode;
  wrapperWidth: number;
  wrapperHeight: number;
  width: number;
  height: number;
  left: number;
  top: number;
  zIndex: number;
}
