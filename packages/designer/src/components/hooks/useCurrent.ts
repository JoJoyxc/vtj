import { ref, type Ref } from 'vue';
import {
  EVENT_PROJECT_ACTIVED,
  ProjectModel,
  type BlockModel,
  emitter
} from '@vtj/core';
import { useEngine } from '../../framework';

export function useCurrent() {
  const engine = useEngine();
  const current: Ref<BlockModel | null> = ref(null);

  emitter.on(EVENT_PROJECT_ACTIVED, (project) => {
    current.value = (project as ProjectModel).current;
  });

  return {
    engine,
    current
  };
}
