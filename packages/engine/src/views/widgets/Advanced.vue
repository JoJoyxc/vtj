<template>
  <div v-if="block" class="vtj-setting-panel vtj-advanced">
    <SubPanel title="属性" :tools="plusTool" @tool-click="onAddProp">
      <DataItem
        v-for="prop in propsList"
        :title="prop.name"
        editable
        removable
        clickable
        @remove="onRemoveProp(prop)"
        @click="onEditProp(prop)"
        @edit="onEditProp(prop)"></DataItem>
      <ElEmpty v-if="propsList.length === 0" :image-size="50"></ElEmpty>
      <BlockDefineProps
        v-if="propsDialogVisible"
        :block="block"
        :form-data="currentProp"
        v-model="propsDialogVisible"></BlockDefineProps>
    </SubPanel>
    <SubPanel title="事件" :tools="plusTool" @tool-click="onAddEmit">
      <DataItem
        v-for="emit in emitsList"
        :title="emit"
        removable
        @remove="onRemoveEmit(emit)"></DataItem>
      <ElEmpty v-if="emitsList.length === 0" :image-size="50"></ElEmpty>
      <BlockDefineEmits
        v-if="emitDialogVisible"
        v-model="emitDialogVisible"
        :block="block"></BlockDefineEmits>
    </SubPanel>
    <SubPanel title="插槽" :tools="plusTool" @tool-click="onAddSlot">
      <DataItem
        v-for="slot in slotsList"
        :title="slot"
        removable
        @remove="onRemoveSlot(slot)"></DataItem>
      <ElEmpty v-if="slotsList.length === 0" :image-size="50"></ElEmpty>
      <BlockDefineSlots
        v-if="slotDialogVisible"
        v-model="slotDialogVisible"
        :block="block"></BlockDefineSlots>
    </SubPanel>
    <SubPanel title="注入" :tools="plusTool" @tool-click="onAddInject">
      <DataItem
        v-for="item in injectList"
        :title="item.name"
        editable
        removable
        clickable
        @remove="onRemoveInject(item)"
        @click="onEditInject(item)"
        @edit="onEditInject(item)"></DataItem>
      <ElEmpty v-if="injectList.length === 0" :image-size="50"></ElEmpty>
      <BlockInject
        v-if="injectDialogVisible"
        v-model="injectDialogVisible"
        :form-data="currentInject"
        :block="block"></BlockInject>
    </SubPanel>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SubPanel, DataItem } from '../shared';
import BlockDefineProps from '../parts/BlockDefineProps.vue';
import BlockDefineEmits from '../parts/BlockDefineEmits.vue';
import BlockDefineSlots from '../parts/BlockDefineSlots.vue';
import BlockInject from '../parts/BlockInject.vue';
import { useDesigner } from '../../hooks';
import { isBlock } from '../../utils';
import { ElMessageBox, ElEmpty } from 'element-plus';
const { selected } = useDesigner();

const block = computed(() => {
  const current = selected.value?.node;
  return isBlock(current) ? current : null;
});
const plusTool = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];

const propsList = computed(() => {
  if (!block.value) return [];
  return block.value.props?.map((n) => {
    return typeof n === 'string'
      ? {
          name: n,
          required: false,
          type: undefined,
          default: {
            type: 'JSExpression',
            value: ''
          }
        }
      : {
          default: {
            type: 'JSExpression',
            value: ''
          },
          required: false,
          type: undefined,
          ...n
        };
  });
});
const emitsList = computed(() => block.value?.emits || []);
const slotsList = computed(() => block.value?.slots || []);

const injectList = computed(() => {
  if (!block.value) return [];
  return block.value.inject?.map((n) => {
    return {
      from: '',
      default: {
        type: 'JSExpression',
        value: ''
      },
      ...n
    };
  });
});

const propsDialogVisible = ref(false);
const currentProp = ref();
const emitDialogVisible = ref(false);
const slotDialogVisible = ref(false);
const injectDialogVisible = ref();
const currentInject = ref();

const onAddProp = () => {
  currentProp.value = undefined;
  propsDialogVisible.value = true;
};

const onEditProp = (item: any) => {
  currentProp.value = item;
  propsDialogVisible.value = true;
};

const onRemoveProp = async (item: any) => {
  const ret = await ElMessageBox.confirm('确定删除', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    block.value?.removeProp(item);
  }
};

const onAddEmit = () => {
  emitDialogVisible.value = true;
};

const onRemoveEmit = async (item: any) => {
  const ret = await ElMessageBox.confirm('确定删除', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    block.value?.removeEmit(item);
  }
};

const onAddSlot = () => {
  slotDialogVisible.value = true;
};

const onRemoveSlot = async (item: any) => {
  const ret = await ElMessageBox.confirm('确定删除', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    block.value?.removeSlot(item);
  }
};

const onAddInject = () => {
  currentInject.value = undefined;
  injectDialogVisible.value = true;
};

const onRemoveInject = async (item: any) => {
  const ret = await ElMessageBox.confirm('确定删除', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    block.value?.removeInject(item);
  }
};

const onEditInject = async (item: any) => {
  currentInject.value = item;
  injectDialogVisible.value = true;
};
</script>
<style lang="scss"></style>
