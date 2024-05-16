import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElImage } from 'element-plus';

VXETable.renderer.add('ImageCell', {
  cellClassName: 'x-grid__ImageCell',
  renderDefault(renderOpts, params) {
    const { row, column } = params;
    const { events, props } = renderOpts;
    const value = row[column.field];
    const onClick = () => {
      events?.onClick(value, params);
    };
    return h(ElImage, { src: value, ...props, onClick }, () => value);
  }
});
