<template>
  <div class="vtj-brand">
    <WidgetRenderer
      v-for="item in brand"
      :key="item.name"
      v-bind="{ ...item }"></WidgetRenderer>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useCore } from '../../hooks';
import { WidgetRenderer } from '../renderers';
const { regions } = useCore();
const brand = computed(() => regions.value.brand);
</script>
<style lang="scss">
.vtj-brand {
  width: 40%;
  text-align: left;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
</style>
