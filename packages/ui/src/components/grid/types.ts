import type { ComponentPropsType } from '../shared';
import { gridProps } from './props';
import Sortable from 'sortablejs';
import type {
  VxeGridInstance,
  VxeTableDefines,
  VxeGridPropTypes,
  VxeGridDefines,
  VxeColumnPropTypes,
  VxeGridEvents
} from 'vxe-table';

export type GridSortableOptions = Sortable.Options;

export type GridSortableRowInfo = {
  rowid: string;
  item: any;
  items: any[];
  index: number;
  parent?: any;
};

export interface GridSortableEvent {
  info: GridSortableRowInfo | VxeTableDefines.ColumnInfo | null;
  newIndex?: number;
  oldIndex?: number;
  e: Sortable.SortableEvent;
}

export type GridColumns = VxeGridPropTypes.Columns;

export type GridCustomInfo = {
  id: string;
  resize?: Record<string, number>;
  visible?: Record<string, boolean>;
  sort?: string[];
  fixed?: Record<string, VxeColumnPropTypes.Fixed>;
};

export type GridProps = ComponentPropsType<typeof gridProps>;

export type GridEmits = {
  rowSort: [e: GridSortableEvent];
  columnSort: [e: GridSortableEvent];
};

export type {
  VxeGridInstance,
  VxeTableDefines,
  VxeGridPropTypes,
  VxeColumnPropTypes,
  VxeGridEvents,
  VxeGridDefines
};
