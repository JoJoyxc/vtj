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
    <ElForm ref="formRef" size="small" label-position="top">
      <ElFormItem label="侦听源 [ JSFunction ]" prop="source">
        <CodeEditor
          ref="sourceRef"
          :border="true"
          height="100px"
          width="100%"
          dark
          :model-value="model.source.value"></CodeEditor>
      </ElFormItem>
      <ElFormItem label="deep" prop="deep">
        <ElSwitch v-model="model.deep"></ElSwitch>
      </ElFormItem>
      <ElFormItem label="immediate" prop="immediate">
        <ElSwitch v-model="model.immediate"></ElSwitch>
      </ElFormItem>
      <ElFormItem label="处理函数 [ JSFunction ]" prop="handler">
        <CodeEditor
          ref="handlerRef"
          :border="true"
          height="180px"
          width="100%"
          dark
          :model-value="model.handler.value"></CodeEditor>
      </ElFormItem>
    </ElForm>
  </Binder>
</template>
<script lang="ts" setup>
import { Binder } from '../shared';
import CodeEditor from '../../editor';
import { ElForm, ElFormItem, ElSwitch } from 'element-plus';
import { watchDataDialogProps, useBlockScriptWatch } from '../../hooks';
const props = defineProps(watchDataDialogProps);
const { title, model, onSubmit, dialogRef, sourceRef, handlerRef, formRef } =
  useBlockScriptWatch(props);

const onPick = (item: string) => {
  model.handler.value = item;
};
</script>
<style lang="scss"></style>
