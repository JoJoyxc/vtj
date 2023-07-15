import { Ref, computed, unref, watch } from 'vue';
import {
  useDraggable as useCoreDraggable,
  UseDraggableOptions as UseCoreDraggableOptions,
  useElementBounding,
  useElementSize
} from '@vueuse/core';
import { omit, IS_DRAGGING_CLASS_NAME } from '../';

export interface UseDraggableOptions extends UseCoreDraggableOptions {
  selector?: string;
  edge?: number;
  wrapper?: Ref<HTMLElement | undefined | null>;
  delay?: number;
}
export function useDraggable(
  el: Ref<HTMLElement | undefined | null>,
  options: UseDraggableOptions = {}
) {
  const edge = options.edge || 40;
  const handle = computed<HTMLElement | null | undefined>(() => {
    if (!options.selector) return null;
    if (typeof options.selector === 'string') {
      return unref(el)?.querySelector(options.selector);
    }
    return unref(el);
  });

  const wrapper = computed(() => unref(options.wrapper));
  const { x, y, isDragging } = useCoreDraggable(el, {
    preventDefault: false,
    stopPropagation: false,
    handle: options.selector ? handle : null,
    ...omit(options, ['handle', 'edge'])
  });

  const doDrag = (
    x: Ref<number>,
    y: Ref<number>,
    w: Ref<number>,
    width: Ref<number>,
    height: Ref<number>,
    top: Ref<number>
  ) => {
    const yRange = [-w.value + edge, width.value - edge];
    y.value = Math.min(Math.max(y.value, top.value), height.value - edge);
    if (x.value < yRange[0]) {
      x.value = yRange[0];
    }
    if (x.value > yRange[1]) {
      x.value = yRange[1];
    }
  };

  if (options.wrapper) {
    const { width, height, top } = useElementBounding(wrapper);
    const { width: w } = useElementSize(el);
    watch([x, y], () => {
      doDrag(x, y, w, width, height, top);
    });
  }

  watch(isDragging, (v) => {
    if (v) {
      document.body.classList.add(IS_DRAGGING_CLASS_NAME);
    } else {
      document.body.classList.remove(IS_DRAGGING_CLASS_NAME);
    }
  });

  return {
    x,
    y,
    isDragging
  };
}
