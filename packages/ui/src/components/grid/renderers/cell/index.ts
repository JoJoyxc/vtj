import { h } from 'vue';
import { VXETable } from 'vxe-table';
import { ElLink, ElTag, ElImage } from 'element-plus';
import { XActionBar } from '../../../action-bar';
import { createCellRenderProps } from '../../utils';

export function registerCell() {
  
  VXETable.renderer.add('LinkCell', {
    cellClassName: 'x-grid__LinkCell',
    renderDefault(renderOpts, params) {
      const { props, cellValue } = createCellRenderProps(renderOpts, params);
      return h(ElLink, { type: 'primary', ...props }, () => cellValue);
    }
  });

  VXETable.renderer.add('TagCell', {
    cellClassName: 'x-grid__TagCell',
    renderDefault(renderOpts, params) {
      const { props, cellValue } = createCellRenderProps(renderOpts, params);

      return h(
        ElTag,
        { size: 'small', type: 'primary', ...props },
        () => cellValue
      );
    }
  });

  VXETable.renderer.add('ImageCell', {
    cellClassName: 'x-grid__ImageCell',
    renderDefault(renderOpts, params) {
      const { props, cellValue } = createCellRenderProps(renderOpts, params);
      return h(ElImage, { src: cellValue, ...props });
    }
  });

  VXETable.renderer.add('ActionsCell', {
    cellClassName: 'x-grid__ActionsCell',
    renderDefault(renderOpts, params) {
      const { props } = createCellRenderProps(renderOpts, params);
      return h(XActionBar, { ...props });
    }
  });
}
