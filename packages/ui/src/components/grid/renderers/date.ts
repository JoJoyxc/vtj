import { h, createTextVNode } from 'vue';
import { registerRender } from '../utils';
import { sharedFilterOptions } from './shared';
import DateEdit from './components/DateEdit.vue';
import DateFilter from './components/DateFilter.vue';

registerRender('XDate', {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-select__input',
  renderEdit(renderOpts, params) {
    return h(DateEdit, { params, renderOpts });
  },
  renderCell(_renderOpts, params) {
    const { row, column } = params;
    return createTextVNode(row[column.field]);
  },
  renderDefault(_renderOpts, params) {
    const { row, column } = params;
    return createTextVNode(row[column.field]);
  },
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return h(DateFilter, { params, renderOpts });
  }
});
