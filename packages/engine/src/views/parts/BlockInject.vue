<template>
  <Dialog
    ref="dialogRef"
    :title="title"
    width="1000px"
    height="600px"
    submit
    cancel
    @submit="onSubmit">
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      size="small"
      label-position="top">
      <ElFormItem label="注入名称" prop="name">
        <ElInput v-model="model.name" :disabled="!!props.formData"></ElInput>
      </ElFormItem>
      <ElFormItem label="来源名称" prop="from">
        <ElInput
          v-if="typeof model.from === 'string'"
          v-model="model.from"></ElInput>
      </ElFormItem>
      <ElFormItem label="默认值" prop="from">
        <Editor
          ref="editorRef"
          :model-value="(model.default as JSExpression).value || ''"
          dark
          border
          height="300px"></Editor>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toValue, computed } from 'vue';
import { Dialog } from '../shared';
import Editor from '../../editor';
import { ElForm, ElFormItem, ElInput } from 'element-plus';
import { Block } from '../../models';
import { expressionValidate } from '../../utils';
import { InjectSchema, JSExpression } from '../../core';

export interface Props {
  block: Block;
  formData?: InjectSchema;
}

const props = defineProps<Props>();
const title = computed(() => (props.formData ? '编辑注入' : '新增注入'));
const model = reactive(
  props.formData || {
    name: '',
    from: '',
    default: {
      type: 'JSExpression',
      value: ''
    }
  }
);
const rules = {
  name: [{ required: true, message: '注入名称为必填项' }]
};
const dialogRef = ref();
const editorRef = ref();
const formRef = ref();

const onSubmit = async () => {
  const valid = await formRef.value.validate().catch((e: any) => false);
  if (valid) {
    const code = editorRef.value.getEditor().getValue();
    (model.default as JSExpression).value = code;
    if (expressionValidate(model.default as JSExpression, {})) {
      props.block.setInject(toValue(model) as InjectSchema);
      dialogRef.value.close();
    }
  }
};
</script>
