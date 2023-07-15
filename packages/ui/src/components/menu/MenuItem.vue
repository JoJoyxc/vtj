<template>
  <ElSubMenu v-if="!!props.item.children" :index="props.item.id">
    <template #title>
      <div>
        <XIcon :icon="getIcon(props.item.icon)"></XIcon>
        <span>{{ props.item.title }}</span>
      </div>
    </template>
    <ChildMenuItem
      v-for="child in getShowItems(props.item.children)"
      :item="child"></ChildMenuItem>
  </ElSubMenu>
  <ElMenuItem v-else :index="props.item.id" v-bind="props.item">
    <XIcon :icon="getIcon(props.item.icon)"></XIcon>
    <span>{{ props.item.title }}</span>
  </ElMenuItem>
</template>
<script lang="ts" setup>
import { ElSubMenu, ElMenuItem } from 'element-plus';
import { XIcon } from '../';
import { MenuDataItem } from './types';
import { XMenuItem as ChildMenuItem } from './components';
import { getCurrentInstance } from 'vue';

export interface Props {
  item: MenuDataItem;
}

defineOptions({
  name: 'XMenuItem'
});

const props = defineProps<Props>();
const instance = getCurrentInstance();

const getIcon = (name: string = '') => {
  if (!name) return undefined;
  const app = instance?.appContext.app;
  return app?.component(name) || name;
};

const getShowItems = (items: MenuDataItem[]) => {
  return items.filter((n) => !n.hidden);
};
</script>
