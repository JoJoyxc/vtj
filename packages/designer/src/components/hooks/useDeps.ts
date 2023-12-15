import { ref, type Ref } from 'vue';
import {
  type Dependencie,
  EVENT_PROJECT_DEPS_CHANGE,
  emitter
} from '@vtj/core';
import { useEngine } from '../../framework';

export function useDeps() {
  const engine = useEngine();
  const dependencies: Ref<Dependencie[]> = ref([]);

  engine.ready(() => {
    dependencies.value = engine.project?.dependencies ?? [];
  });

  emitter.on(EVENT_PROJECT_DEPS_CHANGE, (e) => {
    dependencies.value = e.model.dependencies.slice(0);
  });

  return {
    engine,
    dependencies
  };
}
