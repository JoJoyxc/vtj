<template>
  <div class="v-toolbar-widget">
    <ElRadioGroup size="small" v-model="mode" @change="onModeChane">
      <ElRadioButton label="pc">
        <VtjIconPc></VtjIconPc>
      </ElRadioButton>
      <ElRadioButton label="mobile">
        <VtjIconPhone></VtjIconPhone>
      </ElRadioButton>
      <ElRadioButton label="pad">
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
        @click="onHistoryBackward"
        :disabled="!backward">
        <VtjIconUndo></VtjIconUndo>
      </ElButton>
      <ElButton
        type="default"
        size="small"
        @click="onHistoryForward"
        :disabled="!forward">
        <VtjIconRedo></VtjIconRedo>
      </ElButton>
    </ElButtonGroup>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
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

  const mode = ref('pc');

  const backward = computed(() => {
    return true;
  });

  const forward = computed(() => {
    return true;
  });

  const onHistoryBackward = () => {};

  const onHistoryForward = () => {};

  const onModeChane = (_value: any) => {};

  defineOptions({
    name: 'ToolbarWidget',
    inheritAttrs: false
  });

  defineExpose({
    mode
  });
</script>
