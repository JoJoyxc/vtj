<template>
  <Panel class="vtj-sub-panel" v-bind="$attrs">
    <slot></slot>

    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </Panel>
</template>

<script lang="ts" setup>
import Panel from './Panel.vue';
</script>

<style lang="scss">
@use '../../style/vars' as *;
.vtj-sub-panel {
  height: auto;

  .vtj-panel__header {
    height: 30px;
    padding: 10px !important;
    background-color: $vtj-background-color-dark-9;
    // border-top: 1px solid $vtj-border-color;
  }
  .vtj-panel__title {
    font-weight: normal;
    color: $vtj-secondary-color;
    opacity: 0.9;
  }
  .vtj-panel__tools {
    color: $vtj-secondary-color;
    opacity: 0.9;
  }
  .vtj-panel__body {
    background-color: $vtj-background-color !important;
    height: auto;
  }
  .el-empty {
    padding: 10px;
  }
}
</style>
