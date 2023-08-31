<template>
  <XContainer class="x-mask">
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
      <XContainer class="x-mask-topbar" justify="space-between" align="center">
        <Tabs
          ref="tabRef"
          :tabs="showTabs"
          :isActiveTab="isActiveTab"
          :home="homeTab"
          :value="active?.id"
          @click="activeTab"
          @home="activeHome"
          @remove="removeTab"></Tabs>
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
      <XContainer class="x-mask__content" :flex="false" grow padding>
        <slot v-if="$slots.default"></slot>
        <KeepAlive>
          <Suspense>
            <RouterView></RouterView>
          </Suspense>
        </KeepAlive>
      </XContainer>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import {
    provide,
    KeepAlive,
    Suspense,
    getCurrentInstance,
    ComponentInternalInstance,
    watch
  } from 'vue';
  import {
    RouterView,
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
  import { maskProps, MASK_INSTANCE_KEY, MaskEmits } from './types';

  import { useMenus, useTabs } from './use';
  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const instance = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const {
    menus,
    flatMenus,
    favorites,
    collapsed,
    favorite,
    keyword,
    search,
    select,
    active
  } = useMenus(props, emit, router);

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
  } = useTabs(props, emit, router, active, select);

  const selectMenu = (menu: MenuDataItem) => {
    select(menu);
    addTab({
      menu,
      closable: false
    });
  };

  const defaultActiveMenu =
    props.defaultActiveMenu ??
    ((to: RouteLocationNormalizedLoaded) => {
      return flatMenus.value.find((n) => n.url === to.fullPath);
    });

  watch(flatMenus, () => {
    const current = defaultActiveMenu(route, flatMenus.value);
    if (current) {
      selectMenu(current);
    } else {
      activeHome();
    }
  });

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };

  provide(MASK_INSTANCE_KEY, instance as ComponentInternalInstance);

  defineOptions({
    name: 'XMask'
  });

  defineExpose({
    collapsed,
    menus,
    flatMenus,
    favorites,
    active,
    selectMenu
  });
</script>
