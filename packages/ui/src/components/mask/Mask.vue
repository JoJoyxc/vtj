<template>
  <XContainer class="x-mask" :class="{ 'is-disabled': props.disabled }" fit>
    <template v-if="!props.disabled">
      <Sidebar :collapsed="collapsed">
        <template #brand>
          <Brand
            :logo="props.logo"
            :title="props.title"
            :url="home.url"
            :collapsed="collapsed"></Brand>
        </template>
        <SwitchBar
          v-model:collasped="collapsed"
          v-model:favorite="favorite"
          v-model:keyword="keyword"></SwitchBar>
        <Menu
          :collapse="collapsed"
          :keyword="keyword"
          :favorite="favorite"
          :favorites="favorites"
          :flatMenus="flatMenus"
          :menus="menus"
          :active="active"
          @select="select">
        </Menu>
      </Sidebar>
      <XContainer
        class="x-mask__main"
        grow
        shrink
        flex
        direction="column"
        overflow="hidden">
        <XContainer
          class="x-mask-topbar"
          justify="space-between"
          align="center">
          <Tabs
            ref="tabRef"
            :favorites="favorites"
            :tabs="showTabs"
            :home="home"
            :value="currentTab?.id"
            @click="changeTab"
            @toggleFavorite="toggleFavorite"
            @remove="onRemoveTab"
            @dialog="openDialog"
            @refresh="refresh"></Tabs>

          <Toolbar
            :tabs="dropdownTabs"
            :actions="props.actions"
            :theme="props.theme"
            @closeOtherTabs="onRemoveOtherTabs"
            @closeAllTabs="onRemoveAllTabs"
            @closeTab="onRemoveTab"
            @clickTab="moveToShow"
            @action-click="onActionClick"
            @action-command="onActionCommand">
            <Avatar :avatar="props.avatar" :width="props.userCardWidth">
              <template v-if="$slots.user" #default>
                <slot name="user"></slot>
              </template>
            </Avatar>
          </Toolbar>
        </XContainer>
        <Content :createView="createView" :exclude="exclude" :pure="props.pure">
          <template v-if="$slots.default">
            <slot></slot>
          </template>
        </Content>
      </XContainer>
    </template>
    <Content
      v-else
      :createView="createView"
      :exclude="exclude"
      :pure="props.pure">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </Content>
  </XContainer>
</template>
<script lang="ts" setup>
  import { provide, watch, toValue } from 'vue';
  import { XContainer, type ActionProps, type ActionMenuItem } from '../';
  import Sidebar from './components/Sidebar.vue';
  import SwitchBar from './components/SwitchBar.vue';
  import Brand from './components/Brand.vue';
  import Menu from './components/Menu.vue';
  import Tabs from './components/Tabs.vue';
  import Toolbar from './components/Toolbar.vue';
  import Avatar from './components/Avatar.vue';
  import Content from './components/Content.vue';

  import { maskProps, type MaskEmits, MASK_KEY, type MaskTab } from './types';
  import { useSidebar, useHome, useMenus, useTabs, useContent } from './hooks';
  import { delay } from '@vtj/utils';
  defineOptions({
    name: 'XMask'
  });

  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const home = useHome(props);
  const { collapsed, keyword, favorite } = useSidebar();
  const { menus, favorites, flatMenus, active, select, toggleFavorite } =
    useMenus(props, emit);
  const {
    tabRef,
    showTabs,
    currentTab,
    changeTab,
    removeTab,
    tabs,
    updateTab,
    isCurrentTab,
    activeHome,
    removeAllTabs,
    removeOtherTabs,
    dropdownTabs,
    moveToShow,
    closeCurrnetTab
  } = useTabs(props, emit, flatMenus, active, home);

  const {
    createView,
    openDialog,
    closeDialog,
    refresh,
    exclude,
    cleanCache,
    closeDialogs
  } = useContent(
    {
      tabs,
      updateTab,
      isCurrentTab,
      activeHome
    },
    props
  );

  const onRemoveTab = async (tab: MaskTab) => {
    const ret = await removeTab(tab);
    if (ret) {
      await cleanCache([tab]);
    }
  };

  const onRemoveAllTabs = async () => {
    const items = await removeAllTabs();
    if (items) {
      closeDialogs(items);
      await cleanCache(items);
    }
  };

  const onRemoveOtherTabs = async () => {
    const items = await removeOtherTabs();
    if (items) {
      closeDialogs(items);
      await cleanCache(items);
    }
  };

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };

  const close = async (tab?: MaskTab) => {
    const tabValue = toValue(tab || currentTab);
    if (tabValue) {
      if (tabValue.dialog) {
        closeDialog(tabValue);
      }
      await removeTab(tabValue, true);
      await delay(50);
    }
  };

  watch(currentTab, (tab) => {
    if (tab?.dialog) {
      closeDialog(tab);
    }
  });

  provide(MASK_KEY, {
    tabs,
    flatMenus,
    favorites,
    updateTab,
    active,
    currentTab,
    closeCurrnetTab,
    close
  });
</script>
