import { h } from 'vue';
import { registerRender, registerInterceptor } from '../../utils';
import InputEdit from './InputEdit.vue';
import SelectEdit from './SelectEdit.vue';
import DateEdit from './DateEdit.vue';

registerRender('InputEdit', {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-input__inner',
  renderEdit(renderOpts, params) {
    return h(InputEdit, { params, renderOpts });
  }
});

registerRender('SelectEdit', {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-select__input',
  renderEdit(renderOpts, params) {
    return h(SelectEdit, { params, renderOpts });
  }
});

registerRender('DateEdit', {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-input__inner',
  renderEdit(renderOpts, params) {
    return h(DateEdit, { params, renderOpts });
  }
});

registerInterceptor('event.clearEdit', (params) => {
  const { $grid, $event, $table } = params;
  const parent = $table.getParentElem();
  // 如果不是表格组件后代节点触发的clearEdit事件，阻止关闭编辑模式
  if (parent.contains($event.target)) {
    $grid.clearValidate();
  } else {
    return false;
  }
  console.log('event.clearEdit', params);
});
