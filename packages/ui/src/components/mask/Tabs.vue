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
      :model-value="tabsValue"
      @tab-remove="onTabRemove"
      @tab-click="onTabClick">
      <ElTabPane v-if="home" :name="home.id">
        <template #label>
          <div class="x-mask-tabs__trigger">
            <component
              v-if="home.icon"
              :is="(useIcon(home.icon) as any)"></component>

            <span v-if="home.title">{{ home.title }}</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane
        v-for="tab in props.items"
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

                <span v-if="tab.title">{{ tab.title }}</span>
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

  export interface Props {
    tabs: MenuDataItem[];
    items: MenuDataItem[];
  }

  const props = withDefaults(defineProps<Props>(), {
    tabs: () => [],
    items: () => []
  });

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

  const tabsValue = computed(() => state.activeMenu.value?.id);
  const home = computed(() => state.home.value);

  const isActive = (menu: MenuDataItem) => {
    return menu.id === state.activeMenu.value?.id;
  };

  const onTabClick = (pane: TabsPaneContext) => {
    if (pane.paneName === state.home.value?.id) {
      emit('home');
      return;
    }
    const tab = props.tabs.find((n) => n.id === pane.paneName);
    if (tab) {
      emit('click', tab);
    }
  };

  const onTabRemove = (name: string | number) => {
    const tab = props.tabs.find((n) => n.id === name);
    if (tab) {
      emit('remove', tab);
    }
  };
</script>
