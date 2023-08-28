<template>
  <XContainer class="x-mask-topbar" justify="space-between" align="center">
    <Tabs @click="onTabClick" @remove="onTabRemove" @home="onHomeClick"></Tabs>
    <Toolbar></Toolbar>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer, MenuDataItem } from '../';
  import Tabs from './Tabs.vue';
  import Toolbar from './Toolbar.vue';

  const emit = defineEmits<{
    tabClick: [menu: MenuDataItem];
    tabRemove: [menu: MenuDataItem];
    homeClick: [];
  }>();

  const onTabClick = (menu: MenuDataItem) => {
    emit('tabClick', menu);
  };

  const onTabRemove = (menu: MenuDataItem) => {
    emit('tabRemove', menu);
  };

  const onHomeClick = () => {
    emit('homeClick');
  };
</script>
