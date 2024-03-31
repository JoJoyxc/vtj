<template>
  <XDialog title="新增API" width="1000px" height="600px">
    <XContainer fit>
      <XContainer width="100px" :shrink="false">
        <XTabs
          v-model="currentTab"
          :items="tabs"
          tab-position="left"
          border
          fit></XTabs>
      </XContainer>
      <XPanel
        :header="null"
        :border="false"
        overflow="auto"
        grow
        :shrink="true"
        fit>
        <XForm :footer="false" labelPosition="top" :tooltipMessage="false">
          <BaseInfo v-if="currentTab === 'base'"></BaseInfo>

          <div v-if="currentTab === 'settings'">
            <RequestSettins></RequestSettins>
            <JsonpOptions></JsonpOptions>
          </div>
          <MockTemplate v-if="currentTab === 'mock'"></MockTemplate>
        </XForm>

        <template #footer>
          <XContainer justify="space-between">
            <ElButton type="warning">预览</ElButton>
            <div>
              <ElButton>取消</ElButton>
              <ElButton type="primary">保存</ElButton>
            </div>
          </XContainer>
        </template>
      </XPanel>
    </XContainer>
  </XDialog>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import {
    XDialog,
    XTabs,
    XContainer,
    XPanel,
    XForm,
    type TabsItem
  } from '@vtj/ui';
  import { ElButton } from 'element-plus';
  import BaseInfo from './base-info.vue';
  import RequestSettins from './request-settings.vue';
  import JsonpOptions from './jsonp-options.vue';
  import MockTemplate from './mock-template.vue';

  const currentTab = ref<string>('base');

  const tabs: TabsItem[] = [
    {
      label: '基础信息',
      value: 'base'
    },
    {
      label: '请求配置',
      value: 'settings'
    },
    {
      label: '模拟数据',
      value: 'mock'
    }
  ];
</script>
