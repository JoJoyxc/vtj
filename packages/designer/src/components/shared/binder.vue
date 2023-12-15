<template>
  <XDialog
    class="v-binder"
    title="状态数据"
    width="1000px"
    height="600px"
    :body-padding="false">
    <XContainer fit direction="row">
      <XContainer width="30%" height="100%">
        <Tabs class="v-binder__tabs" :items="tabs" v-model="currentTab">
          <XContainer class="v-binder__tab-content" fit padding :flex="false">
            <ElInput
              size="small"
              clearable
              :prefix-icon="Search"
              placeholder="筛选可用项"></ElInput>
            <div v-for="n in 4">
              <ElDivider border-style="dotted">状态{{ n }}</ElDivider>
              <Item title="state" background :actions="['copy']" small></Item>
              <Item title="state" background :actions="['copy']" small></Item>
              <Item title="state" background :actions="['copy']" small></Item>
            </div>
          </XContainer>
        </Tabs>
      </XContainer>
      <XContainer flex grow padding>main</XContainer>
    </XContainer>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialog, XContainer } from '@vtj/ui';
  import { Search } from '@vtj/icons';
  import { ElInput, ElDivider } from 'element-plus';
  import Tabs from './tabs.vue';
  import Item from './item.vue';

  const tabs = [
    {
      name: 'normal',
      label: '常用'
    },
    {
      name: 'advanced',
      label: '高级'
    }
  ];
  const currentTab = ref('normal');
</script>
