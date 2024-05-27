import { h } from 'vue';
import { createCellRenderProps, registerRender } from '../utils';
import { XActionBar } from '../../action-bar';
import { baseRendererOptions } from './input';

registerRender('XActions', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-actions',
  renderDefault(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return h(XActionBar, { ...props });
  },
  renderCell(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return h(XActionBar, { ...props });
  }
});
