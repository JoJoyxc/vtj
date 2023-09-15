import { createVNode, render, AppContext } from 'vue';
import { DialogProps } from './types';
import XDialog from './Dialog.vue';

export function createDialog(props: DialogProps, context?: AppContext | null) {
  const container = document.createElement('div');
  const vnode = createVNode(XDialog, props);
  vnode.appContext = context ?? (createDialog as any)._context;
  render(vnode, container);
  const destroy = () => {
    render(null, container);
    container.parentNode?.removeChild(container);
  };

  vnode.props!.onDestroy = () => {
    destroy();
  };

  // vnode.props!.onClose = () => {
  //   destroy();
  // };

  document.body.appendChild(container);
  return {
    vnode,
    destroy
  };
}
