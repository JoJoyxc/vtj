<template>
  <div class="v-actions-widget">
    <ElBadge :value="0" :max="99" :hidden="true">
      <XAction mode="icon" :icon="VtjIconBug" background="hover"></XAction>
    </ElBadge>

    <ElDivider direction="vertical"></ElDivider>

    <ElButton
      @click="onPreview"
      :type="isPreview ? 'warning' : 'default'"
      size="small"
      title="预览">
      <VtjIconPreview></VtjIconPreview>
    </ElButton>

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
    <ElDivider direction="vertical"></ElDivider>
    <ElDropdown split-button type="primary" size="small">
      <span>发布</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="current">发布页面</ElDropdownItem>
          <ElDropdownItem command="home">整站发布</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
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
    VtjIconRefresh,
    VtjIconBug,
    VtjIconPreview
  } from '@vtj/icons';
  import { XAction } from '@vtj/ui';
  import { delay } from '@vtj/utils';
  import { useSelected } from '../../hooks';

  export interface Props {
    coder?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    coder: true,
    copy: true
  });

  const { engine, designer } = useSelected();
  const isPreview = ref(false);
  const refresh = () => {
    if (engine.current.value) {
      if (isPreview.value) {
        const widget = engine.skeleton?.getWidget('Previewer');
        widget?.widgetRef.refresh();
      } else {
        designer.value?.setSelected(null);
        engine.simulator.refresh();
      }
      ElMessage.success({
        message: '刷新完成'
      });
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const openCodeSetting = async () => {
    if (engine.current.value) {
      if (isPreview.value) {
        engine.skeleton?.closePreview();
        isPreview.value = false;
        await delay(1000);
      }
      designer.value?.setSelected(engine.current.value);
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const onPreview = () => {
    const project = engine.project.value;
    if (!project) return;
    if (engine.current.value) {
      if (isPreview.value) {
        engine.skeleton?.closePreview();
        isPreview.value = false;
        return;
      }
      engine.skeleton?.openPreview('');
      isPreview.value = true;
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  defineOptions({
    name: 'ActionsWidget',
    inheritAttrs: false
  });
</script>
