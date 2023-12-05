<template>
  <Tabs
    class="v-workspace-region"
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
  import { computed, reactive, ref } from 'vue';
  import { Tabs } from '../shared';
  import { RegionType, type TabWidget } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { useRegion } from '../hooks';
  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();

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
    return items.filter((n) => !n.closable || n.checked);
  });

  const menus = computed(() => {
    return items.filter((n) => n.closable);
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

  defineOptions({
    name: 'WorkspaceRegion'
  });

  defineExpose({
    currentTab,
    widgets,
    widgetsRef
  });
</script>
