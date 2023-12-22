<template>
  <Panel class="v-outline-widget" title="大纲树">
    <ElTree
      :data="tree"
      node-key="id"
      default-expand-all
      draggable
      empty-text="请新建或打开文件"
      :current-node-key="currentNodeKey"
      :highlight-current="true"
      :expand-on-click-node="false"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @current-change="handleCurrentChange"
      @node-drop="handleDrop"
      @mouseover="handleMouseOver"
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd">
      <template #default="{ data, node }">
        <Item
          class="v-outline-widget__item"
          :class="{
            'is-locked': data.model.locked,
            'is-invisible': data.model.invisible,
            'is-dragging': data.dragging
          }"
          :active="!data.model.invisible && node.isCurrent"
          grow
          small
          background
          hover
          :model-value="data.model"
          :icon="
            data.model.locked
              ? VtjIconLock
              : data.model.invisible
              ? VtjIconInvisible
              : undefined
          "
          :title="data.label"
          :subtitle="data.type"
          :actions="getActions(data.model)"
          @action="onAction">
        </Item>
      </template>
    </ElTree>
  </Panel>
</template>
<script lang="ts" setup>
  import { computed, watch, ref, type Ref } from 'vue';
  import { ElTree } from 'element-plus';
  import {
    type NodeModel,
    type BlockModel,
    type DropPosition,
    isBlock
  } from '@vtj/core';
  import { VtjIconLock, VtjIconInvisible } from '@vtj/icons';
  import { Panel, Item } from '../../shared';
  import { useSelected, useCurrent } from '../../hooks';

  export interface TreeNodeData {
    id: string;
    label: string;
    type: string;
    model: NodeModel;
    children?: TreeNodeData[];
    dragging?: boolean;
  }

  export interface TreeRootData {
    id: string;
    label: string;
    type: string;
    model: BlockModel;
    children: TreeNodeData[];
  }

  defineOptions({
    name: 'OutlineWidget'
  });

  const { engine, designer, selected } = useSelected();
  const { current } = useCurrent();
  const tree: Ref<TreeRootData[]> = ref([]);

  const getNodeType = (node: NodeModel) => {
    if (node.slot && node.slot.name) {
      return `#${node.slot.name}`;
    }
    return 'Node';
  };

  const getActions = (node: BlockModel | NodeModel): any[] => {
    if (isBlock(node)) {
      return node.locked ? ['unlock'] : ['lock'];
    }
    const parent = node.parent;
    if (parent && (parent.locked || parent.invisible)) {
      return [];
    } else {
      if (current.value?.locked) {
        return [];
      }
    }

    if (node.locked) {
      return ['unlock'];
    }
    if (node.invisible) {
      return ['visible'];
    }

    return ['lock', 'invisible', 'copy', 'remove'];
  };

  const toTree = (models: NodeModel[]) => {
    const items: TreeNodeData[] = [];
    models.forEach((model) => {
      const item: TreeNodeData = {
        id: model.id,
        label: model.name,
        type: getNodeType(model),
        model
      };
      if (Array.isArray(model.children)) {
        item.children = toTree(model.children);
      }
      items.push(item);
    });
    return items;
  };

  const createTree = (): TreeRootData[] => {
    if (!current.value) return [];
    const { id, name, nodes } = current.value;
    const root: TreeRootData[] = [
      {
        id,
        label: name,
        type: 'Block',
        model: current.value,
        children: toTree(nodes)
      }
    ];
    return root;
  };

  const refreshTree = () => {
    tree.value = createTree();
  };

  const currentNodeKey = computed(() => {
    return selected.value?.model.id;
  });

  const allowDrag = (node: any) => {
    const item: TreeRootData | TreeNodeData = node.data;
    // 页面不能拖
    if (isBlock(item.model)) return false;
    // 锁定的节点不能更改
    if (item.model.locked) return false;
    // 插槽模板不能拖
    if (item.model.name === 'template') {
      return false;
    }

    const desc = engine.assets.componentMap.get(item.model.name);
    if (desc) {
      designer.value?.setDragging(desc);
      return true;
    }
    return false;
  };

  const allowDrop = (_dragging: any, drop: any, type: any) => {
    const data: TreeRootData | TreeNodeData = drop.data;
    // 不能放置Block同级
    if (isBlock(data.model)) {
      return type === 'inner';
    } else {
      const node: NodeModel = data.model;
      if (type === 'inner') {
        return designer.value?.allowDrop(node);
      } else {
        if (node.parent) {
          return designer.value?.allowDrop(node.parent);
        }
        return true;
      }
    }
  };

  const handleCurrentChange = (cur: any) => {
    const node = cur?.model;
    if (!node || node.invisible) return;
    designer.value?.setSelected(node);
  };

  const handleDrop = async (dragging: any, drop: any, type: any) => {
    const item: TreeNodeData = dragging.data;
    const target: TreeRootData | TreeNodeData = drop.data;
    if (isBlock(target.model)) {
      return;
    }
    const targetNode: NodeModel = target.model;
    const dropType =
      { before: 'left', after: 'right' }[type as string] || 'inner';
    const slot = await designer.value?.getDropSlot(
      type === 'inner' ? targetNode : targetNode.parent
    );

    if (slot !== null) {
      const node = item.model as NodeModel;
      node.slot = slot;
      current.value?.move(node, targetNode, dropType as DropPosition);
    } else {
      // 用户不选择插槽，还原树
      refreshTree();
    }
  };

  const handleMouseOver = (e: any) => {
    const vm = e.target?.__vueParentComponent;
    if (!vm) return;
    const item: TreeRootData | TreeNodeData = vm.ctx?.node?.data;
    if (!item) return;
    if (isBlock(item.model)) {
      designer.value?.setHover(item.model);
    } else {
      if (!item.model.invisible) {
        designer.value?.setHover(item.model);
      } else {
        designer.value?.setHover(null);
      }
    }
  };

  const handleDragStart = (node: any) => {
    const data: TreeNodeData = node.data;
    data.dragging = true;
    const desc = engine.assets.componentMap.get(data.model.name);
    if (desc) {
      designer.value?.setDragging(desc);
    }
  };

  const handleDragEnd = (node: any) => {
    const data: TreeNodeData = node.data;
    data.dragging = false;
    designer.value?.setDragging(null);
  };

  const cleanHelper = (
    selectedNode: BlockModel | NodeModel | undefined,
    model: NodeModel
  ) => {
    if (!selectedNode) return;
    if (
      selectedNode.id === model.id ||
      (!isBlock(selectedNode) && model.isChild(selectedNode))
    ) {
      designer.value?.setSelected(null);
    }
    designer.value?.setHover(null);
  };

  const onAction = (action: any) => {
    const { name, modelValue: model } = action;
    const selectedNode = selected.value?.model;
    switch (name) {
      case 'lock':
        cleanHelper(selectedNode, model);
        model.lock();
        break;
      case 'unlock':
        cleanHelper(selectedNode, model);
        model.unlock();
        break;
      case 'invisible':
        cleanHelper(selectedNode, model);
        model.setVisible(false);
        break;
      case 'visible':
        model.setVisible(true);
        break;
      case 'copy':
        const node = current.value?.cloneNode(model);
        if (node) {
          designer.value?.setSelected(node);
        }
        break;
      case 'remove':
        cleanHelper(selectedNode, model);
        current.value?.removeNode(model);

        break;
    }
  };

  watch(current, refreshTree, { immediate: true, deep: true });
</script>
