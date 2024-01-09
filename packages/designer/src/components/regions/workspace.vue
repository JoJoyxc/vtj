<template>
  <Tabs
    class="v-workspace-region"
    :key="tabKey"
    :items="tabs"
    :menus="menus"
    v-model="currentTab"
    checkable
    @remove="onRemove"
    @command="onCommand">
    <template v-for="widget in widgets" :key="widget.name">
      <KeepAlive>
        <WidgetWrapper
          ref="widgetsRef"
          v-if="currentTab === widget.name"
          :region="region"
          :widget="widget"></WidgetWrapper>
      </KeepAlive>
    </template>
  </Tabs>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, watchEffect } from 'vue';
  import { Tabs } from '../shared';
  import { RegionType, type TabWidget } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { useRegion } from '../hooks';
  export interface Props {
    region: RegionType;
    preview?: boolean;
  }

  const props = defineProps<Props>();

  const tabKey = ref(Symbol('tabKey'));

  const { widgets, widgetsRef } = useRegion(props.region);

  const items = reactive(
    (widgets.value as TabWidget[]).map((n) => {
      return {
        name: n.name,
        command: n.name,
        label: n.label,
        closable: !!n.closable,
        checked: false
      };
    })
  );

  const tabs = computed(() => {
    return !props.preview
      ? items.filter(
          (n) => (!n.closable || n.checked) && n.name !== 'Previewer'
        )
      : items.filter((n) => n.name === 'Previewer');
  });

  const menus = computed(() => {
    return !props.preview ? items.filter((n) => n.closable) : [];
  });

  const currentTab = ref(tabs.value[0]?.name);

  const onRemove = (name: any) => {
    const item = items.find((n) => n.name === name);
    if (item) {
      item.checked = false;
    }
    if (currentTab.value === name) {
      currentTab.value = tabs.value[0]?.name;
    }
  };
  const onCommand = (e: any) => {
    const item = items.find((n) => n.name === e.name);
    if (item) {
      item.checked = !item.checked;
      if (item.checked) {
        currentTab.value = item.name;
      }
      if (!item.checked && currentTab.value === item.name) {
        currentTab.value = tabs.value[0]?.name;
      }
    }
  };

  watchEffect(() => {
    currentTab.value = tabs.value[0]?.name;
    tabKey.value = Symbol('tabKey');
  });

  defineOptions({
    name: 'WorkspaceRegion'
  });

  defineExpose({
    currentTab,
    widgets,
    widgetsRef
  });
</script>
