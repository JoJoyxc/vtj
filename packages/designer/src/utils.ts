import { type NodeModel, type BlockModel, isBlock } from '@vtj/core';
import { ElNotification, ElMessageBox } from 'element-plus';

export function getComponentName(node: NodeModel | BlockModel) {
  if (isBlock(node)) return node.name;
  if (node.name === 'component') {
    const name = node.props.is?.value;
    return typeof name === 'string' ? name : node.name;
  }
  return node.name;
}

export function notify(message: string) {
  return ElNotification.warning({
    title: '提示',
    message
  });
}

export async function confirm(message: string) {
  return await ElMessageBox.confirm(message, '提示', { type: 'warning' }).catch(
    () => false
  );
}
