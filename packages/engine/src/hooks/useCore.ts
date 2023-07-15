import { inject } from 'vue';
import { ENGINE_KEY, Engine } from '../core';

export function useCore() {
  const engine = inject(ENGINE_KEY) as Engine;

  return {
    engine,
    regions: engine.skeleton.regions,
    config: engine.config,
    emitter: engine.emitter,
    project: engine.project,
    assets: engine.assets
  };
}
