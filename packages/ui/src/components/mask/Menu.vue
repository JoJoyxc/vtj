<template>
  <XContainer class="x-mask-menu" grow :flex="false" overflow="auto">
    <XMenu
      v-show="props.collapse"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="menus"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      @select="onSelect"></XMenu>
    <XMenu
      v-show="!props.collapse"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true
      }"
      :data="menus"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      @select="onSelect"></XMenu>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XContainer, XMenu, MenuDataItem } from '../';
  import { useMask } from './hooks';
  import { Document } from '@element-plus/icons-vue';

  export interface Props {
    collapse?: boolean;
  }

  const defaultActive = ref();
  const props = withDefaults(defineProps<Props>(), { collapse: false });
  const mask = useMask();
  const menus = computed(() => mask?.menus ?? []);

  const onSelect = (item: MenuDataItem) => {
    defaultActive.value = String(item.id);
  };
</script>
