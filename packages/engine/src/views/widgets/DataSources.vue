<template>
  <Panel class="vtj-data-sources" :title="null" :body-padding="false">
    <SubPanel title="Api" :tools="plusTool" @tool-click="onAdd">
      <ElEmpty v-if="apiDataSources.length === 0" :image-size="50"></ElEmpty>
      <DataItem
        v-for="item in apiDataSources"
        editable
        removable
        clickable
        @click="onEdit(item)"
        @edit="onEdit(item)"
        @remove="onRemove(item)">
        <template #title>
          {{ item.title }}
          <i class="vtj-data-sources__subtitle">{{ item.name }}</i>
        </template>
      </DataItem>
    </SubPanel>
    <ApiDataSourceForm
      v-if="dialogVisible"
      v-model="dialogVisible"
      :model="model"
      :block="block"></ApiDataSourceForm>
  </Panel>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElEmpty, ElMessageBox } from 'element-plus';
import { Panel, SubPanel, DataItem } from '../shared';
import ApiDataSourceForm from '../parts/ApiDataSourceForm.vue';
import { useDesigner } from '../../hooks';
import { Block } from '../../models';
import { DataSourceSchema } from '../../core';
const { selected } = useDesigner();

const block = computed(() => selected.value?.node as Block);

const apiDataSources = computed(() =>
  Object.values(block.value?.dataSources || {}).filter((n) => n.type === 'api')
);
const plusTool = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];
const dialogVisible = ref();
const model = ref();
const onAdd = () => {
  model.value = undefined;
  dialogVisible.value = true;
};
const onEdit = (item: DataSourceSchema) => {
  model.value = item;
  dialogVisible.value = true;
};
const onRemove = async (item: DataSourceSchema) => {
  const ret = await ElMessageBox.confirm('确定删除？', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    block.value.removeDataSource(item.name);
  }
};
</script>

<style lang="scss">
.vtj-data-sources {
  .vtj-sub-panel {
    height: 100%;
  }
  &__subtitle {
    opacity: 0.6;
  }
}
</style>
