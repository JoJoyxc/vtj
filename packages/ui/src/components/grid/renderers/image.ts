import { h } from 'vue';
import { createCellRenderProps, registerRender } from '../utils';
import { ElImage } from 'element-plus';
import { baseRendererOptions } from './input';

registerRender('XImage', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-image',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElImage, {
      style: { width: '100px', height: '100px' },
      src: cellValue,
      ...props
    });
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElImage, {
      style: { width: '100px', height: '100px' },
      src: cellValue,
      ...props
    });
  }
});
