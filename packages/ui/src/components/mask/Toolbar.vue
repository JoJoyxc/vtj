<template>
  <XContainer class="x-mask-toolbar" align="center">
    <XAction
      :icon="MoreFilled"
      :menus="tabsToolMenus"
      :dropdown="{ size: 'small' }"
      mode="icon"
      circle
      background="hover">
      <template #item="{ item }">
        <span class="x-mask-toolbar__menu-item">
          {{ item.label }}
          <XIcon
            v-if="!['other', 'all'].includes(item.command)"
            @click.stop="onCloseItem(item)"
            :icon="Close"></XIcon>
        </span>
      </template>
    </XAction>
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
  import { XContainer, XAction, ActionMenuItem, XIcon } from '../';
  import {
    MoreFilled,
    Lock,
    SwitchButton,
    Bell,
    QuestionFilled,
    Close
  } from '@element-plus/icons-vue';
  import { ElDivider, ElAvatar } from 'element-plus';
  const avatar = 'https://avatars.githubusercontent.com/u/25154432?v=4&size=64';

  const tabsToolMenus: ActionMenuItem[] = [
    {
      label: '关闭其他',
      command: 'other'
    },
    {
      label: '关闭全部',
      command: 'all'
    },
    {
      divided: true,
      label: '演示菜单菜单',
      command: 'menu1'
    }
  ];

  const onCloseItem = (item: ActionMenuItem) => {
    console.log('onCloseItem', item);
  };
</script>
