<template>
  <Panel
    class="v-pages-widget"
    title="页面管理"
    plus
    subtitle="(共 0 条)"
    @plus="onPlus">
    <ElTree :data="pages" node-key="id" default-expand-all draggable>
      <template #default="{ data }">
        <Item
          class="v-pages-widget__item"
          :icon="icons[data.icon]"
          :title="data.title"
          :subtitle="data.name"
          :model-value="data"
          :actions="
            data.dir
              ? ['add', 'edit', 'remove']
              : ['home', 'copy', 'edit', 'remove']
          "
          @action="onAction"
          :tag="project?.homepage === data.id ? '首页' : undefined"
          tag-type="success"
          grow
          small
          background
          hover></Item>
      </template>
    </ElTree>

    <PageForm
      v-if="visible"
      v-model="visible"
      :item="item"
      :parent-id="parentId"></PageForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElTree } from 'element-plus';
  import { icons } from '@vtj/icons';
  import { cloneDeep } from '@vtj/utils';
  import PageForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useProject } from '../../hooks';

  defineOptions({
    name: 'PagesWidget'
  });

  const { project } = useProject();
  const pages = computed(() => project.value?.pages || []);

  const visible = ref(false);
  const item = ref();
  const parentId = ref();

  const onPlus = () => {
    parentId.value = undefined;
    item.value = undefined;
    visible.value = true;
  };

  const onAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'add') {
      item.value = undefined;
      parentId.value = modelValue.id;
      visible.value = true;
    }

    if (name === 'edit') {
      item.value = cloneDeep(modelValue);
      parentId.value = undefined;
      visible.value = true;
    }
  };
</script>
