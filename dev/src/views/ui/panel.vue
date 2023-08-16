<template>
  <div>
    <XPanel card :header="header" shadow="always" fit>
      Body
      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon" background="hover"></XAction>
        <XAction
          :icon="VtjIconSetting"
          mode="icon"
          background="hover"></XAction>
      </template>
      <template #footer> Footer </template>
    </XPanel>
    <XPanel card header="面板标题" size="large" shadow="hover">
      Body

      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon"></XAction>
        <XAction :icon="VtjIconSetting" mode="icon"></XAction>
      </template>
    </XPanel>
    <XPanel card header="面板标题" size="small">
      Body

      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon" size="small"></XAction>
        <XAction :icon="VtjIconSetting" mode="icon" size="small"></XAction>
      </template>
    </XPanel>
    <hr />
    <XPanel :header="header" shadow="always">
      Body
      <template #actions>
        <XAction :icon="VtjIconPlus" mode="text" label="添加"></XAction>
        <XAction :icon="VtjIconSetting" mode="text" label="设置"></XAction>
      </template>
    </XPanel>
    <XPanel header="面板标题" size="large" shadow="hover"> Body</XPanel>
    <XPanel header="面板标题" size="small"> Body</XPanel>
  </div>
</template>

<script lang="ts" setup>
  import { XPanel, XAction } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconSetting
  } from '@vtj/icons';

  const header = {
    content: '面板主要标题',
    subtitle: '副标题内容',
    more: true,
    icon: {
      icon: VtjIconSetting,
      color: 'var(--el-color-primary)'
    }
  };
</script>

<style lang="scss" scoped>
  .x-panel {
    margin: 10px 0;
  }
</style>
