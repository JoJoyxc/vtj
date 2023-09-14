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
          @search="mask.searchMenu($event)"></SwitchBar>
        <Menu
          :collapse="collapsed"
          :keyword="keyword"
          :favorite="favorite"
          :favorites="favorites"
          :flatMenus="flatMenus"
          :menus="menus"
          :active="active"
          @select="mask.selectMenu($event)"></Menu>
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
            :value="tabValue"
            :isActiveTab="mask.isCurrentTab.bind(mask)"
            @click="mask.changeTab($event)"
            @remove="mask.removeTab($event)"
            @refresh="mask.refresh($event)"
            @toggleFavorite="mask.toggleFavorite($event)"
            @dialog="mask.switchToDialog($event)"></Tabs>
          <Toolbar
            :tabs="dropdownTabs"
            :actions="props.actions"
            :theme="props.theme"
            @closeOtherTabs="() => mask.removeOtherTabs()"
            @closeAllTabs="() => mask.removeAllTabs()"
            @closeTab="mask.removeTab($event)"
            @clickTab="mask.moveToShow($event)"
            @action-click="mask.onActionClick($event)"
            @action-command="
              (action, item) => mask.onActionCommand(action, item)
            ">
            <Avatar :avatar="props.avatar">
              <template v-if="$slots.user" #default>
                <slot name="user"> </slot>
              </template>
            </Avatar>
          </Toolbar>
        </XContainer>
        <Content :tab="currentTab">
          <template v-if="$slots.default">
            <slot></slot>
          </template>
        </Content>
      </XContainer>
    </template>
    <Content v-else :tab="currentTab">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </Content>
  </XContainer>
</template>
<script lang="ts" setup>
  import { provide } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { XContainer } from '../';
  import Sidebar from './components/Sidebar.vue';
  import SwitchBar from './components/SwitchBar.vue';
  import Brand from './components/Brand.vue';
  import Menu from './components/Menu.vue';
  import Tabs from './components/Tabs.vue';
  import Toolbar from './components/Toolbar.vue';
  import Avatar from './components/Avatar.vue';
  import Content from './components/Content.vue';
  import { maskProps, MASK_INSTANCE_KEY, MaskEmits, MaskTab } from './types';
  import { MaskFactory } from './MaskFactory';

  defineOptions({
    name: 'XMask'
  });

  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const router = useRouter();
  const route = useRoute();

  const mask = new MaskFactory(props, emit, route, router);
  const {
    collapsed,
    homeTab,
    tabRef,
    favorite,
    favorites,
    keyword,
    flatMenus,
    active,
    showTabs,
    dropdownTabs,
    tabValue,
    currentTab,
    menus
  } = mask;

  provide(MASK_INSTANCE_KEY, mask);

  defineExpose({
    mask
  });
</script>
