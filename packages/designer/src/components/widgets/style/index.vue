<template>
  <JsonMode v-if="props.isStyleCodeMode"></JsonMode>
  <XContainer v-else class="v-style-widget" direction="column" fit>
    <Layout></Layout>
    <Spacing></Spacing>
    <Sizing :style-json="styleJson"></Sizing>
    <Panel
      title="定位"
      class="v-sub-panel"
      size="small"
      :fit="false"
      edit></Panel>
    <Panel
      title="文本"
      class="v-sub-panel"
      size="small"
      :fit="false"
      edit></Panel>
    <Panel
      title="背景"
      class="v-sub-panel"
      size="small"
      :fit="false"
      edit></Panel>
    <Panel
      title="边框"
      class="v-sub-panel"
      size="small"
      :fit="false"
      edit></Panel>
    <Panel
      title="效果"
      class="v-sub-panel"
      size="small"
      :fit="false"
      grow></Panel>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { isBlock } from '@vtj/core';
  import { XContainer } from '@vtj/ui';
  import { Panel } from '../../shared';
  import { useSelected } from '../../hooks';
  import Layout from './layout.vue';
  import JsonMode from './JsonMode.vue';
  import Spacing from './spacing.vue';
  import Sizing from './sizing.vue';

  export interface Props {
    isStyleCodeMode: boolean;
  }

  const props = defineProps<Props>();
  const { selected } = useSelected();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return isBlock(model) ? null : model;
  });

  const styleJson = computed(
    () => (node.value?.getPropValue('style') || {}) as Record<string, any>
  );

  console.log(styleJson);

  defineOptions({
    name: 'StyleWidget'
  });
</script>
