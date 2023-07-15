<template>
  <div class="vtj-function-setter" :class="{ 'is-active': isActive }">
    <ElInput
      readonly
      @focus="openDialog"
      model-value="JSFunction"
      :suffix-icon="MoreFilled"
      v-bind="$attrs">
    </ElInput>
    <Dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="JSFunction"
      width="1000px"
      height="600px"
      cancel
      submit
      clear
      @submit="handleSubmit"
      @clear="handleClear">
      <CodeEditor
        ref="codeEditor"
        height="100%"
        :model-value="textValue"
        dark></CodeEditor>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { ElInput, ElNotification } from 'element-plus';
import { MoreFilled } from '@element-plus/icons-vue';
import CodeEditor from '../../editor';
import { Dialog } from '../shared';
import { ref, computed } from 'vue';
import { JSFunction } from '../../core';
import { expressionValidate } from '../../utils';

export interface Props {
  modelValue?: JSFunction;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    type: 'JSFunction',
    value: ''
  })
});

const codeEditor = ref();

const textValue = ref(props.modelValue.value);
const dialogVisible = ref(false);
const isActive = computed(() => !!textValue.value);

const emit = defineEmits(['change']);

const handleSubmit = () => {
  const editor = codeEditor.value?.getEditor();
  if (editor) {
    const content = editor.getValue();
    const js: JSFunction = {
      type: 'JSFunction',
      value: content
    };
    if (expressionValidate(js, {})) {
      textValue.value = content;
      emit('change', js);
      dialogVisible.value = false;
    }
  }
};
const handleClear = () => {
  textValue.value = '';
  emit('change', undefined);
  dialogVisible.value = false;
};
const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-function-setter {
  &.is-active {
    .el-input__suffix {
      color: $vtj-primary-color;
    }
  }
}
</style>
