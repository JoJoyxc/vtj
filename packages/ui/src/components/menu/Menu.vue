<template>
  <ElMenu class="x-menu" v-bind="props" @select="onSelect">
    <XMenuItem v-for="item in items" :item="item"></XMenuItem>
  </ElMenu>
</template>
<script lang="ts" setup>
import { ElMenu } from 'element-plus';
import { MenuProps, MenuDataItem } from './types';
import { XMenuItem } from './components';
import { computed } from 'vue';

defineOptions({
  name: 'XMenu'
});

const props = withDefaults(defineProps<MenuProps>(), {
  data: () => []
});

const emit = defineEmits<{
  select: [item: MenuDataItem];
}>();

const items = computed(() => props.data.filter((n) => !n.hidden));

const findItem = (data: MenuDataItem[], id: string) => {
  const finder = (
    id: string,
    items: MenuDataItem[] = []
  ): MenuDataItem | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      } else {
        if (item.children?.length) {
          const match = finder(id, item.children);
          if (match) {
            return match;
          }
        }
      }
    }
  };
  return finder(id, data);
};

const onSelect = (id: string) => {
  const item = findItem(items.value, id);
  if (item) {
    emit('select', item);
  }
};
</script>
