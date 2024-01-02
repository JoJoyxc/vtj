<template>
  <div class="v-actions-widget">
    <ElBadge :value="0" :max="99" :hidden="true">
      <XAction mode="icon" :icon="VtjIconBug" background="hover"></XAction>
    </ElBadge>

    <ElDivider direction="vertical"></ElDivider>

    <ElButton @click="refresh" type="default" size="small" title="刷新">
      <VtjIconRefresh></VtjIconRefresh>
    </ElButton>
    <ElButton
      type="default"
      size="small"
      title="页面设置"
      @click="openCodeSetting">
      <VtjIconSetting></VtjIconSetting>
    </ElButton>

    <ElButton
      v-if="false"
      type="default"
      size="small"
      title="页面大纲树"
      @click="openOutline">
      <VtjIconOutline></VtjIconOutline>
    </ElButton>
    <ElDivider direction="vertical"></ElDivider>
    <ElDropdown
      split-button
      type="primary"
      size="small"
      @click="preview('current')"
      @command="preview">
      <span>预览</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="current">当前文件</ElDropdownItem>
          <ElDropdownItem command="home">主页</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <ElDropdown
      v-if="props.coder"
      split-button
      type="success"
      size="small"
      @click="onCoder">
      <span>出码</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="current">当前文件</ElDropdownItem>
          <ElDropdownItem command="all">全部</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<script lang="ts" setup>
  // import { ref } from 'vue';
  import {
    ElButton,
    ElMessage,
    ElDivider,
    ElBadge,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  } from 'element-plus';
  import {
    VtjIconSetting,
    VtjIconOutline,
    VtjIconRefresh,
    VtjIconBug
  } from '@vtj/icons';
  import { XAction } from '@vtj/ui';
  import { useSelected } from '../../hooks';

  export interface Props {
    coder?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    coder: true,
    copy: true
  });

  const emits = defineEmits(['preview', 'coder']);

  const { engine, designer } = useSelected();

  // const loading = ref(false);

  const refresh = () => {
    if (engine.current.value) {
      designer.value?.setSelected(null);
      engine.simulator.refresh();
      ElMessage.success({
        message: '刷新完成'
      });
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const preview = (type: 'current' | 'home') => {
    const project = engine.project.value;
    if (!project) return;
    if (type === 'current') {
      if (engine.current.value) {
        emits('preview', type, project.currentFile);
      } else {
        ElMessage.warning({
          message: '请先打开文件'
        });
      }
    }
    if (type === 'home') {
      const home = project.homepage ? project.getPage(project.homepage) : null;
      if (home) {
        emits('preview', type, home);
      } else {
        ElMessage.warning({
          message: '请先设置主页'
        });
      }
    }
  };

  const openCodeSetting = () => {
    if (engine.current.value) {
      designer.value?.setSelected(engine.current.value);
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const openOutline = () => {
    if (engine.current.value) {
      engine.skeleton?.getRegion('Apps').regionRef.setActive('Outline');
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const onCoder = () => {};

  defineOptions({
    name: 'ActionsWidget',
    inheritAttrs: false
  });
</script>
