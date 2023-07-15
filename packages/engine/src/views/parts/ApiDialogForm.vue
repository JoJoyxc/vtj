<template>
  <Dialog
    ref="dialogRef"
    width="1000px"
    height="600px"
    :title="title"
    submit
    cancel
    @submit="onSubmit">
    <ElForm
      ref="formRef"
      size="small"
      :model="model"
      :rules="rules"
      label-position="top">
      <ElFormItem label="接口名称" prop="name">
        <ElInput v-model="model.name" :disabled="!!props.model"></ElInput>
      </ElFormItem>
      <ElFormItem label="标题描述" prop="title">
        <ElInput v-model="model.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="接口地址" prop="url">
        <ElInput v-model="model.url"></ElInput>
      </ElFormItem>
      <ElFormItem label="请求类型" prop="method">
        <ElRadioGroup v-model="model.method">
          <ElRadio v-for="item in API_METHOD_TYPES" :label="item"></ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="请求配置 [ JSExpression ]" prop="settings">
        <Editor
          ref="editorRef"
          :model-value="model.settings?.value"
          border
          dark
          height="180px"></Editor>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio
} from 'element-plus';
import { Dialog } from '../shared';
import Editor from '../../editor';
import { API_METHOD_TYPES } from '../../constants';
import { ApiSchema, JSExpression } from '../../core';
import { expressionValidate, cloneDeep } from '../../utils';
import { Project } from '../../models';

export interface Props {
  model?: ApiSchema;
  project: Project;
}

const props = defineProps<Props>();

const defaultValue: ApiSchema = {
  name: '',
  title: '',
  url: '',
  method: 'GET',
  settings: {
    type: 'JSExpression',
    value: ''
  }
};

const model = ref<ApiSchema>(cloneDeep(props.model || { ...defaultValue }));
const formRef = ref();
const editorRef = ref();
const dialogRef = ref();
const rules = {
  name: [{ required: true, message: '接口名称为必填项' }],
  title: [{ required: true, message: '标题描述为必填项' }],
  url: [{ required: true, message: '请求地址为必填项' }]
};

const title = computed(() => (props.model ? '编辑Api' : '新增Api'));

const onSubmit = async () => {
  const valid = await formRef.value.validate().catch((e: any) => false);
  if (valid) {
    const code = editorRef.value.getEditor().getValue();
    (model.value.settings as JSExpression).value = code;
    if (expressionValidate(model.value.settings as any, {})) {
      props.project.setApi(model.value);
      dialogRef.value.close();
    }
  }
};
</script>
