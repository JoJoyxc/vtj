import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElLink } from 'element-plus';
import { createCellRenderValue } from '../../utils';

VXETable.renderer.add('LinkCell', {
  cellClassName: 'x-grid__LinkCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue, row, column } = createCellRenderValue(
      renderOpts,
      params
    );
    const onClick = () => {
      props.onClick && props.onClick({ cellValue, row, column });
    };
    return h(ElLink, { type: 'primary', ...props, onClick }, () => cellValue);
  }
});
