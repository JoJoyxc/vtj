<template>
  <XContainer
    v-show="!props.favorite && !props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-if="menus.length"
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
      v-if="menus.length"
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
    <ElEmpty v-if="!menus.length" description="暂无菜单数据"></ElEmpty>
  </XContainer>

  <XContainer
    v-show="props.favorite && !props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-show="props.collapse"
      class="x-mask-menu__favorites"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="favorites"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[FAVORITES_KEY]"
      @select="onSelect"></XMenu>

    <XMenu
      v-show="!props.collapse"
      class="x-mask-menu__favorites"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="favorites"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[FAVORITES_KEY]"
      @select="onSelect"></XMenu>

    <ElEmpty
      v-if="!state.favorites.value.length"
      description="暂无收藏菜单"></ElEmpty>
  </XContainer>

  <XContainer
    v-show="!!props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-show="props.collapse"
      class="x-mask-menu__search"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="searchResult"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[SEARCH_KEY]"
      @select="onSelect"></XMenu>

    <XMenu
      v-show="!props.collapse"
      class="x-mask-menu__search"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="searchResult"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[SEARCH_KEY]"
      @select="onSelect"></XMenu>

    <ElEmpty
      v-if="!searchResult[0].children.length"
      description="匹配不到相关菜单"></ElEmpty>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XContainer, XMenu, MenuDataItem } from '../';
  import { useInjectState } from './hooks';
  import { Document, Star, Search } from '@element-plus/icons-vue';
  import { ElEmpty } from 'element-plus';

  export interface Props {
    collapse?: boolean;
    keyword?: string;
    favorite?: boolean;
  }
  const FAVORITES_KEY = '__favorites__';
  const SEARCH_KEY = '__search__';
  const defaultActive = ref();
  const props = withDefaults(defineProps<Props>(), { collapse: false });
  const state = useInjectState();
  const menus = computed(() => state.menus.value);
  const favorites = computed(() => {
    return [
      {
        id: FAVORITES_KEY,
        title: '收藏',
        icon: Star,
        disabled: !state.favorites.value.length,
        children: state.favorites.value
      }
    ];
  });

  const searchResult = computed(() => {
    const list: any[] = state.favorites.value;
    return [
      {
        id: SEARCH_KEY,
        title: '搜索',
        icon: Search,
        disabled: !list.length,
        children: list
      }
    ];
  });

  const onSelect = (item: MenuDataItem) => {
    defaultActive.value = String(item.id);
  };
</script>
