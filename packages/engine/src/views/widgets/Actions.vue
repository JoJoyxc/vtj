<template>
  <div>
    <ElButton @click="refresh" type="default" size="small" title="刷新">
      <i class="vtj-icon-refresh"></i>
    </ElButton>
    <ElButton
      type="default"
      size="small"
      title="页面设置"
      @click="openCodeSetting">
      <i class="vtj-icon-setting"></i>
    </ElButton>
    <ElButton
      type="default"
      size="small"
      title="页面大纲树"
      @click="openOutline">
      <i class="vtj-icon-outline"></i>
    </ElButton>
    <ElDivider direction="vertical"></ElDivider>
    <ElButton type="success" size="small" @click="preview">预览</ElButton>
    <!-- <ElButton type="warning" size="small" @click="publish">发布</ElButton> -->
    <ElTooltip
      effect="dark"
      content="内测中，暂未开放。"
      placement="bottom-end">
      <ElButton type="primary" size="small">出码</ElButton>
    </ElTooltip>
  </div>
</template>
<script lang="ts" setup>
import { toValue } from 'vue';
import { ElButton, ElMessage, ElDivider, ElTooltip } from 'element-plus';
import { useCore, useDesigner } from '../../hooks';
import { EVENT_ACTION_PREVIEW } from '../../core';
const { project, engine, emitter } = useCore();
// const { selected } = useDesigner();
const refresh = () => {
  if (project.current.value) {
    const { designer } = useDesigner();
    designer.selected.value = null;
    engine.simulator.renderer?.render(project.current.value);
  } else {
    ElMessage.warning({
      message: '请先打开文件'
    });
  }
};

const preview = () => {
  const id = project.current.value?.id;
  if (id) {
    const file = project.getFile(id);
    emitter.emit(EVENT_ACTION_PREVIEW, file);
  }
};

const publish = () => {
  // const id = project.current?.id;
  // if (id) {
  //   emitter.emit(EVENT_ACTION_PUBLISH, id);
  // }
};

const openCodeSetting = () => {
  if (project.current.value) {
    const { designer } = useDesigner();
    designer.setSelected(project.current.value);
    const setting = toValue(engine.skeleton.regionInstances.setting);
    if (setting) {
      setting.change(0);
    }
  } else {
    ElMessage.warning({
      message: '请先打开文件'
    });
  }
};

const openOutline = () => {
  if (project.current.value) {
    const apps = toValue(engine.skeleton.regionInstances.apps);
    apps.setCurrentWidget('outline');
  } else {
    ElMessage.warning({
      message: '请先打开文件'
    });
  }
};
</script>

<style lang="scss">
.vtj-action {
  padding: 0 10px;
  width: 40%;
  text-align: right;
  white-space: nowrap;
}
</style>
