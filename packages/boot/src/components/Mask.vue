<template>
  <XMask
    :menus="menus"
    manual
    @select="onMenuSelect"
    homepage="/"
    :default-active-menu="defaultActiveMenu">
    <slot></slot>
  </XMask>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import {
    useRouter,
    useRoute,
    RouteLocationNormalizedLoaded
  } from 'vue-router';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  const router = useRouter();
  const route = useRoute();
  const provider = useProvider();
  const { dsl, project } = provider || {};
  const menus = computed(() => dsl?.pages || []);

  const onMenuSelect = (item: MenuDataItem) => {
    console.log('onMenuSelect', item);
    const isPreview = route.path.startsWith('/preview');
    const url = isPreview ? `/preview/${item.id}` : `/page/${item.id}`;
    router.push(url);
  };

  const defaultActiveMenu = (
    to: RouteLocationNormalizedLoaded,
    menus: MenuDataItem[] = []
  ) => {
    const id = to.params.id;
    console.log('defaultActiveMenu', id);
    return menus.find((n) => n.id === id);
  };

  // console.log(menus);
</script>
