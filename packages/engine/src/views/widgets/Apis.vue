<template>
  <Panel class="vtj-apis" title="Api管理" :tools="tools" @tool-click="onAdd">
    <ElEmpty v-if="!apis.length" :image-size="50"></ElEmpty>

    <DataItem
      v-for="api in apis"
      editable
      removable
      clickable
      @click="onEdit(api)"
      @edit="onEdit(api)"
      @remove="onRemove(api)">
      <template #title>
        {{ api.title }} <i class="vtj-apis__name">{{ api.name }}</i>
      </template>
    </DataItem>
    <ApiDialogForm
      v-if="dialogVisible"
      v-model="dialogVisible"
      :model="model"
      :project="project"></ApiDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessageBox, ElEmpty } from 'element-plus';
import { Panel, DataItem } from '../shared';
import { ApiSchema } from '../../core';
import ApiDialogForm from '../parts/ApiDialogForm.vue';
import { useCore } from '../../hooks';
const { project } = useCore();

const tools = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];

const apis = computed(() => project.apis.value);

const model = ref();
const dialogVisible = ref(false);

const onAdd = () => {
  model.value = undefined;
  dialogVisible.value = true;
};

const onEdit = (api: ApiSchema) => {
  model.value = api;
  dialogVisible.value = true;
};

const onRemove = async (api: ApiSchema) => {
  const ret = await ElMessageBox.confirm('确定删除?', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    project.removeApi(api.name);
  }
};
</script>
<style lang="scss">
.vtj-apis__name {
  opacity: 0.6;
}
</style>
