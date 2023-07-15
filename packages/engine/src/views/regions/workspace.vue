<template>
  <Tabs
    class="vtj-workspace"
    :items="tabs"
    v-model="currentTab"
    :more="moreItems"
    @tab-remove="onClose"
    @more="onClickMore"
    checkable>
    <WidgetRenderer
      v-for="item in workspace"
      :key="item.name"
      v-bind="{ ...item, ...openWidgetProps[item.name] }"
      :visible="item.name === currentTab"></WidgetRenderer>
  </Tabs>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { WidgetRenderer } from '../renderers';

import { Tabs, type TabItem, type MoreItem } from '../shared';
import { EVENT_DESIGNER_ACTIVE_CHANGE } from '../../core';
import { useCore } from '../../hooks';
const { regions, emitter } = useCore();
const workspace = computed(() => regions.value.workspace);

const designer = workspace.value
  .filter((n) => n.name === 'designer')
  .map((n) => {
    return {
      name: n.name,
      label: n.trigger?.label || n.name
    };
  });

const moreItems = ref<MoreItem[]>(
  workspace.value
    .filter((n) => !n.disabled && n.name !== 'designer')
    .map((item) => {
      return {
        name: item.name,
        label: item.trigger?.label || item.name,
        checked: false,
        closable: true
      };
    })
);

const tabs = computed<TabItem[]>(() => {
  const items = moreItems.value.filter((n) => !!n.checked);
  items.unshift(designer[0]);
  return items;
});

const currentTab = ref(tabs.value[0]?.name);

watch(currentTab, (name: string) => {
  emitter.emit(EVENT_DESIGNER_ACTIVE_CHANGE, name === 'designer');
});

const onClose = (name: string) => {
  const tab = moreItems.value.find((n) => n.name === name);
  if (tab) {
    tab.checked = false;
  }
  if (name === currentTab.value) {
    currentTab.value = tabs.value[0].name;
  }
};

const openWidgetProps = ref<Record<string, any>>({});

const openTab = (name: string, props: Record<string, any>) => {
  const item = moreItems.value.find((n) => n.name === name);
  if (item) {
    openWidgetProps.value[name] = props;
    item.checked = true;
  }
  currentTab.value = name;
};

const onClickMore = (command: any) => {
  command.checked = !command.checked;
  if (command.checked) {
    currentTab.value = command.name;
  } else {
    if (currentTab.value === command.name) {
      currentTab.value = 'designer';
    }
  }
};

defineExpose({
  openTab
});
</script>

<style lang="scss">
@use '../../style/vars' as *;
.vtj-workspace {
  .vtj-panel__header {
    border-bottom: 1px solid $vtj-border-color;
    .el-tabs__item.is-active {
      height: 33px !important;
    }
  }
  .el-tabs__header {
    height: 33px !important;
  }
}
</style>
