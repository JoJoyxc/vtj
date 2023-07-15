<template>
  <Panel class="vtj-tabs" v-bind="$attrs">
    <template v-slot:title>
      <ElTabs
        type="card"
        v-model="currentTab"
        @tab-remove="handelTabRemove"
        :stretch="props.stretch">
        <ElTabPane
          v-for="item in props.items"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          :closable="item.closable"
          lazy></ElTabPane>
      </ElTabs>
    </template>
    <template v-slot:tools>
      <ElDropdown
        v-if="props.more"
        :hide-on-click="false"
        size="small"
        placement="bottom-end"
        @command="handleCommand">
        <i class="vtj-icon-more"></i>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="item in props.more"
              :key="item.name"
              :command="item">
              <span v-if="props.checkable" class="vtj-tabs__check">
                <i :class="`${item.checked ? 'vtj-icon-check' : 'none'}`"></i>
              </span>

              {{ item.label }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </template>
    <slot></slot>
  </Panel>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { PanelProps, TabItem, MoreItem } from './types';
import Panel from './Panel.vue';

import {
  ElTabs,
  ElTabPane,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus';

export interface Props extends /* @vue-ignore */ PanelProps {
  items?: TabItem[];
  modelValue?: string;
  more?: MoreItem[];
  stretch?: boolean;
  checkable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
});

const currentTab = ref<string>(
  (props.modelValue || props.items[0]?.name) ?? ''
);

const emit = defineEmits(['update:modelValue', 'more', 'tab-remove']);

watch(currentTab, () => {
  emit('update:modelValue', currentTab.value);
});

watch(
  () => props.modelValue,
  (name) => {
    currentTab.value = name as string;
  }
);

const handleCommand = (command: any) => {
  emit('more', command);
};
const handelTabRemove = (name: any) => {
  emit('tab-remove', name);
};
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-tabs {
  &__check {
    width: 16px;
    display: inline-block;
  }

  .vtj-panel__header {
    // border-bottom: 1px solid $vtj-border-color;
    padding: 0;
    .el-tabs {
      --el-tabs-header-height: 32px;
      width: 1px;
      flex-grow: 1;
    }

    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__nav {
      border-left: none !important;
      border-top: none !important;
      border-radius: 0 !important;
      &.is-stretch {
        border-right: none !important;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 32px;
    }
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0 13px;
    }
    .el-tabs__nav-prev {
      border-right: 1px solid $vtj-border-color;
    }
    .el-tabs__nav-next {
      border-left: 1px solid $vtj-border-color;
    }
    .el-tabs__item.is-active {
      background-color: $vtj-background-color-dark-9;
      border-bottom-color: $vtj-background-color-dark-9 !important;
    }
  }

  .vtj-panel__tools {
    padding-right: 5px;
  }

  .vtj-panel__body {
    background-color: $vtj-background-color-dark-9;
    height: 100%;
  }
}
</style>
