import { MenuProps as ElMenuProps } from 'element-plus';

export interface MenuDataItem {
  id: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  children?: MenuDataItem[];
}

export interface MenuProps extends Partial<ElMenuProps> {
  data?: MenuDataItem[];
}
