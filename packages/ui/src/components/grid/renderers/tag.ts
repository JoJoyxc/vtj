import { h } from 'vue';
import { createCellRenderProps, registerRender } from '../utils';
import { ElTag } from 'element-plus';
import { baseRendererOptions } from './input';

registerRender('XTag', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-tag',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(
      ElTag,
      { size: 'small', type: 'primary', ...props },
      () => cellValue
    );
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(
      ElTag,
      { size: 'small', type: 'primary', ...props },
      () => cellValue
    );
  }
});
