import { type Ref, computed } from 'vue';
import { type Dependencie } from '@vtj/core';
import { useEngine, type DesignHelper } from '../../framework';

export function useDesigner(
  iframe: Ref<HTMLIFrameElement | undefined>,
  dependencies: Ref<Dependencie[]>
) {
  const engine = useEngine();

  engine.simulator.init(iframe, dependencies);

  const designer = computed(() => engine.simulator.designer.value);

  const hover = computed(() =>
    getComputedHelper('hover', designer.value?.hover.value)
  );

  const dropping = computed(() =>
    getComputedHelper('dropping', designer.value?.dropping.value)
  );

  const selected = computed(() =>
    getComputedHelper('selected', designer.value?.selected.value)
  );

  return {
    designer,
    dropping,
    hover,
    selected
  };
}

function getPosition(rect: DOMRect, leftPriority: boolean = true) {
  const { top, height, width, left } = rect || {};
  if (height > 100 && width > 200) {
    return 'inner';
  }

  let h, v;
  v = top > 30 ? 'top' : 'bottom';
  h = leftPriority ? 'left' : left < 300 && width < 300 ? 'left' : 'right';

  return [h, v].join('-');
}

function getDropRect(helpr: DesignHelper) {
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
}

function getComputedHelper(name: string, helpr?: DesignHelper | null) {
  if (!helpr) return null;
  const { left, top, width, height } =
    name === 'dropping' ? getDropRect(helpr) : helpr.rect;
  const leftOffset = left < 0 ? -left : 0;
  const topOffset = top < 0 ? -top : 0;
  const style: Record<string, any> = {
    left: `${left < 0 ? 0 : left}px`,
    top: `${top < 0 ? 0 : top}px`,
    width: `${width - leftOffset}px`,
    height: `${height - topOffset}px`,
    visibility: width || height ? 'visible' : 'hidden'
  };
  return {
    ...helpr,
    style,
    position: getPosition(helpr.rect, name !== 'selected')
  };
}
