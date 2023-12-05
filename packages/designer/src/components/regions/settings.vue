<template>
  <XContainer class="v-settings-region" fit direction="column">
    <XContainer
      flex
      justify="space-between"
      align="center"
      class="v-settings-region__header">
      <XContainer class="v-settings-region__title">
        <VtjIconLayers></VtjIconLayers>
        <span> XContainer </span>
      </XContainer>
      <XContainer>
        <XAction :icon="VtjIconHelp" mode="text" label="帮助"></XAction>
      </XContainer>
    </XContainer>

    <XContainer grow>
      <Tabs :items="tabs" v-model="currentTab" stretch>
        <template v-for="widget in widgets" :key="widget.name">
          <WidgetWrapper
            ref="widgetsRef"
            v-if="currentTab === widget.name"
            :region="region"
            :widget="widget"></WidgetWrapper>
        </template>
      </Tabs>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XContainer, XAction } from '@vtj/ui';
  import { VtjIconLayers, VtjIconHelp } from '@vtj/icons';
  import { RegionType, WidgetGroup, type TabWidget } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { Tabs } from '../shared';
  import { useRegion } from '../hooks';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();
  const group = ref<string>(WidgetGroup.Block);
  const { widgets, widgetsRef } = useRegion(props.region, group);

  const tabs = computed(() => {
    return (widgets.value as TabWidget[]).map((n) => {
      return {
        name: n.name,
        label: n.label
      };
    });
  });

  const currentTab = ref(tabs.value[0]?.name);

  defineOptions({
    name: 'SettingsRegion'
  });

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
