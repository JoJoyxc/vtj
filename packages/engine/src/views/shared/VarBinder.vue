<template>
  <Binder ref="binderRef" title="变量绑定" @submit="onSubmit" @pick="onPick">
    <ElForm class="vtj-var-binder" label-position="top">
      <ElFormItem :label="title">
        <CodeEditor
          ref="editorRef"
          :model-value="content"
          width="100%"
          height="100%"
          dark></CodeEditor>
      </ElFormItem>
    </ElForm>
  </Binder>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import Binder from './Binder.vue';
import CodeEditor from '../../editor';
import { ElForm, ElFormItem, ElNotification } from 'element-plus';
import { expressionValidate } from '../../utils';
import { useCore } from '../../hooks';

export interface Props {
  value?: string;
  defaults?: string;
  type?: 'JSExpression' | 'JSFunction';
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  defaults: '',
  type: 'JSExpression'
});

const emit = defineEmits(['submit']);

const { project } = useCore();
const content = ref(props.value || props.defaults);
const title = computed(() => `绑定内容 [ ${props.type} ]`);
const editorRef = ref();
const binderRef = ref();

const validate = (value: string) => {
  const context = project.current.value?.runtimeContext;
  return expressionValidate({ value, type: props.type }, context);
};

const onSubmit = () => {
  const value = editorRef.value.getEditor().getValue().trim();
  if (value) {
    if (validate(value)) {
      emit('submit', { type: props.type, value });
      binderRef.value.close();
    }
  } else {
    ElNotification.warning({
      message: '请输入绑定内容'
    });
  }
};

const onPick = (item: string) => {
  const editor = editorRef.value?.getEditor();
  if (editor) {
    // const value = editor.getValue();
    content.value = item;
  }
};
</script>

<style lang="scss">
.vtj-var-binder {
  height: 100%;
  .el-form-item {
    height: 100%;
  }
  .el-form-item__content {
    height: calc(100% - 30px);
  }
}
</style>
