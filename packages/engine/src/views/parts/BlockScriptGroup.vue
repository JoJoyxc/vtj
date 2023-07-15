<template>
  <SubPanel :title="props.title" :tools="plusTool" @tool-click="onAdd">
    <ElForm size="small" label-width="100px" @keydown.enter.prevent.stop>
      <DataItem
        v-for="item in list"
        :title="item.title"
        :background="false"
        editable
        clickable
        removable
        @click="onEdit(item.model)"
        @edit="onEdit(item.model)"
        @remove="onRemove(item.model)"></DataItem>
      <ElEmpty v-if="!list.length" :image-size="40"></ElEmpty>
    </ElForm>
    <JSDataDialog
      v-if="visible && props.type !== 'watch'"
      :key="keyRef"
      :block="block"
      :data="data"
      :title="props.title"
      :type="props.type"
      :nameLabel="props.nameLabel"
      :valueLabel="props.valueLabel"
      :dataType="props.dataType"
      :defaults="props.defaults"
      v-model="visible">
    </JSDataDialog>
    <WatchDataDialog
      v-if="visible && props.type === 'watch'"
      :key="keyRef"
      :block="block"
      :data="data"
      v-model="visible"></WatchDataDialog>
  </SubPanel>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { ElForm, ElEmpty } from 'element-plus';
import { SubPanel, DataItem } from '../shared';
import { useBlockScript, BlockScriptType } from '../../hooks';
import { Block } from '../../models';
import JSDataDialog from './JSDataDialog.vue';
import WatchDataDialog from './WatchDataDialog.vue';

export interface Props {
  block: Block;
  type: BlockScriptType;
  dataType: 'JSExpression' | 'JSFunction';
  title?: string;
  nameLabel?: string;
  valueLabel?: string;
  defaults?: string;
}

const props = defineProps<Props>();

const block = computed(() => props.block);

const plusTool = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];

const { data, list, onAdd, onEdit, onRemove, visible, keyRef } = useBlockScript(
  block,
  props.type
);
</script>
