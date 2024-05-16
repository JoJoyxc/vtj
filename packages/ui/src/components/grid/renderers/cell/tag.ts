import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElTag } from 'element-plus';
import { createCellRenderValue } from '../../utils';

VXETable.renderer.add('TagCell', {
  cellClassName: 'x-grid__TagCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue, row, column } = createCellRenderValue(
      renderOpts,
      params
    );
    const onClick = () => {
      props.onClick && props.onClick({ cellValue, row, column });
    };
    return h(
      ElTag,
      { size: 'small', type: 'primary', ...props, onClick },
      () => cellValue
    );
  }
});
