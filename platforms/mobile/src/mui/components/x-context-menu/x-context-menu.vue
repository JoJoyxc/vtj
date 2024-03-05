<template>
  <view
    v-if="props.modelValue"
    ref="elRef"
    class="x-context-menu"
    :style="styles">
    <uni-list class="x-context-menu__list">
      <uni-list-item
        class="x-context-menu__item"
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :disabled="item.disabled"
        @click="onClick(item)"
        clickable></uni-list-item>
    </uni-list>
  </view>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, watch, computed, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { type ContextMenuItem } from './types';
  import { contextMenuProps } from './props';

  const props = defineProps(contextMenuProps);

  const emit = defineEmits<{
    'update:modelValue': [boolean];
    click: [ContextMenuItem];
    show: [];
    hide: [];
  }>();

  const state = reactive({
    width: 0,
    height: 0,
    windowHeight: 0,
    windowTop: 0,
    windowWidth: 0
  });

  const elRef = ref();

  const initState = () => {
    const query = uni.createSelectorQuery().in(this);
    query
      .select('.x-context-menu')
      .boundingClientRect()
      .exec((e: UniApp.NodeInfo[]) => {
        const [el] = e;
        Object.assign(state, {
          width: el.width || 0,
          height: el.height || 0
        });
      });
    const info = uni.getSystemInfoSync();
    const { windowHeight, windowTop, windowWidth } = info;
    Object.assign(state, {
      windowHeight,
      windowTop,
      windowWidth
    });
  };

  const getDisplayPosition = () => {
    const { width, height, windowTop, windowWidth, windowHeight } = state;
    const { x, y } = props.position;
    let left = x - width / 2;
    if (x < width / 2) {
      left = x;
    }
    if (x + width > windowWidth) {
      left = x - width;
    }
    let top = y + windowTop;
    if (y + height + windowTop > windowHeight) {
      top = y - height + windowTop;
    }
    return { left, top };
  };

  const styles = computed(() => {
    const { left, top } = getDisplayPosition();
    return {
      left: `${left}px`,
      top: `${top}px`
    };
  });

  watch(
    () => props.modelValue,
    async (v) => {
      if (v) {
        await nextTick();
        initState();
      }
      v ? emit('show') : emit('hide');
    }
  );

  const onClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    if (item.click) {
      item.click();
    }
    emit('click', item);
    emit('update:modelValue', false);
  };

  onClickOutside(elRef, () => {
    emit('update:modelValue', false);
  });
</script>
<style lang="scss" scoped>
  .x-context-menu {
    position: fixed;
    z-index: 9999;
    top: 80px;
    left: 20px;
    box-shadow: 0 0 10px $uni-bg-color-mask;
    visibility: visible;
    display: inline-block;
  }
</style>
