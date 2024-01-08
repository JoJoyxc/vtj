<template>
  <div class="vtj-link">
    <ElButton circle :icon="EditPen" size="large" @click="onClick"></ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { EditPen } from '@vtj/icons';
  import { ElButton } from 'element-plus';

  const onClick = () => {
    (top?.window || window).open('./');
  };
</script>
<style lang="scss" scoped>
  .vtj-link {
    position: absolute;
    pointer-events: initial;
    left: 0 !important;
    top: 0 !important;
  }
</style>
