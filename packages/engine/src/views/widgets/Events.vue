<template>
  <div class="vtj-setting-panel vtj-events">
    <SubPanel title="组件事件">
      <DataItem
        v-for="item in componentEventList"
        :title="item.name"
        :active="!!item.event"
        :removable="!!item.event"
        :background="false"
        editable
        clickable
        @click="openEdit(item)"
        @edit="openEdit(item)"
        @remove="onRemove(item.name)"></DataItem>
      <ElEmpty
        v-if="componentEventList.length === 0"
        :image-size="50"
        description="该组件无自带事件"></ElEmpty>
    </SubPanel>
    <SubPanel title="鼠标事件">
      <DataItem
        v-for="item in mouseEventList"
        :title="item.name"
        :active="!!item.event"
        :removable="!!item.event"
        :background="false"
        editable
        clickable
        @click="openEdit(item)"
        @edit="openEdit(item)"
        @remove="onRemove(item.name)"></DataItem>
    </SubPanel>
    <SubPanel title="键盘事件">
      <DataItem
        v-for="item in keyboardEventList"
        :title="item.name"
        :active="!!item.event"
        :removable="!!item.event"
        :background="false"
        editable
        clickable
        @click="openEdit(item)"
        @edit="openEdit(item)"
        @remove="onRemove(item.name)"></DataItem>
    </SubPanel>
    <EventBinder
      v-if="currentItem"
      :key="keyRef"
      v-model="dialogVisible"
      :node="node"
      v-bind="currentItem"
      @submit="onSubmit"
      @remove="onRemove"></EventBinder>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElEmpty, ElMessageBox } from 'element-plus';
import { SubPanel, DataItem, EventBinder } from '../shared';
import { useCore, useDesigner, useNodeEvents } from '../../hooks';
import { Node } from '../../models';
import { NodeEventSchema } from '../../core';

const { assets } = useCore();
const { selected } = useDesigner();
const node = computed(() => selected.value?.node as Node);
const { mouseEventList, keyboardEventList, componentEventList } = useNodeEvents(
  node,
  assets
);
const dialogVisible = ref<boolean>(false);
const currentItem = ref();

const keyRef = ref(Symbol());

const openEdit = (item: any) => {
  keyRef.value = Symbol();
  currentItem.value = item;
  dialogVisible.value = true;
};

const onSubmit = (event: NodeEventSchema) => {
  if (currentItem.value) {
    node.value.setEvent(currentItem.value.name, event);
  }
};

const onRemove = async (name: string) => {
  const ret = await ElMessageBox.confirm('确定删除事件绑定？', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    node.value.removeEvent(name);
    currentItem.value = null;
    dialogVisible.value = false;
  }
};
</script>
<style lang="scss"></style>
