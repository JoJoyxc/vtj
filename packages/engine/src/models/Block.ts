import { uid, isBlock } from '../utils';
import {
  BlockSchema,
  InjectSchema,
  StateSchema,
  LifeCyclesSchema,
  MethodsSchema,
  ComputedSchema,
  WatchSchema,
  DefineProps,
  ComponentsSchema,
  ComponentDescription,
  UtilsSchema,
  emitter,
  EVENT_NODE_CHANGE,
  DropHelperType,
  Assets,
  JSONValue,
  JSExpression,
  JSFunction,
  DefinePropSchema,
  DataSourceSchema
} from '../core';
import { Node } from './Node';
import type { Context } from '../renderer';

const normalAttrs = [
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

export class Block {
  public readonly __VTJ_BLOCK__: boolean = true;
  readonly id: string;
  public name: string = '';
  public title: string = '';
  public inject: InjectSchema[] = [];
  public state: StateSchema = {};
  public lifeCycles: LifeCyclesSchema = {};
  public methods: MethodsSchema = {};
  public computed: ComputedSchema = {};
  public watch: WatchSchema[] = [];
  public css: string = '';
  public props: DefineProps = [];
  public emits: string[] = [];
  public slots: string[] = [];
  public transform: Record<string, string> = {};
  public dataSources: Record<string, DataSourceSchema> = {};
  public children: Node[] = [];
  public lock: boolean = false;
  public invisible: boolean = false;
  public disposed: boolean = false;
  public parent = null;
  public root = null;
  // 运行时上下问
  public runtimeContext?: Context;
  constructor(schema: BlockSchema) {
    const { id } = schema;
    this.id = id || uid();
    this.init(schema);
  }

  init(schema: BlockSchema) {
    for (const key of normalAttrs) {
      const value = schema[key as keyof BlockSchema];
      if (value) {
        (this as any)[key] = value;
      }
    }
    const { children = [] } = schema;
    this.children = children.map((n) => new Node(n, this));
  }

  dispose() {
    this.children.map((n) => n.dispose());
    this.runtimeContext = undefined;
    this.disposed = true;
  }

  toDsl() {
    const { __VTJ_BLOCK__, id, children } = this;
    const attrs = normalAttrs.reduce((result, current) => {
      result[current] = (this as any)[current];
      return result;
    }, {} as Record<string, any>);

    return {
      ...attrs,
      __VTJ_BLOCK__,
      id,
      children: children.map((n) => n.toDsl())
    } as BlockSchema;
  }

  appendChild(node: Node, to?: Node | null, type?: DropHelperType) {
    if (to) {
      if (type === 'left' || type === 'top') {
        to.insertBefore(node);
      } else if (type === 'right' || type === 'bottom') {
        to.insertAfter(node);
      } else {
        to.appendChild(node);
      }
    } else {
      node.parent = this;
      node.root = this;
      this.children.push(node);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  removeChild(node: Node) {
    if (node.parent === this) {
      const index = this.children.findIndex(
        (n) => n.id === node.id || n === node
      );
      if (index > -1) {
        node.parent = null;
        node.root = null;
        this.children.splice(index, 1);
        emitter.emit(EVENT_NODE_CHANGE, this);
      }
    } else {
      if (node.parent) {
        node.parent.removeChild(node);
      }
    }
  }

  async allowDrop(
    component: ComponentDescription,
    target: Node | Block,
    assets: Assets
  ) {
    if (isBlock(target)) return true;
    const componentMap = assets.componentMap;
    const targetDesc =
      (await assets.getBlockDescription(target.from)) ||
      componentMap[target.name];
    if (!targetDesc || !component) return true;

    const { parentIncludes = true, name } = component;
    const { childIncludes = true } = targetDesc;

    const mathParent =
      parentIncludes === true ||
      (Array.isArray(parentIncludes) && parentIncludes.includes(target.name));

    const matchChild =
      childIncludes === true ||
      (Array.isArray(childIncludes) && childIncludes.includes(name));

    return mathParent && matchChild;
  }

  move(node: Node, target: Node | Block, type: DropHelperType) {
    this.removeChild(node);
    if (isBlock(target)) {
      target.appendChild(node);
    } else {
      this.appendChild(node, target, type);
    }
  }

  setState(name: string, value: JSONValue | JSExpression | JSFunction) {
    this.state[name] = value;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeState(name: string) {
    delete this.state[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  setComputed(name: string, value: JSFunction) {
    this.computed[name] = value;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeComputed(name: string) {
    delete this.computed[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  setMethods(name: string, value: JSFunction) {
    this.methods[name] = value;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeMethods(name: string) {
    delete this.methods[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  setLifeCycles(name: string, value: JSFunction) {
    this.lifeCycles[name] = value;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeLifeCycles(name: string) {
    delete this.lifeCycles[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  setWatch(watch: WatchSchema) {
    watch.id = watch.id || uid();
    const index = this.watch.findIndex(
      (n) => (n.id && n.id === watch.id) || n === watch
    );
    if (index > -1) {
      this.watch.splice(index, 1, watch);
    } else {
      this.watch.push(watch);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeWatch(watch: WatchSchema) {
    const index = this.watch.findIndex(
      (n) => (n.id && n.id === watch.id) || n === watch
    );
    if (index > -1) {
      this.watch.splice(index, 1);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setCss(content: string) {
    this.css = content;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  setProp(prop: DefinePropSchema) {
    const index = this.props.findIndex((n) =>
      typeof n === 'string' ? n === prop.name : n.name === prop.name
    );
    if (index > -1) {
      this.props.splice(index, 1, prop);
    } else {
      this.props.push(prop);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeProp(prop: DefinePropSchema) {
    const index = this.props.findIndex((n) =>
      typeof n === 'string' ? n === prop.name : n.name === prop.name
    );
    if (index > -1) {
      this.props.splice(index, 1);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setEmit(emit: string) {
    const index = this.emits.findIndex((n) => n === emit);
    if (index > -1) {
      this.emits.splice(index, 1, emit);
    } else {
      this.emits.push(emit);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeEmit(emit: string) {
    const index = this.emits.findIndex((n) => n === emit);
    if (index > -1) {
      this.emits.splice(index, 1);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setSlot(slot: string) {
    const index = this.slots.findIndex((n) => n === slot);
    if (index > -1) {
      this.slots.splice(index, 1, slot);
    } else {
      this.slots.push(slot);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeSlot(slot: string) {
    const index = this.slots.findIndex((n) => n === slot);
    if (index > -1) {
      this.slots.splice(index, 1);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setInject(inject: InjectSchema) {
    const index = this.inject.findIndex((n) => n.name === inject.name);
    if (index > -1) {
      this.inject.splice(index, 1, inject);
    } else {
      this.inject.push(inject);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeInject(inject: InjectSchema) {
    const index = this.inject.findIndex((n) => n.name === inject.name);
    if (index > -1) {
      this.inject.splice(index, 1);
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  setDataSource(source: DataSourceSchema) {
    this.dataSources[source.name] = source;
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeDataSource(name: string) {
    delete this.dataSources[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
}
