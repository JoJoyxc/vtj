import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElTag } from 'element-plus';
import { createCellRenderProps } from '../../utils';

VXETable.renderer.add('TagCell', {
  cellClassName: 'x-grid__TagCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);

    return h(
      ElTag,
      { size: 'small', type: 'primary', ...props },
      () => cellValue
    );
  }
});
