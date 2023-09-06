<template>
  <XContainer class="x-mask">
    <template v-if="!props.disabled">
      <Sidebar :collapsed="collapsed">
        <template #brand>
          <Brand
            :logo="props.logo"
            :title="props.title"
            :url="homeTab.url"
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
          @select="select"></Menu>
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
            :home="homeTab"
            :value="currentTabValue"
            :isActiveTab="isActiveTab"
            @click="onTabClick"
            @remove="removeTab"
            @refresh="onRefresh"
            @toggleFavorite="toggleFavorite"
            @dialog="onTabDialog"></Tabs>
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
  import { useRoute, useRouter } from 'vue-router';
  import { XContainer, MenuDataItem, ActionMenuItem, ActionProps } from '../';
  import Sidebar from './components/Sidebar.vue';
  import SwitchBar from './components/SwitchBar.vue';
  import Brand from './components/Brand.vue';
  import Menu from './components/Menu.vue';
  import Tabs from './components/Tabs.vue';
  import Toolbar from './components/Toolbar.vue';
  import Avatar from './components/Avatar.vue';
  import Content from './components/Content.vue';
  import {
    maskProps,
    MASK_INSTANCE_KEY,
    MaskEmits,
    MaskTab,
    MaskDefineTab
  } from './types';
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
    getMenuByUrl
  } = useMenus(props, emit);

  const { favorites, toggleFavorite } = useFavorites(props);

  const {
    tabRef,
    homeTab,
    showTabs,
    dropdownTabs,
    isActiveTab,
    removeTab,
    addTab,
    removeAllTabs,
    removeOtherTabs,
    moveToShow,
    currentTabValue,
    isHomeTab
  } = useTabs(props, emit);

  const init = async (menus?: MenuDataItem[]) => {
    if (!menus || !menus.length) return;
    const fullPath = route.fullPath;
    const menu = getMenuByUrl(fullPath);
    if (isHomeTab(fullPath)) {
      currentTabValue.value = fullPath;
    } else {
      await nextTick();
      const { url = fullPath, icon, title = '新建标签页' } = menu || {};
      const view = contentRef.value.getCacheComponent(fullPath);
      const defineTab = view?.exposed?.defineTab as MaskDefineTab;
      const tab: MaskTab = Object.assign(
        { url, icon, title, menu },
        defineTab ? await defineTab() : {}
      );
      addTab(tab);
    }
    if (menu) {
      await nextTick();
      active.value = menu;
    }
  };

  watch(flatMenus, init, { immediate: true });
  watch(
    () => route.fullPath,
    () => init(flatMenus.value)
  );

  const onTabClick = (tab: MaskTab) => {
    router.push(tab.url).catch((e) => e);
  };

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };

  const onRefresh = () => {
    contentRef.value.refresh();
  };

  const onTabDialog = (tab: MaskTab) => {
    console.log('open dialog', tab);
  };

  provide(MASK_INSTANCE_KEY, instance as ComponentInternalInstance);

  defineExpose({
    collapsed,
    menus,
    flatMenus,
    favorites,
    active,
    select,
    addTab
  });
</script>
