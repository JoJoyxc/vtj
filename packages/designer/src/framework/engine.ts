import {
  createApp,
  onMounted,
  unref,
  inject,
  shallowReactive,
  type ShallowReactive,
  type InjectionKey,
  type MaybeRef,
  type App
} from 'vue';
import { logger, ProjectModel, Service, type ProjectSchema } from '@vtj/core';
import { SkeletonWrapper, type SkeletonWrapperInstance } from '../wrappers';
import { depsManager } from '../managers';
import { Simulator } from './simulator';
import { Assets } from './assets';

export const engineKey: InjectionKey<ShallowReactive<Engine>> =
  Symbol('VtjEngine');

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
  public simulator: Simulator;
  public assets: Assets;
  public project?: ProjectModel;
  private listeners: Array<() => void> = [];
  private isReady: boolean = false;
  constructor(options: EngineOptions) {
    const { container, service, project } = options;
    this.container = container;
    this.service = service;
    this.assets = new Assets();
    this.simulator = new Simulator(this.assets);
    this.init(project);
    onMounted(this.render.bind(this));
  }
  private async init(project: ProjectSchema) {
    const dsl = await this.service.init(project).catch((e) => {
      logger.warn('VTJEngine service init fail.', e);
      return null;
    });
    if (dsl) {
      dsl.dependencies = depsManager.merge(dsl.dependencies || []);
      this.project = new ProjectModel(dsl);
      this.isReady = true;
      this.emitListener();
    }
  }
  private render() {
    const container = unref(this.container);
    if (container) {
      const app = createApp(SkeletonWrapper);
      app.provide(engineKey, shallowReactive(this));
      app.mount(container);
      this.app = app;
    } else {
      logger.warn('VTJEngine constructor param [ container ] is undefined');
    }
  }
  private emitListener() {
    for (const listener of this.listeners) {
      listener();
    }
    this.listeners = [];
  }

  ready(callback: () => void) {
    if (this.isReady) {
      callback();
    } else {
      this.listeners.push(callback);
    }
  }
}

export function useEngine() {
  const engine = inject(engineKey, null);
  if (!engine) {
    logger.error('VTJEngine is not exist');
  }
  return engine as ShallowReactive<Engine>;
}
