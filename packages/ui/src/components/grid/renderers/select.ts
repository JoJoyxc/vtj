import { h } from 'vue';
import { registerRender } from '../utils';
import { sharedFilterOptions } from './shared';
import SelectEdit from './components/SelectEdit.vue';
import SelectFilter from './components/SelectFilter.vue';
import { baseRendererOptions } from './input';

registerRender('XSelect', {
  ...baseRendererOptions,
  cellClassName: 'x-grid__edit',
  autofocus: '.el-select__input',
  renderEdit(renderOpts, params) {
    return h(SelectEdit, { params, renderOpts });
  },
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return h(SelectFilter, { params, renderOpts });
  }
});
