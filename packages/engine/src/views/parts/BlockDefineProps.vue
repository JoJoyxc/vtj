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
      label-position="top"
      class="vtj-block-props__form">
      <ElFormItem label="属性名称" prop="name">
        <ElInput v-model="model.name" :disabled="!!props.formData"></ElInput>
      </ElFormItem>
      <ElFormItem label="数据类型" prop="type">
        <ElSelect v-model="model.type" multiple>
          <ElOption
            v-for="item in DATA_TYPES"
            :value="item"
            :label="item"></ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="是否必须" prop="required">
        <ElSwitch v-model="model.required"></ElSwitch>
      </ElFormItem>
      <ElFormItem label="默认值 [ JSExpression ]" prop="default">
        <Editor
          ref="editorRef"
          height="250px"
          :model-value="(model.default as JSExpression).value || ''"
          border
          dark></Editor>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toValue, computed } from 'vue';
import { Dialog } from '../shared';
import Editor from '../../editor';
import { DefinePropSchema, JSExpression } from '../../core';
import { DATA_TYPES } from '../../constants';
import { Block } from '../../models';
import { expressionValidate } from '../../utils';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElSelect,
  ElOption
} from 'element-plus';

export interface Props {
  formData?: DefinePropSchema;
  block: Block;
}

const props = withDefaults(defineProps<Props>(), {});

const title = computed(() => (props.formData ? '编辑属性' : '新增属性'));
const rules = {
  name: [{ required: true, message: '属性名称为必填项' }]
};

const formRef = ref();
const dialogRef = ref();
const editorRef = ref();

const model = reactive(
  props.formData || {
    name: '',
    type: '',
    required: false,
    default: {
      type: 'JSExpression',
      value: ''
    }
  }
);

const onSubmit = async () => {
  const valid = await formRef.value.validate().catch((e: any) => false);
  if (valid) {
    const code = editorRef.value.getEditor().getValue();
    (model.default as JSExpression).value = code;
    if (expressionValidate(model.default as JSExpression, {})) {
      props.block.setProp(toValue(model) as DefinePropSchema);
      dialogRef.value.close();
    }
  }
};
</script>

<style lang="scss">
.vtj-block-props__form {
  .el-select {
    width: 100%;
  }
}
</style>
