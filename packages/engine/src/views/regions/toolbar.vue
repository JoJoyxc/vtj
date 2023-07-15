<template>
  <div class="vtj-toolbar">
    <WidgetRenderer
      v-for="item in toolbar"
      :key="item.name"
      v-bind="{ ...item }"></WidgetRenderer>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useCore } from '../../hooks';
import { WidgetRenderer } from '../renderers';
const { regions } = useCore();
const toolbar = computed(() => regions.value.toolbar);
</script>
<style lang="scss">
.vtj-toolbar {
  width: 20%;
  text-align: center;
  white-space: nowrap;
}
</style>
