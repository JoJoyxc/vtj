import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElImage } from 'element-plus';
import { createCellRenderProps } from '../../utils';

VXETable.renderer.add('ImageCell', {
  cellClassName: 'x-grid__ImageCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElImage, { src: cellValue, ...props });
  }
});
