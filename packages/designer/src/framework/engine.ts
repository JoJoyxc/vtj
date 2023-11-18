import {
  createApp,
  onMounted,
  unref,
  inject,
  type InjectionKey,
  type MaybeRef,
  type App
} from 'vue';
import { logger } from '@vtj/core';
import { SkeletonWrapper, type SkeletonWrapperInstance } from '../wrappers';

export const engineKey: InjectionKey<Engine> = Symbol('VtjEngine');

export class Engine {
  public app?: App;
  public skeleton?: SkeletonWrapperInstance | null;
  constructor(public container: MaybeRef<HTMLElement | undefined>) {
    onMounted(this.render.bind(this));
  }
  private render() {
    const container = unref(this.container);
    if (container) {
      const app = createApp(SkeletonWrapper);
      app.provide(engineKey, this);
      app.mount(container);
      this.app = app;
    }
  }
}

export function useEngine() {
  const engine = inject(engineKey, null);
  if (!engine) {
    logger.error('VTJEngine is not exist');
  }
  return engine as Engine;
}
