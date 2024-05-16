import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElTag } from 'element-plus';

VXETable.renderer.add('TagCell', {
  cellClassName: 'x-grid__TagCell',
  renderDefault(renderOpts, params) {
    const { row, column } = params;
    const { events, props } = renderOpts;
    const value = row[column.field];
    const onClick = () => {
      events?.onClick(value, params);
    };
    return h(
      ElTag,
      { size: 'small', type: 'primary', ...props, onClick },
      () => value
    );
  }
});
