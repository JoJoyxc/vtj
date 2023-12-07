import { ref } from 'vue';
import {
  type Dependencie,
  type ProjectModel,
  EVENT_PROJECT_DEPS_CHANGE,
  emitter
} from '@vtj/core';

export function useDeps(deps: Dependencie[] = []) {
  const dependencies = ref(deps);
  emitter.on(EVENT_PROJECT_DEPS_CHANGE, (project) => {
    dependencies.value = (project as ProjectModel).dependencies.slice(0);
  });
  return {
    dependencies
  };
}
