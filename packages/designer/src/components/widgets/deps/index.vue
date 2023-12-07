<template>
  <Panel class="v-deps-widget" title="依赖管理" plus>
    <Item
      title="主要标题"
      subtitle="副标题"
      :actions="['add', 'remove']"
      border
      background
      switch></Item>
    <Item></Item>
  </Panel>
</template>
<script lang="ts" setup>
  import { Panel, Item } from '../../shared';

  defineOptions({
    name: 'DepsWidget'
  });
</script>
