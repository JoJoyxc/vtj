import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { XActionBar } from '../../../action-bar';
import { createCellRenderProps } from '../../utils';

VXETable.renderer.add('ActionsCell', {
  cellClassName: 'x-grid__ActionsCell',
  renderDefault(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return h(XActionBar, { ...props });
  }
});
