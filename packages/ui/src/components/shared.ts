import { ExtractPropTypes } from 'vue';

import type { MenuProps } from './menu';

export interface MaskProject {
  id?: string;
  name?: string;
  base?: string;
  mode?: string;
  page?: string;
  home?: string;
}

export interface BaseMaskProps {
  preview?: boolean;
  project?: MaskProject;
  menu?: MenuProps;
}

export type ComponentPropsType<T> = Readonly<Partial<ExtractPropTypes<T>>>;

export type UnReadOnly<T> = {
  -readonly [P in keyof T]: T[P];
};

export type BaseSize = 'large' | 'default' | 'small';

export type BaseType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
