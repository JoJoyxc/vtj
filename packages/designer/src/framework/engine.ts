import {
  createApp,
  onMounted,
  unref,
  inject,
  type InjectionKey,
  type MaybeRef,
  type App
} from 'vue';
import { logger, ProjectModel, Service, type ProjectSchema } from '@vtj/core';
import { SkeletonWrapper, type SkeletonWrapperInstance } from '../wrappers';
import { depsManager } from '../managers';

export const engineKey: InjectionKey<Engine> = Symbol('VtjEngine');

export interface EngineOptions {
  container: MaybeRef<HTMLElement | undefined>;
  service: Service;
  project: ProjectSchema;
}

export class Engine {
  public app?: App;
  public skeleton?: SkeletonWrapperInstance | null;
  public container: MaybeRef<HTMLElement | undefined>;
  public service: Service;
  public project: ProjectModel;
  constructor(options: EngineOptions) {
    const { container, service, project } = options;
    this.container = container;
    this.service = service;
    const deps = depsManager.get();
    console.log(deps);
    this.project = new ProjectModel(project);
    onMounted(this.render.bind(this));
  }
  private render() {
    const container = unref(this.container);
    if (container) {
      const app = createApp(SkeletonWrapper);
      app.provide(engineKey, this);
      app.mount(container);
      this.app = app;
    } else {
      logger.warn('VTJEngine constructor param [ container ] is undefined');
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
