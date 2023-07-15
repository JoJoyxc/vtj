import {
  onUnmounted,
  computed,
  ref,
  createApp,
  nextTick,
  ComputedRef,
  Ref
} from 'vue';
import {
  Designer,
  IHelper,
  EVENT_VIEWPORT_MODE_CHANGE,
  EVENT_OUTLINE_SELECTED,
  EVENT_OUTLINE_HOVER,
  EVENT_OUTLINE_CHANGE,
  EVENT_NODE_CHANGE,
  EVENT_DESIGNER_ACTIVE_CHANGE,
  emitter,
  ComponentSlot
} from '../core';
import SlotPicker from '../views/shared/SlotPicker.vue';

import { Node, Block } from '../models';

import { delay } from '../utils';

export type ViewportMode = 'pc' | 'pad' | 'mobile';

const getPosition = (rect: DOMRect, leftPriority: boolean = true) => {
  const { top, height, width, left } = rect || {};
  if (height > 100 && width > 200) {
    return 'inner';
  }

  let h, v;
  v = top > 30 ? 'top' : 'bottom';
  h = leftPriority ? 'left' : left < 300 && width < 300 ? 'left' : 'right';

  return [h, v].join('-');
};

const getDropRect = (helpr: IHelper) => {
  const { rect, type } = helpr;
  const { left, width, top, height } = rect;
  const newRect = { left, width, top, height };
  switch (type) {
    case 'left':
      newRect.left = 0;
      newRect.width = 0;
      break;
    case 'right':
      newRect.left = newRect.left + newRect.width - 4;
      newRect.width = 0;
      break;
    case 'bottom':
      newRect.top = newRect.top + newRect.height - 4;
      newRect.height = 0;
      break;
    case 'top':
      newRect.height = 0;
      break;
  }
  return newRect;
};

const getComputedHelper = (name: string, helpr: IHelper | null) => {
  if (!helpr) return null;
  const { left, top, width, height } =
    name === 'dropping' ? getDropRect(helpr) : helpr.rect;
  const style = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`
  };
  return {
    ...helpr,
    style,
    position: getPosition(helpr.rect, name !== 'selected')
  };
};

export interface IUseDesigner {
  designer: Designer;
  hover: ComputedRef<ReturnType<typeof getComputedHelper>>;
  dropping: ComputedRef<ReturnType<typeof getComputedHelper>>;
  selected: ComputedRef<ReturnType<typeof getComputedHelper>>;
  onAction: (e: any) => void;
  viewportMode: Ref<ViewportMode>;
}

let __designer__: IUseDesigner;

export function useDesigner(designer?: Designer) {
  if (__designer__ || !designer) return __designer__;

  onUnmounted(() => {
    designer.dispose();
  });

  const hover = computed(() =>
    getComputedHelper('hover', designer.hover.value)
  );
  const dropping = computed(() =>
    getComputedHelper('dropping', designer.dropping.value)
  );
  const selected = computed(() =>
    getComputedHelper('selected', designer.selected.value)
  );

  const onAction = (e: any) => {
    const { type, node } = e;
    if (!node) {
      designer.selected.value = null;
      designer.hover.value = null;
      return;
    }
    switch (type) {
      case 'remove':
        designer.selected.value = null;
      case 'copy':
        designer.setSelected(node);
        break;
      case 'move':
        designer.setSelected(node);
        break;
      case 'hover':
        designer.setHover(node);
        break;
      case 'selected':
        designer.setSelected(node);
        break;
    }
  };

  const viewportMode = ref<ViewportMode>('pc');

  emitter.on(EVENT_VIEWPORT_MODE_CHANGE, (mode) => {
    viewportMode.value = mode as ViewportMode;
  });

  emitter.on(EVENT_OUTLINE_SELECTED, (node) => {
    designer.setSelected(node as Node | Block);
  });

  emitter.on(EVENT_OUTLINE_HOVER, (node) => {
    designer.setHover(node as Node | Block);
  });

  emitter.on(EVENT_OUTLINE_CHANGE, (file) => {
    designer.hover.value = null;
    designer.selected.value = null;
  });

  emitter.on(EVENT_DESIGNER_ACTIVE_CHANGE, async (active) => {
    await delay(100);
    designer.hover.value = null;
    if (active && selected.value) {
      designer.setSelected(selected.value.node);
    }
  });

  emitter.on(EVENT_NODE_CHANGE, async () => {
    await delay(100);
    if (selected.value) {
      designer.setSelected(selected.value.node);
    }
  });

  __designer__ = {
    designer,
    hover,
    dropping,
    selected,
    onAction,
    viewportMode
  };

  return __designer__;
}

export function createSlotDialog(slots: ComponentSlot[]) {
  return new Promise<ComponentSlot | undefined>((resolve, reject) => {
    const dialog = createApp(SlotPicker, {
      slots: slots,
      onClose: () => {
        dialog.unmount();
        reject(undefined);
      },
      onPick: (slot: ComponentSlot) => {
        dialog.unmount();
        resolve(slot);
      }
    });
    dialog.mount(document.createElement('div'));
  });
}
