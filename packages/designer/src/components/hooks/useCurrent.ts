import { type Ref, ref } from 'vue';
import {
  EVENT_PROJECT_ACTIVED,
  EVENT_BLOCK_CHANGE,
  BlockModel,
  emitter
} from '@vtj/core';
import { useEngine } from '../../framework';

export function useCurrent() {
  const engine = useEngine();
  const current: Ref<BlockModel | null> = ref(null);
  const isEmpty = ref(true);

  emitter.on(EVENT_PROJECT_ACTIVED, (e) => {
    current.value = e.model.current;
    isEmpty.value = !current.value || current.value.nodes.length === 0;
  });

  emitter.on(EVENT_BLOCK_CHANGE, (block: any) => {
    isEmpty.value = (block as BlockModel).nodes.length === 0;
  });

  engine.ready(() => {
    current.value = engine.project?.current ?? null;
    isEmpty.value = !current.value || current.value.nodes.length === 0;
  });

  return {
    engine,
    current,
    isEmpty
  };
}
