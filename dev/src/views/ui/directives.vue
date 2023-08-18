<template>
  <div>
    <XPanel
      v-draggable="{ selector: '.x-header' }"
      header="Title"
      card></XPanel>
  </div>
</template>
<script lang="ts" setup>
  import { vDraggable, XPanel } from '@vtj/ui';
</script>

<style lang="scss" scoped>
  .x-panel {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 100px;
    top: 100px;
  }
</style>
