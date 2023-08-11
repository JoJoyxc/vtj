import { MenuProps as ElMenuProps } from 'element-plus';
import { DefineComponent } from 'vue';
export interface MenuDataItem {
  id: string;
  title: string;
  icon?: string | DefineComponent;
  disabled?: boolean;
  hidden?: boolean;
  children?: MenuDataItem[];
}

export interface MenuProps extends Partial<ElMenuProps> {
  data?: MenuDataItem[];
}
