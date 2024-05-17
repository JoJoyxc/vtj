import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElLink } from 'element-plus';
import { createCellRenderProps } from '../../utils';

VXETable.renderer.add('LinkCell', {
  cellClassName: 'x-grid__LinkCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElLink, { type: 'primary', ...props }, () => cellValue);
  }
});
