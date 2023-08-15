<template>
  <div>
    <XTitle :icon="VtjIconBug" content="主标题文本" subtitle="我是副标题" more>
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          label="添加"
          mode="text"
          size="small"></XAction>
        <XAction
          :icon="VtjIconSetting"
          label="管理"
          mode="text"
          size="small"></XAction>
      </template>
    </XTitle>

    <XTitle
      size="large"
      :icon="VtjIconBug"
      content="主标题文本"
      subtitle="我是副标题"
      more>
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          label="添加"
          mode="text"
          size="small"></XAction>
        <XAction
          :icon="VtjIconSetting"
          label="管理"
          mode="text"
          size="small"></XAction>
      </template>
    </XTitle>

    <XTitle
      size="small"
      :icon="VtjIconBug"
      content="主标题文本"
      subtitle="我是副标题"
      border
      more
      @click="onClick">
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          mode="icon"
          size="small"
          background="hover"></XAction>
        <XAction
          :icon="VtjIconSetting"
          mode="icon"
          size="small"
          background="hover"></XAction>
      </template>
    </XTitle>
  </div>
</template>
<script lang="ts" setup>
  import { XTitle, XAction } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconSetting
  } from '@vtj/icons';

  const onClick = () => {
    console.log('clicked!');
  };
</script>
