<template>
  <div class="vtj-schema">
    <SubPanel
      class="vtj-schema__panel"
      subtitle="手动修改DSL有风险，可能导致页面无法加载，请确认您的操作无误。"
      :body-padding="false"
      :tools="tools"
      @tool-click="onSave">
      <Editor
        ref="editorRef"
        height="100%"
        lang="json"
        dark
        :model-value="dsl"></Editor>
    </SubPanel>
  </div>
</template>
<script lang="ts" setup>
import { watch, onUnmounted, ref, onMounted } from 'vue';
import { SubPanel } from '../shared';
import Editor from '../../editor';
import { useCore } from '../../hooks';
import { EVENT_NODE_CHANGE, BlockSchema } from '../../core';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
const { project, emitter } = useCore();

const dsl = ref('');
const editorRef = ref();

const tools = [
  {
    name: 'save',
    icon: 'vtj-icon-np-save'
  }
];

const update = () => {
  if (project.current.value) {
    dsl.value = JSON.stringify(project.current.value.toDsl(), null, 2);
  } else {
    dsl.value = '';
  }
};

const onSave = async () => {
  if (!project.current.value) return;
  const content = editorRef.value.getEditor().getValue();
  if (content) {
    const ret = await ElMessageBox.confirm(
      '手动修改DSL有风险，可能导致页面无法加载，请确认您的操作无误。',
      '提示',
      { type: 'warning' }
    ).catch((e) => false);
    if (!ret) return;
    try {
      const dsl = JSON.parse(content);
      project.activeFile(dsl);
      emitter.emit(EVENT_NODE_CHANGE, project.current.value);
      ElMessage.success({
        message: '修改成功'
      });
    } catch (e: any) {
      ElNotification.warning({
        message: e.message,
        title: '代码错误'
      });
    }
  }
};

emitter.on(EVENT_NODE_CHANGE, update);
watch(project.current, update);
onMounted(() => {
  update();
});

onUnmounted(() => {
  emitter.off(EVENT_NODE_CHANGE, update);
});
</script>
<style lang="scss">
.vtj-schema {
  height: 100%;
  .vtj-schema__panel {
    height: 100%;
  }
}
</style>
