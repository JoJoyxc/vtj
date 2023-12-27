import {
  createApp,
  onMounted,
  onUnmounted,
  unref,
  inject,
  shallowReactive,
  shallowRef,
  ref,
  nextTick,
  triggerRef,
  type ShallowReactive,
  type InjectionKey,
  type MaybeRef,
  type App,
  type Ref,
  type ShallowRef
} from 'vue';
import {
  logger,
  ProjectModel,
  BlockModel,
  HistoryModel,
  Service,
  emitter,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE,
  EVENT_PROJECT_BLOCKS_CHANGE,
  EVENT_PROJECT_CHANGE,
  EVENT_PROJECT_ACTIVED,
  EVENT_HISTORY_CHANGE,
  EVENT_HISTORY_LOAD,
  type Emitter,
  type ProjectSchema,
  type BlockFile,
  type ProjectModelEvent,
  type PageFile,
  type HistoryItem
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
  public simulator: Simulator;
  public emitter: Emitter = emitter;
  public project: ShallowRef<ProjectModel | null> = shallowRef(null);
  public current: Ref<BlockModel | null> = ref(null);
  public context: Ref<Context | null> = ref(null);
  public isEmptyCurrent: Ref<boolean> = ref(false);
  public history: ShallowRef<HistoryModel | null> = shallowRef(null);
  constructor(options: EngineOptions) {
    const { container, service, project, globals = {} } = options;
    this.container = container;
    this.service = service;
    this.assets = new Assets(this.service);
    this.simulator = new Simulator({
      engine: this,
      globals
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
      this.project.value = new ProjectModel(dsl);
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
    emitter.on(EVENT_PROJECT_CHANGE, (e) => this.saveProject(e));
    emitter.on(EVENT_PROJECT_BLOCKS_CHANGE, (e) => this.saveBlockFile(e));
    emitter.on(EVENT_PROJECT_ACTIVED, (e) => this.activeFile(e));
    emitter.on(EVENT_BLOCK_CHANGE, (e) => this.changeFile(e));
    emitter.on(EVENT_NODE_CHANGE, () => this.changeCurrentFile());
    emitter.on(EVENT_HISTORY_CHANGE, (e) => this.saveHistory(e));
    emitter.on(EVENT_HISTORY_LOAD, (e) => this.loadHistory(e));
  }

  private async activeFile(e: ProjectModelEvent) {
    await nextTick();
    const dsl = e.model.currentFile?.dsl;
    if (dsl) {
      const block = new BlockModel(dsl);
      this.updateCurrent(block);
      this.initHistory(block);
      triggerRef(this.project);
    }
  }

  private async changeFile(e: BlockModel) {
    await nextTick();
    const dsl = e.toDsl();
    this.service.saveFile(dsl);
    this.updateCurrent(e);
    this.history.value?.add(dsl);
    triggerRef(this.history);
  }

  private changeCurrentFile() {
    this.saveCurrentFile();
    if (this.current.value) {
      this.history.value?.add(this.current.value.toDsl());
      triggerRef(this.history);
    }
  }

  private async updateCurrent(
    block: BlockModel | null,
    isTrigger: boolean = true
  ) {
    this.current.value = block;
    await nextTick();
    this.context.value = this.simulator.renderer?.context || null;
    this.isEmptyCurrent.value = this.current.value?.nodes.length === 0;
    if (isTrigger) {
      // triggerRef(this.current);
      triggerRef(this.context);
    }
  }

  private async saveProject(e: ProjectModelEvent) {
    const project = e.model;
    const dsl = project.toDsl();
    await this.service.saveProject(dsl);
    triggerRef(this.project);
  }

  private async saveBlockFile(e: ProjectModelEvent) {
    const type = e.type;
    if (type === 'create') {
      const block = e.data as BlockFile | PageFile;
      block.dsl && (await this.service.saveFile(block.dsl));
    }

    if (type === 'update') {
      const block = e.data as BlockFile;
      const dsl = await this.service.getFile(block.id);
      if (dsl) {
        dsl.name = block.name;
        await this.service.saveFile(dsl);
      }
    }

    if (type === 'delete') {
      const id = e.data as string;
      await this.service.removeFile(id);
    }
    triggerRef(this.project);
  }

  private saveCurrentFile() {
    const current = this.current.value;
    if (current) {
      this.updateCurrent(current);
      this.service.saveFile(current.toDsl());
    }
  }

  private async initHistory(block: BlockModel | null) {
    if (block) {
      const dsl = await this.service.getHistory(block.id);
      this.history.value = dsl ? new HistoryModel(dsl) : null;
    } else {
      this.history.value = null;
    }
  }

  private async saveHistory(e: HistoryModel) {
    const dsl = e.toDsl();
    await this.service.saveHistory(dsl);
    triggerRef(this.history);
  }

  private async loadHistory(e: HistoryItem) {
    const block = new BlockModel(e.dsl);
    await this.updateCurrent(block);
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
