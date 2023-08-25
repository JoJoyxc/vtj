<template>
  <XContainer
    class="x-mask-avatar"
    justify="flex-start"
    align="flex-start"
    width="100%">
    <ElAvatar
      class="x-mask-avatar__pic"
      shape="circle"
      :icon="UserFilled"
      :src="avatar"
      :size="36"></ElAvatar>
    <XContainer class="x-mask-avatar__wrapper" flex grow direction="column">
      <div class="x-mask-avatar__name">陈华春</div>
      <div>13800000000</div>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElAvatar, ElPopover } from 'element-plus';
  import { UserFilled } from '@element-plus/icons-vue';
  import { XContainer } from '../';

  const avatar = 'https://avatars.githubusercontent.com/u/25154432?v=4&size=64';
</script>
