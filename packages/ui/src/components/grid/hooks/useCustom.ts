import { type MaybeRef, ref, unref, onMounted } from 'vue';
import type {
  VxeGridInstance,
  GridProps,
  VxeGridPropTypes,
  VxeGridDefines,
  GridCustomInfo,
  GridSortableEvent,
  VxeTableDefines,
  VxeColumnPropTypes
} from '../types';
import { mergeCustomInfo, getName } from '../utils';
import { useAdapter } from '../../../adapter';

function createColumns(props: GridProps) {
  const { columns = [], cellRenders = {} } = props;
  for (const col of columns.slice(0)) {
    const { field } = col;
    if (!field || !cellRenders[field]) continue;
    const render = cellRenders[field];
    col.cellRender = typeof render === 'string' ? { name: render } : render;
  }
  return columns;
}

export function useCustom(
  vxeRef: MaybeRef<VxeGridInstance | undefined>,
  props: GridProps
) {
  const columns = ref<VxeGridPropTypes.Columns>(createColumns(props));
  const adapter = useAdapter();
  let info: GridCustomInfo | null = null;
  const { getCustom = adapter.getCustom, saveCustom = adapter.saveCustom } =
    props;

  const getId = (grid: VxeGridInstance) => {
    return `X_Grid_${grid.id || grid?.$.uid}`;
  };

  const onResize = (e: VxeGridDefines.ResizableChangeEventParams) => {
    if (!info) return;
    const column = e.column;
    const name = getName(column);
    const value = column.renderWidth;
    if (info.resize) {
      info.resize[name] = value;
    } else {
      info.resize = { [name]: value };
    }
    if (saveCustom) {
      saveCustom(info);
    }
  };

  const onCustom = (e: VxeGridDefines.CustomEventParams) => {
    if (!info) return;
    if (['confirm', 'reset'].includes(e.type)) {
      const { fullColumn, collectColumn } = e.$grid.getTableColumn();
      const visible: Record<string, boolean> = {};
      const fixed: Record<string, VxeColumnPropTypes.Fixed> = {};
      fullColumn.forEach((column) => {
        const name = getName(column);
        visible[name] = column.visible;
      });

      collectColumn.forEach((column) => {
        const name = getName(column);
        if (column.fixed) {
          fixed[name] = column.fixed;
        }
      });
      info.visible = visible;
      info.fixed = fixed;
      if (saveCustom) {
        saveCustom(info);
      }
    }
  };

  const onSort = (_e: GridSortableEvent) => {
    const grid = unref(vxeRef);
    if (!grid || !info) return;
    const { collectColumn } = grid.getTableColumn();
    const getSort = (columns: VxeTableDefines.ColumnInfo[]) => {
      const result: string[] = [];
      for (let col of columns) {
        result.push(getName(col));
        if (col.children) {
          result.push(...getSort(col.children));
        }
      }
      return result;
    };
    info.sort = getSort(collectColumn);
    if (saveCustom) {
      saveCustom(info);
    }
  };

  onMounted(async () => {
    const grid = unref(vxeRef);
    if (!grid || !getCustom) return;
    const id = getId(grid);
    info = (await getCustom(id).catch(() => null)) || { id };
    if (info) {
      columns.value = mergeCustomInfo(columns.value, info).slice(0);
    }
  });

  return {
    columns,
    onResize,
    onCustom,
    onSort
  };
}
