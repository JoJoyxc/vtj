<template>
  <XMenu :data="data" @select="onSelect" default-active="A-1"></XMenu>
</template>
<script lang="ts" setup>
import { XMenu, MenuData } from '@vtj/ui';
import * as VtjIcon from '@vtj/icons';
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
instance?.appContext.app.use(VtjIcon);
const data = [
  {
    id: 'A',
    title: 'A',
    icon: 'Document',
    children: [
      {
        id: 'A-1',
        title: 'A-1',
        icon: 'vtj-icon-np-share'
      },
      {
        id: 'A-2',
        title: 'A-2',
        icon: 'vtj-icon-np-share',
        disabled: true
      }
    ]
  }
];

const onSelect = (item) => {
  console.log('onSelect', item);
};
</script>
