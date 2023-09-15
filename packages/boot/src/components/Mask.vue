<template>
  <XMask :menus="menus" :menuAdapter="menuAdapter" home="/"> </XMask>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  const provider = useProvider();
  const { dsl } = provider || {};
  const menus = computed(() => dsl?.pages || []);
  const menuAdapter = (item: MenuDataItem) => {
    return {
      url: `/page/${item.id}`,
      ...item
    };
  };
</script>
