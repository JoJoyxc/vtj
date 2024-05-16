import { computed } from 'vue';
import type { GridProps } from '../types';

export function useColumns(props: GridProps) {
  return computed(() => {
    const { columns = [], cellRenders = {} } = props;
    for (const col of columns) {
      const { field } = col;
      if (!field || !cellRenders[field]) continue;
      const render = cellRenders[field];
      col.cellRender = typeof render === 'string' ? { name: render } : render;
    }
  });
}
