import type { PropType } from 'vue';
import type { GridSortableOptions, GridColumns, GridCustomInfo } from './types';

export const gridProps = {
  /**
   * 列配置，重定义是为了实现列拖拽排序， watch列变化变化刷新列
   */
  columns: {
    type: Array as PropType<GridColumns>,
    default() {
      return [] as GridColumns;
    }
  },
  /**
   * 行拖拽排序
   */
  rowSortable: {
    type: [Boolean, Object] as PropType<boolean | GridSortableOptions>,
    default: false
  },
  /**
   * 列拖拽排序
   */
  columnSortable: {
    type: [Boolean, Object] as PropType<boolean | GridSortableOptions>,
    default: false
  },

  /**
   * 获取自定义配置
   */
  getCustom: {
    type: Function as PropType<(id: string) => Promise<GridCustomInfo>>
  },

  /**
   * 保存自定义配置
   */
  saveCustom: {
    type: Function as PropType<(info: GridCustomInfo) => Promise<any>>
  }
};
