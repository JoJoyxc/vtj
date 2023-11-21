<template>
  <div>
    <WidgetWrapper
      v-for="widget in widgets"
      ref="widgetsRef"
      :widget="widget"></WidgetWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { WidgetWrapper } from '../../wrappers';
  import { widgetManager } from '../../managers';

  const widgets = widgetManager.getWidgets('Brand').filter((n) => !n.invisible);
  const widgetsRef = ref();

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
