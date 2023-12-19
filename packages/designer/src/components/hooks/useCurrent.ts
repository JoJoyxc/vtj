import { type Ref, ref } from 'vue';
import {
  EVENT_PROJECT_ACTIVED,
  EVENT_BLOCK_CHANGE,
  BlockModel,
  emitter
} from '@vtj/core';
import { Context } from '@vtj/renderer';
import { useEngine } from '../../framework';

export function useCurrent() {
  const engine = useEngine();
  const current: Ref<BlockModel | null> = ref(null);
  const isEmpty = ref(true);
  const context: Ref<Context | null> = ref(null);

  emitter.on(EVENT_PROJECT_ACTIVED, (e) => {
    current.value = e.model.current;
    isEmpty.value = !current.value || current.value.nodes.length === 0;
    context.value = engine.simulator.renderer?.context || null;
  });

  emitter.on(EVENT_BLOCK_CHANGE, (block: any) => {
    isEmpty.value = (block as BlockModel).nodes.length === 0;
    context.value = engine.simulator.renderer?.context || null;
  });

  engine.ready(() => {
    current.value = engine.project?.current ?? null;
    isEmpty.value = !current.value || current.value.nodes.length === 0;
    context.value = engine.simulator.renderer?.context || null;
  });

  return {
    engine,
    current,
    isEmpty,
    context
  };
}
