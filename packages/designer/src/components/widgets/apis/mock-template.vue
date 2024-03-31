<template>
  <div>
    <XContainer justify="space-between">
      <ElRadioGroup model-value="1" size="small">
        <ElRadioButton label="1">JSON模式</ElRadioButton>
        <ElRadioButton label="2">函数模式</ElRadioButton>
      </ElRadioGroup>
      <XAction :icon="VtjIconHelp" mode="text" label="帮助"></XAction>
    </XContainer>
    <XField size="small" name="settings.headers.value" label=" ">
      <template #editor>
        <Editor dark height="420px" lang="json"></Editor>
      </template>
    </XField>
  </div>
</template>
<script lang="ts" setup>
  import { ElRadioGroup, ElRadioButton } from 'element-plus';
  import { XContainer, XField, XAction } from '@vtj/ui';
  import { VtjIconHelp } from '@vtj/icons';
  import Editor from '../../editor';
</script>
