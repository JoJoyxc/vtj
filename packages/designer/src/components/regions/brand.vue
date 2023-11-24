<template>
  <div>
    <WidgetWrapper
      v-for="widget in widgets"
      ref="widgetsRef"
      :region="region"
      :widget="widget"></WidgetWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { WidgetWrapper } from '../../wrappers';
  import { widgetManager } from '../../managers';
  import { RegionType } from '../../framework';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();

  const widgets = widgetManager
    .getWidgets(props.region)
    .filter((n) => !n.invisible);
  const widgetsRef = ref();

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
