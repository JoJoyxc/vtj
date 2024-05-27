import { h } from 'vue';
import { createCellRenderProps, registerRender } from '../utils';
import { ElLink } from 'element-plus';
import { baseRendererOptions } from './input';

registerRender('XLink', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-link',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(
      ElLink,
      { type: 'primary', target: '_blank', href: cellValue, ...props },
      () => cellValue
    );
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(
      ElLink,
      { type: 'primary', target: '_blank', href: cellValue, ...props },
      () => cellValue
    );
  }
});
