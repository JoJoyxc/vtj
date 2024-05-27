import { h, createTextVNode } from 'vue';
import { type RendererOptions } from 'vxe-table';
import { registerRender } from '../utils';
import { sharedFilterOptions } from './shared';
import InputEdit from './components/InputEdit.vue';
import InputFilter from './components/InputFilter.vue';

export const baseRendererOptions: RendererOptions = {
  autofocus: '.el-input__inner',
  renderEdit(renderOpts, params) {
    return h(InputEdit, { params, renderOpts });
  },
  renderDefault(_renderOpts, params) {
    const { row, column } = params;
    return createTextVNode(row[column.field]);
  },
  renderCell(_renderOpts, params) {
    const { row, column } = params;
    return createTextVNode(row[column.field]);
  }
};

registerRender('XInput', {
  cellClassName: 'x-grid__edit',
  ...baseRendererOptions,
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return h(InputFilter, { params, renderOpts });
  }
});
