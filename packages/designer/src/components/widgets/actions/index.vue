<template>
  <div class="v-actions-widget">
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
      type="default"
      size="small"
      title="页面大纲树"
      @click="openOutline">
      <VtjIconOutline></VtjIconOutline>
    </ElButton>
    <ElDivider direction="vertical"></ElDivider>
    <ElButton type="primary" size="small" :icon="HomeFilled" @click="onView">
      浏览
    </ElButton>
    <ElButton type="success" size="small" @click="preview">预览</ElButton>
    <ElButton
      v-if="props.coder"
      type="warning"
      size="small"
      @click="onCoder"
      :loading="loading">
      出码
    </ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton, ElMessage, ElDivider } from 'element-plus';
  import {
    HomeFilled,
    VtjIconSetting,
    VtjIconOutline,
    VtjIconRefresh
  } from '@vtj/icons';
  import { useSelected } from '../../hooks';

  export interface Props {
    coder?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    coder: true,
    copy: true
  });

  const { engine, designer } = useSelected();

  const loading = ref(false);

  const refresh = () => {
    if (engine.current.value) {
      designer.value.setSelected(null);
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

  const preview = () => {
    ElMessage.warning({
      message: '请先打开文件'
    });
  };

  const openCodeSetting = () => {
    if (engine.current.value) {
      designer.value.setSelected(engine.current.value);
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

  const onView = () => {
    ElMessage.warning({
      message: '请先设置项目首页'
    });
  };

  defineOptions({
    name: 'ActionsWidget',
    inheritAttrs: false
  });
</script>
