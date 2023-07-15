import { ComputedRef, ref, computed, reactive, watch } from 'vue';
import { Node } from '../models';
import {
  Assets,
  NodeEventsSchema,
  ComponentDescription,
  FromSchema
} from '../core';
import { MOUSE_EVENT_LIST, KEYBOARD_EVENT_LIST } from '../constants';
import { isBlock } from '../utils';

export function useNodeEvents(node: ComputedRef<Node>, assets: Assets) {
  const blockDescription = ref<ComponentDescription>();

  watch(
    node,
    async (v) => {
      if (v) {
        blockDescription.value =
          (await assets.getBlockDescription(v.from)) || undefined;
      } else {
        blockDescription.value = undefined;
      }
    },
    { immediate: true }
  );

  const mouseEventList = computed(() => {
    if (isBlock(node.value)) return [];
    const events: NodeEventsSchema = node.value?.events || {};
    return MOUSE_EVENT_LIST.map((name) => {
      return {
        name,
        event: events[name]
      };
    });
  });

  const keyboardEventList = computed(() => {
    if (isBlock(node.value)) return [];
    const events: NodeEventsSchema = node.value?.events || {};
    return KEYBOARD_EVENT_LIST.map((name) => {
      return {
        name,
        event: events[name]
      };
    });
  });

  const componentEventList = computed(() => {
    if (isBlock(node.value)) return [];
    const events: NodeEventsSchema = node.value?.events || {};
    const defineEvents =
      blockDescription.value?.events ||
      assets.componentMap[node.value.name]?.events ||
      [];
    return defineEvents.map((item) => {
      const name = typeof item === 'string' ? item : item.name;
      return {
        name: name,
        event: events[name]
      };
    });
  });

  return {
    mouseEventList,
    keyboardEventList,
    componentEventList
  };
}
