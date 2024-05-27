import { h } from 'vue';
import { createCellRenderProps, registerRender } from '../utils';
import { ElText } from 'element-plus';
import { baseRendererOptions } from './input';

registerRender('XText', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-text',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElText, { ...props }, () => cellValue);
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElText, { ...props }, () => cellValue);
  }
});
