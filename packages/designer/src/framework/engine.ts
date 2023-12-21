import {
  createApp,
  onMounted,
  onUnmounted,
  unref,
  inject,
  shallowReactive,
  ref,
  nextTick,
  type ShallowReactive,
  type InjectionKey,
  type MaybeRef,
  type App,
  type Ref
} from 'vue';
import {
  logger,
  ProjectModel,
  BlockModel,
  Service,
  emitter,
  EVENT_PROJECT_CHANGE,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE,
  EVENT_PROJECT_BLOCKS_CHANGE,
  EVENT_PROJECT_PAGES_CHANGE,
  EVENT_PROJECT_ACTIVED,
  type Emitter,
  type ProjectSchema,
  type BlockFile,
  type ProjectModelEvent,
  type PageFile
} from '@vtj/core';
import { Context } from '@vtj/renderer';
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
  globals?: Record<string, any>;
}

export class Engine {
  public app?: App;
  public skeleton?: SkeletonWrapperInstance | null;
  public container: MaybeRef<HTMLElement | undefined>;
  public service: Service;
  public assets: Assets;
  private listeners: Array<() => void> = [];
  private isReady: boolean = false;
  public project?: ProjectModel;
  public simulator: Simulator;
  public emitter: Emitter = emitter;
  public current: Ref<BlockModel | null> = ref(null);
  public context: Ref<Context | null> = ref(null);
  public isEmptyCurrent: Ref<boolean> = ref(false);
  constructor(options: EngineOptions) {
    const { container, service, project, globals = {} } = options;
    this.container = container;
    this.service = service;
    this.assets = new Assets(this.service);
    this.simulator = new Simulator({
      assets: this.assets,
      globals,
      service: this.service
    });
    this.bindEvents();
    this.init(project);
    onMounted(this.render.bind(this));
    onUnmounted(this.dispose.bind(this));
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
      this.emits();
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
  private emits() {
    for (const listener of this.listeners) {
      listener();
    }
    this.listeners = [];
  }

  private bindEvents() {
    emitter.on(EVENT_PROJECT_CHANGE, (e) =>
      this.service.saveProject(e.model.toDsl())
    );
    emitter.on(EVENT_BLOCK_CHANGE, async (e) => {
      await nextTick();
      this.service.saveFile(e.toDsl());
      this.updateCurrent(e);
    });
    emitter.on(EVENT_NODE_CHANGE, () => this.saveCurrentFile());
    emitter.on(EVENT_PROJECT_BLOCKS_CHANGE, (e) => this.saveFile(e));
    emitter.on(EVENT_PROJECT_PAGES_CHANGE, (e) => this.saveFile(e));

    emitter.on(EVENT_PROJECT_ACTIVED, async (e) => {
      await nextTick();
      this.updateCurrent(e.model.current);
    });
  }

  private updateCurrent(block: BlockModel | null) {
    this.current.value = block;
    this.context.value = this.simulator.renderer?.context || null;
    this.isEmptyCurrent.value = this.current.value?.nodes.length === 0;
  }

  private async saveFile(e: ProjectModelEvent) {
    const type = e.type;
    if (type === 'create') {
      const block = e.data as BlockFile | PageFile;
      block.dsl && this.service.saveFile(block.dsl);
    }

    if (type === 'update') {
      const block = e.data as BlockFile;
      const dsl = await this.service.getFile(block.id);
      if (dsl) {
        dsl.name = block.name;
        this.service.saveFile(dsl);
      }
    }

    if (type === 'delete') {
      const id = e.data as string;
      this.service.removeFile(id);
    }
  }

  private saveCurrentFile() {
    const current = this.current.value;
    if (current) {
      this.service.saveFile(current.toDsl());
    }
  }

  ready(callback: () => void) {
    if (this.isReady) {
      callback();
    } else {
      this.listeners.push(callback);
    }
  }

  dispose() {
    this.emitter.all.clear();
    this.simulator.dispose();
    if (this.app) {
      this.app.unmount();
      this.container = undefined;
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
