<template>
  <XMask
    :menus="menus"
    :favorites="favorites"
    manual-menu
    @menu-select="onMenuSelect"
    :defaultActiveMenu="defaultActiveMenu"
    :home="{ url: '/ui/mask', title: '我的工作台' }"></XMask>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { request } from '@vtj/utils';

  const router = useRouter();

  const menus = async () => {
    return await request({
      url: '/mock/menus.json'
    }).then((res) => res.data);
  };

  const favorites = async () => {
    return await request({
      url: '/mock/favorites.json'
    }).then((res) => res.data);
  };

  const onMenuSelect = (menu: MenuDataItem) => {
    router.push({
      path: '/ui/mask/page',
      query: { id: menu.id }
    });
  };

  const defaultActiveMenu = (
    to: RouteLocationNormalizedLoaded,
    menus: MenuDataItem[] = []
  ) => {
    return menus.find((n) => n.id.toString() === to.query.id);
  };
</script>
