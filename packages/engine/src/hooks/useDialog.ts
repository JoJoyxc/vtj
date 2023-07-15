import { getCurrentInstance, Ref, watch, ref, computed } from 'vue';
import { useDraggable, Position } from '@vueuse/core';
export function useDialog(panel: Ref) {
  const rect = ref();
  const dialog = ref();
  const header = ref();
  const x = ref(0);
  const y = ref(0);

  const getCenter = () => {
    const { innerWidth, innerHeight } = window;
    const { left = 0, top = 0, width = 0, height = 0 } = rect.value;
    const x = Math.max((innerWidth - width) / 2, 0);
    const y = Math.max((innerHeight - height) / 2, 0);
    return {
      x,
      y
    };
  };

  const setPosition = (postion: Position) => {
    const { innerWidth, innerHeight } = window;
    const { width = 0, height = 0 } = dialog.value.getBoundingClientRect();
    x.value = Math.max(0, postion.x);
    if (postion.x > innerWidth - width) {
      x.value = Math.min(postion.x, innerWidth - width);
    }
    y.value = Math.max(0, postion.y);
    if (postion.y > innerHeight - height) {
      y.value = Math.min(postion.y, innerHeight - height);
    }
  };

  watch(panel, (v) => {
    const el = v?.panel as HTMLElement;
    if (el) {
      dialog.value = el;
      header.value = v?.header;
      rect.value = el.getBoundingClientRect();
      const center = getCenter();
      x.value = center.x;
      y.value = center.y;
      useDraggable(dialog, {
        initialValue: getCenter(),
        handle: header,
        onMove: (postion) => {
          setPosition(postion);
        }
      });
    }
  });

  return {
    x,
    y
  };
}
