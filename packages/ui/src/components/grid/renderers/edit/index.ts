import { h } from 'vue';
import { VXETable } from 'vxe-table';
import InputEdit from './InputEdit.vue';

VXETable.renderer.add('InputEdit', {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-input__inner',
  renderEdit(renderOpts, params) {
    return h(InputEdit, { params, renderOpts });
    // const { row, column } = params;
    // return h(VxeInput, {
    //   modelValue: row[column.field],
    //   'onUpdate:modelValue': (value: any) => {
    //     row[column.field] = value;
    //     console.log('change');
    //     params.$grid?.updateStatus(params, value);
    //   }
    // });
  }
});
