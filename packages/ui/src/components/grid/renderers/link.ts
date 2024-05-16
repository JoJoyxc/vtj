import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElLink } from 'element-plus';

VXETable.renderer.add('LinkCell', {
  cellClassName: 'x-grid__LinkCell',
  renderDefault(renderOpts, params) {
    const { row, column } = params;
    const { events, props } = renderOpts;
    const value = row[column.field];
    const onClick = () => {
      events?.onClick(value, params);
    };
    return h(ElLink, { type: 'primary', ...props, onClick }, () => value);
  }
});
