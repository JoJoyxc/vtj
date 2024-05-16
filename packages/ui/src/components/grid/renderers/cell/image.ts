import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElImage } from 'element-plus';
import { createCellRenderValue } from '../../utils';

VXETable.renderer.add('ImageCell', {
  cellClassName: 'x-grid__ImageCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue, row, column } = createCellRenderValue(
      renderOpts,
      params
    );
    const onClick = () => {
      props.onClick && props.onClick({ cellValue, row, column });
    };
    return h(ElImage, { src: cellValue, ...props, onClick });
  }
});
