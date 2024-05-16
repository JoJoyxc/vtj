<template>
  <VxeGrid
    ref="vxeRef"
    class="x-grid"
    v-bind="vxeProps"
    :columns="columns"
    @custom="onCustom"
    @resizable-change="onResize">
    <template v-for="name in slots" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    useVxe,
    useProps,
    useRowSortable,
    useColumnSortable,
    useCustom,
    useVxeSlots
  } from './hooks';
  import { gridProps } from './props';
  import type { VxeGridInstance, GridEmits } from './types';
  const { VxeGrid } = useVxe();
  const vxeRef = ref<VxeGridInstance>();
  const props = defineProps(gridProps);
  const emit = defineEmits<GridEmits>();
  const slots = useVxeSlots();
  const vxeProps = useProps(props, slots);
  const { columns, onResize, onCustom, onSort } = useCustom(vxeRef, props);
  const rowSortable = useRowSortable(vxeRef, props, emit);
  const columnSortable = useColumnSortable(vxeRef, props, emit, onSort);
  defineExpose({
    vxeRef,
    rowSortable,
    columnSortable
  });

  defineOptions({
    name: 'XGrid',
    inheritAttrs: false
  });
</script>
