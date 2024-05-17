<template>
  <ElInput
    size="small"
    clearable
    v-model="row[column.field]"
    @input="onInput"
    v-bind="props.renderOpts.props"
    v-on="props.renderOpts.events"></ElInput>
</template>
<script lang="ts" setup>
  import { ElInput } from 'element-plus';
  import type { VxeGlobalRendererHandles } from '../../types';
  export interface Props {
    params: VxeGlobalRendererHandles.RenderEditParams;
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions;
  }
  const props = defineProps<Props>();
  const { row, column } = props.params;

  const onInput = () => {
    props.params.$grid?.updateStatus(props.params, row[column.field]);
  };
</script>
