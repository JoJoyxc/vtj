<template>
  <XContainer
    ref="tabsRef"
    class="x-mask-tabs"
    height="100%"
    grow
    flex
    justify="flex-end"
    direction="column">
    <ElTabs
      type="card"
      :model-value="props.value"
      @tab-remove="onTabRemove"
      @tab-click="onTabClick">
      <ElTabPane v-if="props.home" :name="props.home.menu.id">
        <template #label>
          <div class="x-mask-tabs__trigger">
            <component
              v-if="props.home.menu.icon"
              :is="(useIcon(props.home.menu.icon) as any)"></component>

            <span v-if="props.home.menu.title">{{
              props.home.menu.title
            }}</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane
        v-for="tab in props.tabs"
        :key="`tab_${tab.menu.id}`"
        :name="tab.menu.id"
        lazy
        closable>
        <template #label>
          <ElPopover
            :disabled="!isActiveTab(tab)"
            placement="bottom"
            trigger="hover"
            width="200px">
            <template #reference>
              <div class="x-mask-tabs__trigger">
                <component
                  v-if="tab.menu.icon"
                  :is="(useIcon(tab.menu.icon) as any)"></component>

                <span v-if="tab.menu.title">{{ tab.menu.title }}</span>
              </div>
            </template>
            <XActionBar
              :items="getActions(tab)"
              mode="text"
              size="small"
              type="info"
              @click="onActionClick"></XActionBar>
          </ElPopover>
        </template>
      </ElTabPane>
    </ElTabs>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ElTabs, ElTabPane, ElPopover, TabsPaneContext } from 'element-plus';
  import {
    XContainer,
    XActionBar,
    ActionBarItems,
    ActionProps,
    MenuDataItem
  } from '../../';
  import {
    CopyDocument,
    Star,
    Refresh,
    StarFilled
  } from '@element-plus/icons-vue';
  import { useIcon } from '../../../hooks';
  import { MaskTab } from '../types';

  export interface Props {
    tabs: MaskTab[];
    home: MaskTab;
    isActiveTab: (tab: MaskTab) => boolean;
    value?: string | number;
    favorites: MenuDataItem[];
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    click: [tab: MaskTab];
    remove: [tab: MaskTab];
    home: [];
    refresh: [];
    toggleFavorite: [item: MenuDataItem];
  }>();

  const getActions = (tab: MaskTab) => {
    const isFav = !!props.favorites.find(
      (n) => n === tab.menu || n.id === tab.menu.id
    );
    return [
      {
        icon: Refresh,
        label: '刷新',
        name: 'refresh'
      },
      '|',
      {
        icon: isFav ? StarFilled : Star,
        label: '收藏',
        name: 'favorite',
        value: tab.menu
      },
      '|',
      {
        icon: CopyDocument,
        label: '弹窗',
        name: 'dialog'
      }
    ] as ActionBarItems;
  };

  const onTabClick = (pane: TabsPaneContext) => {
    const name = pane.paneName;
    if (name === props.home.menu.id) {
      emit('home');
      return;
    }
    const tab = props.tabs.find((n) => n.menu.id === name);
    if (tab) {
      emit('click', tab);
    }
  };

  const onTabRemove = (name: string | number) => {
    const tab = props.tabs.find((n) => n.menu.id === name);
    if (tab) {
      emit('remove', tab);
    }
  };

  const onActionClick = (item: ActionProps) => {
    switch (item.name) {
      case 'refresh':
        emit('refresh');
        break;
      case 'favorite':
        emit('toggleFavorite', item.value as MenuDataItem);
        break;
      case 'dialog':
        break;
    }

    // console.log(item);
  };
</script>
