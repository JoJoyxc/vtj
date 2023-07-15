<template>
  <Binder
    ref="dialogRef"
    :title="title"
    width="1000px"
    height="600px"
    :clearable="false"
    v-bind="$attrs"
    @submit="onSubmit"
    @pick="onPick">
    <ElForm
      ref="formRef"
      size="small"
      label-position="top"
      :model="model"
      :rules="rules">
      <ElFormItem :label="props.nameLabel" prop="name">
        <ElSelect
          v-if="type === 'lifeCycles'"
          v-model="model.name"
          :disabled="disabled">
          <ElOption
            v-for="name of LIFE_CYCLES_LIST"
            :label="name"
            :value="name"></ElOption>
        </ElSelect>
        <ElInput v-else v-model="model.name" :disabled="disabled"></ElInput>
      </ElFormItem>
      <ElFormItem :label="props.valueLabel">
        <CodeEditor
          ref="editorRef"
          :border="true"
          height="380px"
          width="100%"
          dark
          :model-value="model.value.value"></CodeEditor>
      </ElFormItem>
    </ElForm>
  </Binder>
</template>
<script lang="ts" setup>
import { Binder } from '../shared';
import CodeEditor from '../../editor';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus';
import { useBlockScriptJSData, jsDataDialogProps } from '../../hooks';
import { LIFE_CYCLES_LIST } from '../../constants';
const props = defineProps(jsDataDialogProps);
const {
  title,
  model,
  formRef,
  dialogRef,
  editorRef,
  rules,
  onSubmit,
  disabled
} = useBlockScriptJSData(props);

const onPick = (item: string) => {
  model.value.value = item;
};
</script>
<style lang="scss"></style>
