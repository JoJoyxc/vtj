<template>
  <Panel
    class="v-docs-widget"
    size="small"
    fit
    :body="{ padding: false }"
    :header="false">
    <iframe ref="frame" src="https://element-plus.org/zh-CN/"></iframe>
  </Panel>
</template>
<script lang="ts" setup>
  import { Panel } from '../../shared';
  defineOptions({
    name: 'DocsWidget'
  });
</script>
