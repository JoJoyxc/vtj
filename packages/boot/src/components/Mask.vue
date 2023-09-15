<template>
  <XMask :menus="menus" :menuAdapter="menuAdapter" home="/"> </XMask>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  const provider = useProvider();
  const route = useRoute();
  const { dsl } = provider || {};
  const menus = computed(() => dsl?.pages || []);
  const isPreview = computed(() => route.path.startsWith('/preview'));
  const menuAdapter = (item: MenuDataItem) => {
    return {
      url: isPreview.value ? `/preview/${item.id}` : `/page/${item.id}`,
      ...item
    };
  };
</script>
