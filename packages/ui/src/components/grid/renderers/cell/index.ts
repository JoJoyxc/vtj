import { h } from 'vue';
import { ElLink, ElTag, ElImage } from 'element-plus';
import { XActionBar } from '../../../action-bar';
import { createCellRenderProps, registerRender } from '../../utils';

registerRender('LinkCell', {
  cellClassName: 'x-grid__LinkCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElLink, { type: 'primary', ...props }, () => cellValue);
  }
});

registerRender('TagCell', {
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

registerRender('ImageCell', {
  cellClassName: 'x-grid__ImageCell',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return h(ElImage, { src: cellValue, ...props });
  }
});

registerRender('ActionsCell', {
  cellClassName: 'x-grid__ActionsCell',
  renderDefault(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return h(XActionBar, { ...props });
  }
});
