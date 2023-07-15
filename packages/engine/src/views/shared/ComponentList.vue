<template>
  <ElRow v-if="props.list.length" class="vtj-components__box" :gutter="10">
    <ElCol v-for="item in props.list" :span="props.span">
      <div
        class="vtj-components__item"
        :class="{ 'is-active': props.active && props.active(item) }"
        :draggable="!(props.active && props.active(item))"
        @dragstart="onDragStart(item, $event)"
        @dragend="onDragEnd"
        @click="onClick(item)"
        :title="item.name">
        <img v-if="item.icon" :src="item.icon" alt="" />
        <span v-else class="vtj-components__name">{{ item.name }}</span>
        <span>{{ item.title }}</span>
        <div
          v-if="props.editable || props.removable"
          class="vtj-components__footer">
          <i
            v-if="props.editable"
            @click.stop="onEdit(item)"
            class="vtj-icon-edit"></i>
          <i
            v-if="props.removable"
            @click.stop="onRemove(item)"
            class="vtj-icon-remove"></i>
        </div>
      </div>
    </ElCol>
  </ElRow>
  <ElEmpty v-else description="暂无数据" :image-size="60"></ElEmpty>
</template>
<script lang="ts" setup>
import { ElRow, ElCol, ElEmpty } from 'element-plus';
import { computed } from 'vue';
import {
  ComponentDescription,
  emitter,
  EVENT_COMPONENETS_DRAG_END,
  EVENT_COMPONENETS_DRAG_START
} from '../../core';

export interface Props {
  list?: ComponentDescription[];
  span?: number;
  editable?: boolean;
  removable?: boolean;
  active?: (item: any) => boolean;
  type?: 'Schema' | 'UrlSchema' | 'Remote';
}

const props = withDefaults(defineProps<Props>(), {
  span: 6,
  list: () => []
});

const emit = defineEmits(['edit', 'remove', 'click']);

async function onDragStart(item: ComponentDescription, e: DragEvent) {
  if (props.type === 'Schema') {
    item.from = {
      type: 'Schema',
      id: item.id as string
    };
  }
  emitter.emit(EVENT_COMPONENETS_DRAG_START, item);
}

function onDragEnd() {
  emitter.emit(EVENT_COMPONENETS_DRAG_END);
}

function onEdit(item: ComponentDescription) {
  emit('edit', item);
}

function onRemove(item: ComponentDescription) {
  emit('remove', item);
}

function onClick(item: ComponentDescription) {
  emit('click', item);
}
</script>

<style lang="scss">
@use '../../style/vars' as *;
.vtj-components__item {
  border-radius: 2px;
  &.is-active {
    background-color: $vtj-primary-color-light-9;
    color: $vtj-primary-color;
  }
}
</style>
