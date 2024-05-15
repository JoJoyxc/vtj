<template>
  <VxeGrid
    ref="vxeRef"
    class="x-grid"
    size="small"
    height="auto"
    :columns="columns"
    :column-config="columnConfig"
    :row-config="rowConfig"
    show-overflow
    auto-resize
    stripe
    border
    @custom="onCustom"
    @resizable-change="onResize"></VxeGrid>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    useVxe,
    useRowSortable,
    useColumnSortable,
    useCustom
  } from './hooks';
  import { gridProps } from './props';
  import type { VxeGridInstance, GridEmits } from './types';
  const { VxeGrid } = useVxe();
  const columnConfig = {
    useKey: true,
    resizable: true
  };
  const rowConfig = {
    useKey: true
  };
  const vxeRef = ref<VxeGridInstance>();
  const props = defineProps(gridProps);
  const emit = defineEmits<GridEmits>();
  const { columns, onResize, onCustom, onSort } = useCustom(vxeRef, props);
  const rowSortable = useRowSortable(vxeRef, props, emit);
  const columnSortable = useColumnSortable(vxeRef, props, emit, onSort);
  defineExpose({
    vxeRef,
    rowSortable,
    columnSortable
  });
</script>
