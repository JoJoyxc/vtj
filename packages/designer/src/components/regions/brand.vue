<template>
  <div>
    <WidgetWrapper v-for="widget in widgets" :widget="widget"></WidgetWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { WidgetWrapper } from '../../wrappers';
  import { widgetManager } from '../../managers';

  const widgets = widgetManager.getWidgets('Brand');
</script>
