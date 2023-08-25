<template>
  <XContainer class="x-mask-toolbar" align="center">
    <XAction :icon="MoreFilled" mode="icon" circle background="hover"></XAction>
    <ElDivider direction="vertical"></ElDivider>
    <XAction
      :icon="Bell"
      mode="icon"
      circle
      :badge="100"
      size="default"
      background="hover"></XAction>
    <ElDivider direction="vertical"></ElDivider>
    <XAction
      :icon="QuestionFilled"
      mode="icon"
      circle
      background="hover"></XAction>
    <XAction :icon="Lock" mode="icon" circle background="hover"></XAction>
    <XAction
      :icon="SwitchButton"
      mode="icon"
      circle
      background="hover"></XAction>
    <ElDivider direction="vertical"></ElDivider>
    <ElAvatar :src="avatar" :size="26"></ElAvatar>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer, XAction } from '../';
  import {
    MoreFilled,
    Lock,
    SwitchButton,
    Bell,
    QuestionFilled
  } from '@element-plus/icons-vue';
  import { ElDivider, ElAvatar } from 'element-plus';
  const avatar = 'https://avatars.githubusercontent.com/u/25154432?v=4&size=64';
</script>
