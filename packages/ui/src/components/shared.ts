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
  project?: MaskProject;
  menu?: MenuProps;
}
