<template>
  <div class="v-toolbar-widget">
    <ElRadioGroup size="small" v-model="mode">
      <ElRadioButton label="pc" value="pc">
        <VtjIconPc></VtjIconPc>
      </ElRadioButton>
      <ElRadioButton label="mobile" value="mobile">
        <VtjIconPhone></VtjIconPhone>
      </ElRadioButton>
      <ElRadioButton label="pad" value="pad">
        <VtjIconPad></VtjIconPad>
      </ElRadioButton>
    </ElRadioGroup>

    <ElInput v-if="false" class="v-toolbar-widget__zoomer" size="small">
      <template #prepend>
        <ElButton :icon="ZoomOut"></ElButton>
      </template>
      <template #append>
        <ElButton :icon="ZoomIn"></ElButton>
      </template>
    </ElInput>

    <ElButtonGroup>
      <ElButton
        type="default"
        size="small"
        @click="backward"
        :disabled="backwardDisabled || !!props.preview">
        <VtjIconUndo></VtjIconUndo>
      </ElButton>
      <ElButton
        type="default"
        size="small"
        @click="forward"
        :disabled="forwardDisabled || !!props.preview">
        <VtjIconRedo></VtjIconRedo>
      </ElButton>
    </ElButtonGroup>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    ElButtonGroup,
    ElButton,
    ElRadioGroup,
    ElRadioButton,
    ElInput
  } from 'element-plus';
  import {
    ZoomIn,
    ZoomOut,
    VtjIconPc,
    VtjIconPad,
    VtjIconPhone,
    VtjIconUndo,
    VtjIconRedo
  } from '@vtj/icons';
  import { useHistory } from '../../hooks';

  export interface Props {
    preview?: boolean;
  }

  const props = defineProps<Props>();

  const { forward, backward, forwardDisabled, backwardDisabled } = useHistory();
  const mode = ref('pc');

  defineOptions({
    name: 'ToolbarWidget',
    inheritAttrs: false
  });

  defineExpose({
    mode
  });
</script>
