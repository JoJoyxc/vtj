import { uid } from '@vtj/base';
import type {
  BlockSchema,
  BlockInject,
  BlockState,
  JSFunction,
  BlockWatch,
  BlockProp,
  DataSourceSchema
} from '../protocols';

import { NodeModel } from './node';

/**
 * 区块发生改变时触发的事件名称
 */
export const EVENT_BLOCK_CHANGE = 'EVENT_BLOCK_CHANGE';

export class BlockModel {
  public readonly __VTJ_BLOCK__: boolean = true;
  public readonly id: string;
  public name: string = '';
  public title: string = '';
  public inject: BlockInject[] = [];
  public state: BlockState = {};
  public lifeCycles: Record<string, JSFunction> = {};
  public methods: Record<string, JSFunction> = {};
  public computed: Record<string, JSFunction> = {};
  public watch: BlockWatch[] = [];
  public css: string = '';
  public props: Array<string | BlockProp> = [];
  public emits: string[] = [];
  public slots: string[] = [];
  public transform: Record<string, string> = {};
  public dataSources: Record<string, DataSourceSchema> = {};
  public children: NodeModel[] = [];
  public disposed: boolean = false;

  static normalAttrs: string[] = [
    'name',
    'title',
    'inject',
    'state',
    'lifeCycles',
    'methods',
    'computed',
    'watch',
    'css',
    'props',
    'emits',
    'slots',
    'transform',
    'dataSources'
  ];

  constructor(schema: BlockSchema) {
    const { id } = schema;
    this.id = id || uid();
    this.init(schema);
  }

  init(schema: BlockSchema) {
    for (const key of BlockModel.normalAttrs) {
      const value = schema[key as keyof BlockSchema];
      if (value) {
        (this as any)[key] = value;
      }
    }
    const { children = [] } = schema;
    this.children = children.map((n) => new NodeModel(n));
  }

  toDsl(): BlockSchema {
    const { __VTJ_BLOCK__, id, children } = this;
    const attrs = BlockModel.normalAttrs.reduce(
      (result, current) => {
        result[current] = (this as any)[current];
        return result;
      },
      {} as Record<string, any>
    );

    return {
      ...attrs,
      __VTJ_BLOCK__,
      id,
      children: children.map((n) => n.toDsl())
    } as BlockSchema;
  }

  dispose() {
    this.children.map((n) => n.dispose());
    this.children = [];
    this.disposed = true;
  }
}
