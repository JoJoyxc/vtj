<template>
  <div class="vtj-panel" ref="panel">
    <div ref="header" class="vtj-panel__header-wrapper">
      <i
        v-if="props.back"
        @click.stop="handleClickBack"
        class="vtj-panel__back vtj-icon-arrow-left"></i>

      <div v-if="title !== null" class="vtj-panel__header">
        <slot name="title">
          <div class="vtj-panel__title">
            <i v-if="icon" class="vtj-panel__icon" :class="icon"></i>
            {{ title }}
            <span v-if="subtitle" class="vtj-panel__subtitle">
              {{ subtitle }}
            </span>
          </div>
        </slot>
        <div
          v-if="(tools && tools.length) || $slots.tools"
          class="vtj-panel__tools">
          <i
            v-for="item in tools"
            :key="item.name"
            :class="item.icon"
            @click="onToolClick(item)"></i>
          <slot name="tools"></slot>
        </div>
      </div>
    </div>
    <div class="vtj-panel__body" :class="{ 'is-padding': props.bodyPadding }">
      <slot></slot>
    </div>
    <div class="vtj-panel__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ToolItem } from './types';

// export interface Props extends /* @vue-ignore */ PanelProps {}

interface PanelProps {
  icon?: string;
  title?: string | null;
  subtitle?: string;
  tools?: ToolItem[];
  bodyPadding?: boolean;
  back?: boolean;
}

const props = withDefaults(defineProps<PanelProps>(), {
  bodyPadding: true
});

const panel = ref();
const header = ref();

const emit = defineEmits<{
  (e: 'tool-click', item: ToolItem): void;
  (e: 'back'): void;
}>();

function onToolClick(item: ToolItem) {
  emit('tool-click', item);
}

function handleClickBack() {
  emit('back');
}

defineExpose({
  panel,
  header
});
</script>

<style lang="scss">
@use '../../style/vars' as *;
.vtj-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &__header-wrapper {
    display: flex;
    align-items: center;
  }
  &__back {
    font-size: 16px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
      background-color: $vtj-primary-color-light-9;
      border-radius: 4px;
      color: $vtj-primary-color;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    height: 32px;
    align-items: center;
    padding: 0 10px;
    flex-shrink: 0;
    flex-grow: 1;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__subtitle {
    font-size: 12px;
    font-weight: normal;
    color: $vtj-secondary-color;
  }

  &__tools {
    font-size: 14px;
    i {
      padding: 5px;
      cursor: pointer;
      outline: none;
      &:hover {
        opacity: 0.9;
        background-color: $vtj-primary-color-light-9;
        border-radius: 4px;
        color: $vtj-primary-color;
      }
    }
  }
  &__body {
    flex-grow: 1;
    // height: 1px;
    overflow: auto;

    .el-collapse {
      --el-collapse-header-height: 36px;
    }
    &.is-padding {
      padding: 10px;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
  }
  &__icon {
    font-weight: normal;
  }
}
</style>
