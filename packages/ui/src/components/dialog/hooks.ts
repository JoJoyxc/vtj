import { reactive, watch, MaybeRef, computed } from 'vue';
import { DialogProps, DialogState, DialogMode, DialogEmits } from './types';
import { useElementSize, Position } from '@vueuse/core';
import { parseSize, ShortEmits, DraggableOptions } from '../../';
import { isObject } from '@vtj/utils';

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
    zIndex: ++__global_ZIndex__,
    dragging: false,
    resizing: false
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

export function useStyle(props: DialogProps, state: DialogState) {
  const styles = computed(() => {
    const { width, height, top, left, zIndex } = state;
    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      zIndex
    };
  });

  const classes = computed(() => {
    return {
      [`is-${state.mode}`]: !!state.mode,
      [`is-draggable`]: !!props.draggable
    };
  });

  const wrapperClass = computed(() => {
    return {
      [`is-${state.mode}`]: !!state.mode,
      'is-dragging': state.dragging,
      'is-resizing': state.resizing
    };
  });

  return {
    styles,
    classes,
    wrapperClass
  };
}

export function useMethods(
  props: DialogProps,
  state: DialogState,
  emit: ShortEmits<DialogEmits>
) {
  const changeMode = (mode: DialogMode) => {
    state.mode = mode;
    if (['maximized', 'minimized', 'normal'].includes(mode)) {
      emit(mode as any);
    }
    emit('modeChange', mode);
  };

  const close = () => {
    emit('update:modelValue', false);
    emit('close');
  };

  const active = () => {
    ++state.zIndex;
  };

  return {
    close,
    changeMode,
    active
  };
}

export function useDraggableOptions(
  props: DialogProps,
  state: DialogState,
  emit: ShortEmits<DialogEmits>
) {
  return computed<DraggableOptions>(() => {
    const disabled =
      typeof props.draggable === 'boolean'
        ? !props.draggable
        : !!props.draggable?.disabled;
    return {
      ...(isObject(props.draggable) ? props.draggable : {}),
      disabled,
      selector: '.x-panel__header',
      onStart(position: Position) {
        state.dragging = true;
        emit('dragStart', position);
      },
      onMove(position: Position) {
        emit('dragging', position);
      },
      onEnd(position: Position) {
        if (state.mode === 'maximized') return;
        const { x, y } = position;
        state.left = x;
        state.top = y;
        state.dragging = false;
        emit('dragEnd', position);
      }
    };
  });
}
