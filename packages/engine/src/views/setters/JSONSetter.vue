<template>
  <div class="vtj-json-setter" :class="{ 'is-active': isActive }">
    <ElInput
      readonly
      @focus="openDialog"
      model-value="JSON"
      :suffix-icon="MoreFilled"
      v-bind="$attrs">
    </ElInput>
    <Dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="JSON"
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
        lang="json"
        dark
        :model-value="textValue"></CodeEditor>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { ElInput, ElNotification } from 'element-plus';
import { MoreFilled } from '@element-plus/icons-vue';
import CodeEditor from '../../editor';
import { Dialog } from '../shared';
import { ref, computed } from 'vue';
import { JSONValue } from '../../core';
export interface Props {
  modelValue?: JSONValue;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined
});

const codeEditor = ref();

const textValue = ref(
  typeof props.modelValue === 'object'
    ? JSON.stringify(props.modelValue, null, 2)
    : undefined
);

const isActive = computed(() => !!textValue.value);

const dialogVisible = ref(false);
const emit = defineEmits(['change']);

const validate = (value: string) => {
  let ret = true;
  try {
    const json = JSON.parse(value);
    if (typeof json !== 'object') {
      throw new Error(`"${value}" is not a JSON`);
    }
  } catch (e: any) {
    ret = false;
    ElNotification.error({
      title: '代码错误',
      message: e?.message || e
    });
  }
  return ret;
};

const handleSubmit = () => {
  const editor = codeEditor.value?.getEditor();
  if (editor) {
    const content = editor.getValue();
    if (validate(content)) {
      textValue.value = content;
      emit('change', JSON.parse(content));
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

.vtj-json-setter {
  &.is-active {
    .el-input__suffix {
      color: $vtj-primary-color;
    }
  }
}
</style>
