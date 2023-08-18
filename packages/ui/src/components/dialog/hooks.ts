import { reactive, watch, MaybeRef, computed } from 'vue';
import { DialogProps, DialogState } from './types';
import { useElementSize } from '@vueuse/core';
import { parseSize } from '../../';

let __global_ZIndex__ = 1000;

export function useState(props: DialogProps, wrapper: MaybeRef<HTMLElement>) {
  const { width, height } = useElementSize(wrapper);
  const state = reactive<DialogState>({
    mode: props.mode || 'normal',
    wrapperWidth: 0,
    wrapperHeight: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    zIndex: ++__global_ZIndex__
  });

  watch([width, height], ([w, h]) => {
    state.wrapperWidth = w;
    state.wrapperHeight = h;
    state.width = parseSize(props.width, w);
    state.height = parseSize(props.height, h);
    state.left = Math.max(Math.floor((w - state.width) / 2), 0);
    state.top = Math.max(Math.floor((h - state.height) / 2), 0);
  });

  watch(state, (v) => {
    __global_ZIndex__ = Math.max(v.zIndex, __global_ZIndex__);
  });

  return {
    state,
    normal: computed(() => state.mode === 'normal'),
    maximized: computed(() => state.mode === 'maximized'),
    minimized: computed(() => state.mode === 'minimized')
  };
}

export function useStyle() {}

export function useMethods() {}
