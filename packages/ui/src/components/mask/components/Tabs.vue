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
      <ElTabPane v-if="props.home" :name="props.home.url">
        <template #label>
          <div class="x-mask-tabs__trigger">
            <component
              v-if="props.home.icon"
              :is="(useIcon(props.home.icon) as any)"></component>

            <span v-if="props.home.title">{{ props.home.title }}</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane
        v-for="tab in props.tabs"
        :key="tab.id || tab.url"
        :name="tab.url"
        lazy
        closable>
        <template #label>
          <ElPopover
            :disabled="!isActiveTab(tab)"
            :open-delay="500"
            placement="bottom"
            trigger="hover"
            width="200px">
            <template #reference>
              <div class="x-mask-tabs__trigger">
                <component
                  v-if="tab.icon"
                  :is="(useIcon(tab.icon) as any)"></component>

                <span v-if="tab.title">{{ tab.title }}</span>
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
    refresh: [tab: MaskTab];
    toggleFavorite: [item: MenuDataItem];
    dialog: [tab: MaskTab];
  }>();

  const getActions = (tab: MaskTab) => {
    const isFav = !!props.favorites.find(
      (n) => n === tab.menu || n.id === tab.menu?.id
    );
    return [
      {
        icon: Refresh,
        label: '刷新',
        name: 'refresh',
        value: tab
      },
      '|',
      {
        icon: isFav ? StarFilled : Star,
        label: '收藏',
        name: 'favorite',
        value: tab.menu,
        disabled: !tab.menu
      },
      '|',
      {
        icon: CopyDocument,
        label: '弹窗',
        name: 'dialog',
        value: tab
      }
    ] as ActionBarItems;
  };

  const onTabClick = (pane: TabsPaneContext) => {
    const name = pane.paneName;
    if (name === props.home.url) {
      emit('click', props.home);
      return;
    }
    const tab = props.tabs.find((n) => n.url === name);
    if (tab) {
      emit('click', tab);
    }
  };

  const onTabRemove = (name: string | number) => {
    const tab = props.tabs.find((n) => n.url === name);
    if (tab) {
      emit('remove', tab);
    }
  };

  const onActionClick = (item: ActionProps) => {
    switch (item.name) {
      case 'refresh':
        emit('refresh', item.value as MaskTab);
        break;
      case 'favorite':
        emit('toggleFavorite', item.value as MenuDataItem);
        break;
      case 'dialog':
        emit('dialog', item.value as MaskTab);
        break;
    }

    // console.log(item);
  };
</script>
