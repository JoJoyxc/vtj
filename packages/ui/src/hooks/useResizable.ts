import { Ref, ref, watch, effectScope, onUnmounted } from 'vue';
import {
  useEventListener,
  useElementBounding,
  UseElementBoundingOptions
} from '@vueuse/core';
import { IS_RESIZING_CLASS_NAME } from '../';


export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>;
export type UseResizableDir = 'n' | 's' | 'w' | 'e';

export interface UseResizableOptions {
  edge?: number;
  dirs?: UseResizableDir[];
  onStart?: (bounding: UseElementBoundingReturn) => void;
  onEnd?: (bounding: UseElementBoundingReturn) => void;
  onResizing?: (bounding: UseElementBoundingReturn) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  boundingOptions?: UseElementBoundingOptions;
}

function getDirection(
  options: UseResizableOptions,
  e: MouseEvent,
  bounding: UseElementBoundingReturn
) {
  const { dirs = ['n', 's', 'w', 'e'], edge = 5 } = options;
  let dir = '';
  const { left, top, width, height } = bounding;
  const { clientX, clientY } = e;
  if (
    dirs.includes('n') &&
    clientY > top.value - edge &&
    clientY < top.value + edge
  ) {
    dir += 'n';
  } else if (
    dirs.includes('s') &&
    clientY < top.value + height.value + edge &&
    clientY > top.value + height.value - edge
  ) {
    dir += 's';
  }
  if (
    dirs.includes('w') &&
    clientX > left.value - edge &&
    clientX < left.value + edge
  ) {
    dir += 'w';
  } else if (
    dirs.includes('e') &&
    clientX < left.value + width.value + edge &&
    clientX > left.value + width.value - edge
  ) {
    dir += 'e';
  }
  return dir;
}

function resize(
  options: UseResizableOptions,
  e: MouseEvent,
  dir: string,
  bounding: UseElementBoundingReturn
) {
  if (!dir) return;
  const { minWidth = 0, minHeight = 0, maxWidth, maxHeight } = options;
  const { clientX, clientY } = e;
  const { left, top, width, height } = bounding;
  if (dir.includes('e')) {
    width.value = Math.max(clientX - left.value, minWidth);
  }
  if (dir.includes('w')) {
    width.value = Math.max(width.value + left.value - clientX, minWidth);
    left.value = clientX;
  }
  if (dir.includes('s')) {
    height.value = Math.max(clientY - top.value, minHeight);
  }
  if (dir.includes('n')) {
    height.value = Math.max(height.value + top.value - clientY, minHeight);
    top.value = clientY;
  }
  if (maxWidth) {
    width.value = Math.min(width.value, maxWidth);
  }
  if (maxHeight) {
    height.value = Math.min(height.value, maxHeight);
  }
  options.onResizing && options.onResizing(bounding);
}

export function useResizable(
  el: Ref<HTMLElement | undefined | null>,
  options: UseResizableOptions | null = {}
) {
  const opts: UseResizableOptions = {
    edge: 5,
    minWidth: 50,
    minHeight: 50,
    dirs: ['n', 's', 'w', 'e'],
    ...options
  };
  const scope = effectScope();
  const direction = ref('');
  const resizing = ref(false);
  const { onStart, onEnd, boundingOptions } = opts;
  const bounding = useElementBounding(el, boundingOptions);
  const { left, top, width, height, update } = bounding;
  scope.run(() => {
    useEventListener(document, 'mousemove', (e) => {
      if (resizing.value) {
        resize(opts, e, direction.value, bounding);
      } else {
        direction.value = getDirection(opts, e, bounding);
      }
    });

    useEventListener(document, 'mousedown', () => {
      update();
      if (direction.value) {
        resizing.value = true;
        onStart && onStart(bounding);
      }
    });

    useEventListener(document, 'mouseup', () => {
      resizing.value = false;
      direction.value = '';
      onEnd && onEnd(bounding);
      update();
    });

    watch(direction, (v) => {
      const body = document.body;
      body.style.cursor = v ? `${v}-resize` : '';
      if (v) {
        body.classList.add(IS_RESIZING_CLASS_NAME);
      } else {
        body.classList.remove(IS_RESIZING_CLASS_NAME);
      }
    });
  });

  onUnmounted(() => {
    scope.stop();
  });

  return {
    left,
    top,
    width,
    height,
    direction,
    resizing,
    update
  };
}
