<template>
  <XContainer class="v-style-widget" direction="column" fit>
    <Panel title="布局" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="间距" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="尺寸" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="定位" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="文本" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="背景" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel title="边框" class="v-sub-panel" size="small" :fit="false"></Panel>
    <Panel
      title="效果"
      class="v-sub-panel"
      size="small"
      :fit="false"
      grow></Panel>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
  import { Panel } from '../../shared';
  defineOptions({
    name: 'StyleWidget'
  });
</script>
