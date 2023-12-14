import { ref, type Ref } from 'vue';
import {
  EVENT_PROJECT_ACTIVED,
  EVENT_BLOCK_CHANGE,
  ProjectModel,
  type BlockModel,
  emitter
} from '@vtj/core';
import { useEngine } from '../../framework';

export function useCurrent() {
  const engine = useEngine();
  const current: Ref<BlockModel | null> = ref(null);
  const isEmpty = ref(true);

  emitter.on(EVENT_PROJECT_ACTIVED, (project) => {
    current.value = (project as ProjectModel).current;
  });

  emitter.on(EVENT_BLOCK_CHANGE, (block: any) => {
    isEmpty.value = (block as BlockModel).nodes.length === 0;
  });

  return {
    engine,
    current,
    isEmpty
  };
}
