<template>
  <XContainer
    class="x-mask-tabs"
    height="100%"
    grow
    flex
    justify="flex-end"
    direction="column">
    <ElTabs
      type="card"
      :model-value="tabsValue"
      @tab-remove="onTabRemove"
      @tab-click="onTabClick">
      <ElTabPane v-if="home" :name="home.id">
        <template #label>
          <div class="x-mask-tabs__trigger">
            <component
              v-if="home.icon"
              :is="(useIcon(home.icon) as any)"></component>

            {{ home.title }}
          </div>
        </template>
      </ElTabPane>
      <ElTabPane
        v-for="tab in tabs"
        :key="`tab_${tab.id}`"
        :name="tab.id"
        lazy
        closable>
        <template #label>
          <ElPopover
            :disabled="!isActive(tab)"
            placement="bottom"
            trigger="hover"
            width="200px">
            <template #reference>
              <div class="x-mask-tabs__trigger">
                <component
                  v-if="tab.icon"
                  :is="(useIcon(tab.icon) as any)"></component>

                {{ tab.title }}
              </div>
            </template>
            <XActionBar
              :items="actions"
              mode="text"
              size="small"
              type="info"></XActionBar>
          </ElPopover>
        </template>
      </ElTabPane>
    </ElTabs>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElTabs, ElTabPane, ElPopover, TabsPaneContext } from 'element-plus';
  import { XContainer, XActionBar, ActionBarItems, MenuDataItem } from '../';
  import { CopyDocument, Star, Refresh } from '@element-plus/icons-vue';
  import { useIcon } from '../../hooks';
  import { useInjectState } from './hooks';

  const emit = defineEmits<{
    click: [tab: MenuDataItem];
    remove: [tab: MenuDataItem];
    home: [];
  }>();

  const state = useInjectState();
  const actions: ActionBarItems = [
    {
      icon: Refresh,
      label: '刷新',
      command: 'refresh'
    },
    '|',
    {
      icon: Star,
      label: '收藏',
      command: 'fav'
    },
    '|',
    {
      icon: CopyDocument,
      label: '弹窗',
      command: 'dialog'
    }
  ];

  const tabs = computed(() => state.tabs.value);

  const isActive = (menu: MenuDataItem) => {
    return menu.id === state.activeMenu.value?.id;
  };

  const tabsValue = computed(() => state.activeMenu.value?.id);

  const home = computed(() => state.home.value);

  const onTabClick = (pane: TabsPaneContext) => {
    if (pane.paneName === state.home.value?.id) {
      emit('home');
      return;
    }
    const tab = tabs.value.find((n) => n.id === pane.paneName);
    if (tab) {
      emit('click', tab);
    }
  };

  const onTabRemove = (name: string | number) => {
    const tab = tabs.value.find((n) => n.id === name);
    if (tab) {
      emit('remove', tab);
    }
  };
</script>
