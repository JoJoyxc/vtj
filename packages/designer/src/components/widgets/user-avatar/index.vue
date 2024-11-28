<template>
  <ElAvatar
    class="v-user-avatar"
    :size="30"
    :icon="UserFilled"
    :src="avatar"></ElAvatar>
</template>
<script lang="ts" setup>
  import { ElAvatar } from 'element-plus';
  import { UserFilled } from '@vtj/icons';
  import { useEngine } from '../../../framework';

  const engine = useEngine();
  const { access } = engine.adapter || {};
  const avatar = access?.getData()?.avatar;
</script>

<style lang="scss" scoped>
  .v-user-avatar {
    box-shadow: 0 0 3px var(--el-border-color);
    margin-left: -4px;
    border: 1px solid var(--el-border-color);
  }
</style>
