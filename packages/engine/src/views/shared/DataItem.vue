<template>
  <div class="vtj-data-item" :class="{ 'is-current': props.active }">
    <div
      class="vtj-data-item__header"
      @click="onClick"
      :class="{
        'is-pointer': props.clickable || props.collapsible,
        'is-bg': props.background
      }">
      <i
        v-if="props.collapsible"
        class="vtj-icon-greater arrow"
        :class="{ open: !collapsed }"
        @click.stop="toggleCollapsed"></i>
      <div class="vtj-data-item__title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div class="vtj-data-item__action">
        <slot name="action"></slot>
        <i
          v-if="props.editable"
          class="vtj-icon-edit"
          title="编辑"
          @click.stop="onEdit"></i>
        <i
          v-if="props.removable"
          class="vtj-icon-remove"
          title="删除"
          @click.stop="onRemove"></i>
      </div>
    </div>
    <div
      v-if="props.content || $slots.default"
      v-show="!collapsed"
      class="vtj-data-item__body">
      <slot>
        {{ props.content }}
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
export interface Props {
  title?: string;
  content?: string;
  editable?: boolean;
  removable?: boolean;
  active?: boolean;
  collapsible?: boolean;
  clickable?: boolean;
  collapsed?: boolean;
  background?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  editable: false,
  removable: false,
  active: false,
  collapsible: false,
  clickable: false,
  collapsed: false,
  background: true
});

const emit = defineEmits(['click', 'remove', 'edit']);

const collapsed = ref<boolean>(props.collapsed);

const onEdit = () => {
  emit('edit');
};

const onRemove = () => {
  emit('remove');
};

const onClick = () => {
  if (props.clickable) {
    emit('click');
  } else {
    toggleCollapsed();
  }
};

const toggleCollapsed = () => {
  if (!props.collapsible) return;
  collapsed.value = !collapsed.value;
};
</script>

<style lang="scss">
@use '../../style/vars' as *;
.vtj-data-item {
  margin: 4px 0;
  border: 1px solid $vtj-background-color-dark-9;
  border-radius: 4px;
  font-size: 12px;
  width: 100%;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3px 5px;
    border: 1px dashed transparent;
    border-radius: 4px;
    color: $vtj-secondary-color;
    align-items: center;
    &.is-bg {
      background-color: $vtj-background-color-dark-9;
    }
    .arrow {
      zoom: 0.8;
      margin-right: 5px;
      color: $vtj-secondary-color;
      transition: transform 0.2s ease-in-out;
    }
    .open {
      transform: rotate(90deg);
    }
    &.is-pointer {
      cursor: pointer;
    }
  }

  &:hover {
    border-color: $vtj-border-color;
    border: 1px dashed $vtj-border-color;
  }
  &.is-current {
    .vtj-data-item__header {
      background-color: $vtj-primary-color-light-9;
      color: $vtj-primary-color;
    }
    border-color: $vtj-primary-color-light-9;
    border: 1px solid $vtj-primary-color-light-9;
  }

  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 1px;
    flex-grow: 1;
    display: block;
  }

  &__action {
    margin-top: -1px;
    i {
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 5px;
      color: $vtj-secondary-color;
      font-size: 12px;
      &:hover {
        background-color: $vtj-primary-color-light-9;
        color: $vtj-primary-color;
      }
      &.is-active {
        color: $vtj-primary-color;
        font-weight: bold;
      }
    }
  }
  &__body {
    padding: 10px;
  }
}
</style>
