<template>
  <div class="vtj-status">
    <div class="vtj-status__left">
      <WidgetRenderer
        v-for="item in leftStatus"
        :key="item.name"
        v-bind="{ ...item }"></WidgetRenderer>
    </div>
    <div class="vtj-status__right">
      <WidgetRenderer
        v-for="item in rightStatus"
        :key="item.name"
        v-bind="{ ...item }"></WidgetRenderer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useCore } from '../../hooks';
import { WidgetRenderer } from '../renderers';

const { regions } = useCore();
const status = computed(() => regions.value.status);

// 无触发器的放左边
const leftStatus = computed(() => {
  return status.value.filter((n) => !n.disabled && !n.trigger);
});

// 有触发器的放右边
const rightStatus = computed(() => {
  return status.value.filter((n) => !n.disabled && !!n.trigger);
});
</script>

<style lang="scss">
.vtj-status {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  &__left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__right {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 5px;
    > div {
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
