<template>
  <div class="vtj-setting" v-if="selected && selected.node">
    <div v-if="nodeType === 'Node'" class="vtj-setting__header">
      <div class="vtj-setting__path">
        <i class="vtj-icon-layers"></i>
        <span>
          {{ (selected.node as any).name.fileName || selected.node.name }}:
          <i>{{ selected.node.id }}</i>
        </span>
      </div>
      <div v-if="docUrl" class="vtj-setting__doc" @click="openDocs">
        <i class="vtj-icon-help"></i> 帮助
      </div>
    </div>
    <Tabs
      v-if="!selected.node.lock"
      class="vtj-setting__tabs"
      :items="tabs"
      v-model="currentTab"
      stretch
      :body-padding="false">
      <WidgetRenderer
        v-for="item in setting"
        :key="item.name"
        v-bind="{ ...item }"
        :visible="item.name === currentTab"></WidgetRenderer>
    </Tabs>
    <ElEmpty
      v-if="selected.node.lock"
      :image-size="1"
      description="组件已被锁定，不能更改设置。"></ElEmpty>
  </div>
  <ElEmpty v-else description="请在左侧画布选中节点"></ElEmpty>
</template>
<script lang="ts" setup>
import { ref, computed, watch, toValue } from 'vue';
import Tabs from '../shared/Tabs.vue';
import { WidgetRenderer } from '../renderers';
import { useCore, useDesigner } from '../../hooks';
import { isBlock } from '../../utils';
import { ElEmpty } from 'element-plus';
const { engine, regions } = useCore();

const { selected } = useDesigner();
const { setting } = regions.value || {};
const nodeType = computed(() =>
  isBlock(selected.value?.node) ? 'Block' : 'Node'
);

const tabs = computed(() => {
  return setting
    .filter((n) => !n.disabled && n.group === nodeType.value)
    .map((item) => {
      return {
        name: item.name,
        label: item.trigger?.label || item.name,
        closable: false
      };
    });
});

const currentTab = ref(tabs.value[0]?.name);

watch(selected, (val, old) => {
  if (val?.node.id !== old?.node.id) {
    change(0);
  }
});

const change = (index: number = 0) => {
  currentTab.value = tabs.value[index]?.name;
};

defineExpose({
  currentTab,
  tabs,
  change
});

const docUrl = computed(() => {
  const node = selected.value?.node;
  if (node) {
    const desc = engine.assets.componentMap[node.name as string];
    return desc?.doc;
  }
  return null;
});

const openDocs = () => {
  if (docUrl.value) {
    const workspace = toValue(engine.skeleton.regionInstances.workspace);
    if (workspace) {
      workspace.openTab('docs', {
        url: docUrl.value
      });
    }
  }
};
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-setting {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: $vtj-background-color;
    height: 33px;
    line-height: 32px !important;
    border-bottom: 1px solid $vtj-border-color;
    top: -1px;
    position: relative;
    padding: 0 10px;
  }
  &__doc {
    color: $vtj-primary-color;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      opacity: 0.7;
    }
  }
  &__path {
    white-space: nowrap;
    overflow: hidden;
    span {
      margin-left: 5px;
      color: $vtj-primary-color;
      opacity: 0.8;
      font-size: 12px;
      i {
        padding-left: 5px;
        color: $vtj-secondary-color;
      }
    }
  }
  &__tabs {
    flex-grow: 1;
    > .vtj-panel__body {
      height: 1px;
    }
  }
  &__space {
    height: 10px;
    overflow: hidden;
  }
}
</style>
