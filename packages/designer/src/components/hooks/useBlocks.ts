import { shallowRef, type ShallowRef } from 'vue';
import {
  type BlockFile,
  type ProjectModel,
  EVENT_PROJECT_BLOCKS_CHANGE,
  emitter
} from '@vtj/core';
import { useEngine } from '../../framework';

export function useBlocks() {
  const engine = useEngine();
  const blocks: ShallowRef<BlockFile[]> = shallowRef([]);
  engine.ready(() => {
    blocks.value = engine.project?.blocks ?? [];
  });

  emitter.on(EVENT_PROJECT_BLOCKS_CHANGE, (project) => {
    blocks.value = (project as ProjectModel).blocks.slice(0);
  });
  return {
    engine,
    blocks
  };
}
