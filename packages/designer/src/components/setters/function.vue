<template>
  <div class="v-function-setter" :class="{ 'is-active': isActive }">
    <ElInput
      readonly
      @focus="openDialog"
      model-value="JSFunction"
      :suffix-icon="MoreFilled"
      v-bind="$attrs">
    </ElInput>
    <XDialog
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
      <Editor
        ref="codeEditor"
        height="100%"
        :model-value="textValue || defaultCode"
        dark></Editor>
      <template #extra>
        <ElButton type="warning" @click="handleClear" size="default">
          清除
        </ElButton>
      </template>
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  import { MoreFilled } from '@vtj/icons';
  import { XDialog } from '@vtj/ui';
  import { type JSFunction } from '@vtj/core';
  import Editor from '../editor';
  import { expressionValidate } from '../../utils';

  export interface Props {
    modelValue?: JSFunction;
    defaultCode?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({
      type: 'JSFunction',
      value: ''
    }),
    defaultCode: ''
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
    // if (!textValue.value) {
    //   textValue.value = props.defaultCode;
    // }
    dialogVisible.value = true;
  };

  defineOptions({
    name: 'FunctionSetter'
  });
</script>
