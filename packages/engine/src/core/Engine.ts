import {
  createApp,
  Ref,
  unref,
  onMounted,
  App,
  InjectionKey,
  onUnmounted,
  markRaw,
  shallowReactive,
  ShallowReactive,
  watch
} from 'vue';
import { EngineView } from '../views';
import { Skeleton } from './Skeleton';
import { Config, ProjectSchema } from './types';
import { Service, StorageService } from './services';
import { Assets } from './Assets';
import { Project } from '../models';
import { Simulator } from './Simulator';
import { mergeConfig, presetConfig } from '../config';
import {
  emitter,
  Emitter,
  EVENT_PROJECT_UPDATE,
  EVENT_FILE_CREATE,
  EVENT_FILE_UPDATE,
  EVENT_FILE_REMOVE,
  EVENT_NODE_CHANGE
} from './emitter';

export interface EngineOptions {
  config?: Config;
  service?: Service;
  project?: ProjectSchema;
  globals?: Record<string, any>;
}

// 引擎类实例 inject key
export const ENGINE_KEY: InjectionKey<Engine> = Symbol('VtjEngine');

export class Engine {
  // 引擎配置
  public config: Config;
  // 引擎骨架
  public skeleton: Skeleton;
  // Vue 应用实例
  public app: App;
  // 数据持久化服务
  public service: Service;

  // 事件管理器
  public emitter: Emitter = emitter;

  // 项目实例
  public project: ShallowReactive<Project>;

  // 资产实例
  public assets: Assets;

  // 模拟器
  public simulator: Simulator;

  constructor(el?: Ref<HTMLElement | undefined>, options: EngineOptions = {}) {
    const {
      config = {},
      service = new StorageService(),
      project,
      globals = {}
    } = options;
    this.service = service;
    this.config = mergeConfig(presetConfig, config);
    this.skeleton = new Skeleton(this.config.widgets || []);
    this.project = shallowReactive<Project>(
      new Project(project, this.config.dependencies)
    );
    this.assets = new Assets(this.service, this.project);
    this.simulator = new Simulator({
      project: this.project,
      assets: this.assets,
      service: this.service,
      globals
    });
    this.app = createApp(EngineView, { engine: markRaw(this) });
    this.bindListeners();
    this.loadProject(this.project.toDsl());
    onMounted(() => {
      this.app.mount(unref(el) ?? document.body);
    });
    onUnmounted(() => {
      this.dispose();
    });
  }

  async loadProject(schema?: ProjectSchema) {
    const { service, project } = this;
    const dsl = await service.getProject(schema || { name: '未命名项目' });
    project.load(dsl);
  }

  bindListeners() {
    const { emitter, service } = this;
    emitter.on(EVENT_PROJECT_UPDATE, (dsl) => service.updateProject(dsl));
    emitter.on(EVENT_FILE_CREATE, (dsl) => service.createFile(dsl));
    emitter.on(EVENT_FILE_UPDATE, (dsl) => service.updateFile(dsl));
    emitter.on(EVENT_FILE_REMOVE, (id) => service.removeFile(id));
    emitter.on(EVENT_NODE_CHANGE, () => {
      const current = this.project.current.value;
      if (current) {
        service.updateFile(current.toDsl());
      }
    });
  }

  dispose() {
    this.emitter.all.clear();
    this.skeleton.dispose();
    this.assets.dispose();
    this.simulator.dispose();
    this.app.unmount();
  }
}
