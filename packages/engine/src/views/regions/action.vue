<template>
  <div class="vtj-action">
    <WidgetRenderer
      v-for="item in action"
      :key="item.name"
      v-bind="{ ...item }"></WidgetRenderer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCore } from '../../hooks';
import { WidgetRenderer } from '../renderers';
const { regions } = useCore();
const action = computed(() => regions.value.action);
</script>

<style lang="scss">
.vtj-action {
  width: 40%;
  text-align: right;
  white-space: nowrap;
}
</style>
