<template>
  <div ref="container" class="vtj-designer">
    <Viewport
      v-show="current"
      :mode="viewportMode"
      :width="wrapperRect.width"
      :height="wrapperRect.height">
      <iframe ref="iframe" frameborder="0"></iframe>
      <div
        v-if="dropping"
        class="vtj-designer__dropping"
        :class="`is-inner`"
        :style="dropping.style"></div>

      <div v-if="hover" class="vtj-designer__hover" :style="hover.style">
        <span
          v-show="!isHoverBlock"
          class="vtj-designer__hover-title"
          :class="`is-${hover.position}`">
          {{ hover.node.name }}: <i> {{ hover.node.id }}</i>
        </span>
      </div>

      <div
        v-if="selected"
        v-show="isShowSelected"
        class="vtj-designer__selected"
        :style="selected.style">
        <Actions
          v-if="!isSelectBlock"
          :title="selected.node.name"
          :node="selected.node"
          :path="selected.path"
          :position="selected.position"
          @action="onAction">
        </Actions>
      </div>
    </Viewport>

    <ElEmpty
      v-if="!current"
      description="请在文档管理器新建或打开文件"></ElEmpty>
    <div v-if="isEmptyChildren" class="vtj-designer__placeholder">
      您可以拖拽组件放置到这里
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { ElEmpty } from 'element-plus';
import Viewport from '../shared/Viewport.vue';
import Actions from '../shared/Actions.vue';
import { useCore, useDesigner, createSlotDialog } from '../../hooks';
import { Designer } from '../../core';
import { isBlock } from '../../utils';
import { useResizeObserver } from '@vueuse/core';

const { engine } = useCore();
const iframe = ref<HTMLIFrameElement>();
const container = ref();
const wrapperRect = ref({ width: 0, height: 0 });

useResizeObserver(container as any, (entries) => {
  const entry = entries[0];
  wrapperRect.value = entry.contentRect;
});

const designer = new Designer(engine, iframe, createSlotDialog);

const { hover, dropping, selected, onAction, viewportMode } =
  useDesigner(designer);

const current = engine.project.current;

const isEmptyChildren = computed(() => current.value?.children.length === 0);
const isHoverBlock = computed(() => isBlock(hover.value?.node));
const isSelectBlock = computed(() => isBlock(selected.value?.node));
const isShowSelected = computed(() => {
  const { width = 0, height = 0 } = selected.value?.rect || {};
  return width > 0 || height > 0;
});

// watch(selected, (val) => {
//   const appInstance = engine.app._instance;
//   alert(appInstance);
//   if (appInstance && appInstance.exposed) {
//     alert(!!val);
//     appInstance.exposed.showSetting.value = !!val;
//   }
// });

defineExpose({
  designer,
  selected
});
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-designer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  &__placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: $vtj-secondary-color;
    opacity: 0.6;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .el-empty {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__hover {
    border: 1px dashed $vtj-primary-color;
    background-color: rgba(64, 158, 255, 0.05);
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  &__hover-title {
    color: $vtj-primary-color;
    position: absolute;
    background-color: $vtj-primary-color-light-9;
    height: 23px;
    line-height: 22px;
    border-radius: 4px;
    font-size: 12px;
    padding: 0 5px;
    white-space: nowrap;
    box-shadow: 0 0 3px #fff;

    i {
      color: $vtj-secondary-color;
    }

    &.is-inner {
      left: 2px;
      top: 2px;
    }

    &.is-left-top {
      left: 0;
      top: -2px;
      transform: translateY(-100%);
    }

    &.is-left-bottom {
      left: 0;
      bottom: -2px;
      transform: translateY(100%);
    }
    &.is-right-top {
      right: 0;
      top: -2px;
      transform: translateY(-100%);
    }
    &.is-right-bottom {
      right: 0;
      bottom: -2px;
      transform: translateY(100%);
    }
  }

  &__selected {
    border: 2px solid $vtj-primary-color;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 10;
  }

  &__dropping {
    border: 2px solid $vtj-primary-color;
    background-color: rgba(64, 158, 255, 0.05);
    position: absolute;
    pointer-events: none;
    &.is-inner {
      border: 1px solid $vtj-primary-color;
    }
  }

  &__slots {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
  &__slot {
    border: 1px solid $vtj-border-color;
    display: inline-block;
    padding: 30px 10px;
    background-color: $vtj-warning-color-light;
    cursor: pointer;
    flex-grow: 1;
    margin: 5px;
    text-align: center;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
