<template>
  <div>
    <XContainer justify="flex-end">
      <ElRadioGroup model-value="1" size="small">
        <ElRadioButton label="1">字段配置模式</ElRadioButton>
        <ElRadioButton label="2">自定义模式</ElRadioButton>
      </ElRadioGroup>
    </XContainer>
  </div>
</template>
<script lang="ts" setup>
  import { ElRadioGroup, ElRadioButton } from 'element-plus';
  import { XContainer } from '@vtj/ui';
</script>
