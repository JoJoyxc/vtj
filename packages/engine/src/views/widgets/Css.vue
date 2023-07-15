<template>
  <Panel class="vtj-setting-css" :title="null" :body-padding="false">
    <SubPanel
      v-if="block"
      title="CSS"
      :tools="tools"
      @tool-click="onSave(true)">
      <Editor
        ref="editorRef"
        height="100%"
        lang="css"
        dark
        :model-value="block.css"
        @blur="onSave"></Editor>
    </SubPanel>
  </Panel>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Panel, SubPanel } from '../shared';
import Editor from '../../editor';
import { useDesigner } from '../../hooks';
import { Block } from '../../models';
import { ElMessage } from 'element-plus';

const { selected } = useDesigner();
const block = computed(() => selected.value?.node as Block);
const tools = [
  {
    name: 'save',
    icon: 'vtj-icon-np-save'
  }
];
const editorRef = ref();

const onSave = (trigger: boolean = false) => {
  const content = editorRef.value?.getEditor().getValue();
  if (content !== block.value.css) {
    block.value.setCss(content);
    if (trigger) {
      ElMessage.success({
        message: '保存成功'
      });
    }
  }
};
</script>
<style lang="scss">
.vtj-setting-css {
  .vtj-sub-panel {
    height: 100%;
  }
}
</style>
