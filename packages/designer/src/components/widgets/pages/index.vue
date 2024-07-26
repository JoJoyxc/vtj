<template>
  <Panel
    class="v-pages-widget"
    title="页面管理"
    plus
    subtitle="(共 0 条)"
    :menus="menus"
    @command="onPlusCommand"
    @plus="onPlus">
    <ElTree
      :data="pages"
      node-key="id"
      default-expand-all
      draggable
      :allow-drop="allowDrop"
      @node-drop="onNodeDrop">
      <template #default="{ data, node }">
        <Item
          class="v-pages-widget__item"
          :icon="icons[data.icon]"
          :title="data.title"
          :subtitle="data.name"
          :model-value="{ data, node }"
          :actions="
            data.dir
              ? ['add', 'edit', 'remove']
              : data.raw
                ? ['home', 'edit', 'remove']
                : ['home', 'copy', 'edit', 'remove']
          "
          @action="onAction"
          @click="onClick(data)"
          :active="current?.id === data.id"
          :tag="project?.homepage === data.id ? '主页' : undefined"
          tag-type="success"
          grow
          small
          background
          hover
          action-in-more></Item>
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
  import { ref, computed, toValue } from 'vue';
  import { ElTree } from 'element-plus';
  import { icons, VtjIconTemplate, VtjIconFile } from '@vtj/icons';
  import { type PageFile } from '@vtj/core';
  import { cloneDeep } from '@vtj/utils';
  import PageForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useProject, useCurrent } from '../../hooks';
  import { message, notify } from '../../../utils';

  defineOptions({
    name: 'PagesWidget'
  });

  const { project, engine } = useProject();
  const pages = computed(() => project.value?.pages || []);
  const { current } = useCurrent();
  const visible = ref(false);
  const item = ref();
  const parentId = ref();

  const menus = [
    {
      label: '新建空白页面',
      command: 'empty',
      icon: VtjIconFile
    },
    {
      label: '选择模板新建',
      command: 'template',
      icon: VtjIconTemplate
    }
  ];

  const onPlus = () => {
    parentId.value = undefined;
    item.value = undefined;
    visible.value = true;
  };

  const onPlusCommand = (command: string) => {
    if (command === 'empty') {
      onPlus();
    }
    if (command === 'template') {
      alert('模板');
    }
  };

  const onAction = async (action: any) => {
    const { name, modelValue } = action;
    const { data, node } = modelValue;
    if (name === 'add') {
      item.value = undefined;
      parentId.value = data.id;
      visible.value = true;
    }

    if (name === 'edit') {
      item.value = cloneDeep(data);
      parentId.value = undefined;
      visible.value = true;
    }
    if (name === 'remove') {
      if (data.dir) {
        const page = project.value?.getPage(data.id);
        if (page && page.children?.length) {
          notify('请先删除子页面');
          return;
        }
      }
      project.value?.removePage(data.id);
    }

    if (name === 'copy') {
      const parentId = node.parent?.data.id;
      project.value?.clonePage(data, parentId);
    }

    if (name === 'home') {
      project.value?.setHomepage(data.id);
      message('设置主页成功', 'success');
    }
  };

  const onClick = async (file: PageFile) => {
    if (file.raw) {
      message('这是源码模式页面，不能低代码设计', 'warning');
    }
    if (file.dir || file.raw) {
      engine.project.value?.deactivate();
    } else {
      engine.project.value?.active(file);
      const region = engine.skeleton?.getRegion('Workspace');
      if (region) {
        region.regionRef.openTab('Designer');
      }
    }
  };

  const allowDrop = (_draggingNode: any, dropNode: any, type: string) => {
    if (type === 'inner') {
      return !!dropNode.data.dir;
    }
    return true;
  };

  const onNodeDrop = () => {
    project.value?.update({
      pages: toValue(pages)
    });
  };
</script>
