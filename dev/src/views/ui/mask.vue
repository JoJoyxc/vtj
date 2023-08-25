<template>
  <XMask :menus="menus" :favorites="favorites"></XMask>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { request } from '@vtj/utils';

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
</script>
