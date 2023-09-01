<template>
  <XContainer class="x-mask">
    <template v-if="!props.disabled">
      <Sidebar :collapsed="collapsed">
        <template #brand>
          <Brand
            :logo="props.logo"
            :title="props.title"
            :url="props.homepage"
            :collapsed="collapsed"></Brand>
        </template>
        <SwitchBar
          v-model:collasped="collapsed"
          v-model:favorite="favorite"
          @search="search"></SwitchBar>
        <Menu
          :collapse="collapsed"
          :keyword="keyword"
          :favorite="favorite"
          :favorites="favorites"
          :flatMenus="flatMenus"
          :menus="menus"
          :active="active"
          @select="selectMenu"></Menu>
      </Sidebar>
      <XContainer class="x-mask__main" grow flex direction="column">
        <XContainer
          class="x-mask-topbar"
          justify="space-between"
          align="center">
          <Tabs
            ref="tabRef"
            :favorites="favorites"
            :tabs="showTabs"
            :isActiveTab="isActiveTab"
            :home="homeTab"
            :value="active?.id"
            @click="activeTab"
            @home="activeHome"
            @remove="removeTab"
            @refresh="onRefresh"
            @toggleFavorite="toggleFavorite"></Tabs>
          <Toolbar
            :tabs="dropdownTabs"
            :actions="props.actions"
            :theme="props.theme"
            @closeOtherTabs="removeOtherTabs"
            @closeAllTabs="removeAllTabs"
            @closeTab="removeTab"
            @clickTab="moveToShow"
            @action-click="onActionClick"
            @action-command="onActionCommand">
            <Avatar :avatar="props.avatar">
              <template v-if="$slots.user" #default>
                <slot name="user"> </slot>
              </template>
            </Avatar>
          </Toolbar>
        </XContainer>
        <Content ref="contentRef">
          <template v-if="$slots.default">
            <slot></slot>
          </template>
        </Content>
      </XContainer>
    </template>
    <Content ref="contentRef" v-else>
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </Content>
  </XContainer>
</template>
<script lang="ts" setup>
  import {
    provide,
    getCurrentInstance,
    ComponentInternalInstance,
    watch,
    nextTick,
    ref
  } from 'vue';
  import {
    useRoute,
    useRouter,
    RouteLocationNormalizedLoaded
  } from 'vue-router';
  import { XContainer, MenuDataItem, ActionMenuItem, ActionProps } from '../';
  import Sidebar from './components/Sidebar.vue';
  import SwitchBar from './components/SwitchBar.vue';
  import Brand from './components/Brand.vue';
  import Menu from './components/Menu.vue';
  import Tabs from './components/Tabs.vue';
  import Toolbar from './components/Toolbar.vue';
  import Avatar from './components/Avatar.vue';
  import Content from './components/Content.vue';
  import { maskProps, MASK_INSTANCE_KEY, MaskEmits } from './types';
  import { useMenus, useTabs, useFavorites } from './use';

  defineOptions({
    name: 'XMask'
  });

  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const instance = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const contentRef = ref();
  const {
    menus,
    flatMenus,
    collapsed,
    favorite,
    keyword,
    search,
    select,
    active,
    homeMenu
  } = useMenus(props, emit, router);

  const { favorites, toggleFavorite } = useFavorites(props);

  const {
    tabRef,
    homeTab,
    showTabs,
    dropdownTabs,
    isActiveTab,
    removeTab,
    activeTab,
    activeHome,
    addTab,
    removeAllTabs,
    removeOtherTabs,
    moveToShow
  } = useTabs(props, emit, router, active, select, homeMenu);

  const selectMenu = async (menu: MenuDataItem) => {
    select(menu);
    const { type = 'route' } = menu;
    if (type === 'route') {
      await nextTick();
      addTab({
        menu,
        closable: false
      });
    }
  };

  const defaultActiveMenu =
    props.defaultActiveMenu ??
    ((to: RouteLocationNormalizedLoaded) => {
      return flatMenus.value.find((n) => n.url === to.fullPath);
    });

  watch(
    flatMenus,
    () => {
      if (!flatMenus.value.length) return;
      const current = defaultActiveMenu(route, flatMenus.value);
      if (current) {
        selectMenu(current);
      } else {
        active.value = null;
      }
    },
    { immediate: true }
  );

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };

  const onRefresh = () => {
    contentRef.value.refresh();
  };

  provide(MASK_INSTANCE_KEY, instance as ComponentInternalInstance);

  defineExpose({
    collapsed,
    menus,
    flatMenus,
    favorites,
    active,
    selectMenu
  });
</script>
