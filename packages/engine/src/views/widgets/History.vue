<template>
  <Panel title="历史记录" :subtitle="subtitle" class="vtj-histroy">
    <ElEmpty v-if="list.length === 0" :image-size="50"></ElEmpty>
    <DataItem
      v-for="(item, index) in list"
      :title="item.title"
      :active="engine.simulator.history.value?.index === index"
      @remove="onRemove(item)"
      @click="onClick(item)"
      removable
      clickable></DataItem>
  </Panel>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Panel, DataItem } from '../shared';
import { useCore } from '../../hooks';
import { HistoryItemSchema } from '../../core';
import { ElEmpty, ElMessageBox } from 'element-plus';
const { engine } = useCore();

const list = computed(() => engine.simulator.history.value?.list || []);

const subtitle = computed(() => {
  return `(共 ${list.value.length} 条)`;
});

const onRemove = async (item: HistoryItemSchema) => {
  const ret = await ElMessageBox.confirm('确定删除?', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    engine.simulator.history.value?.remove(item.id);
  }
};

const onClick = (item: HistoryItemSchema) => {
  engine.simulator.history.value?.load(item.id);
};
</script>
