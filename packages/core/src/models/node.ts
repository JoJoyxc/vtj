import { uid } from '@vtj/base';
import { emitter } from '../tools';
import type {
  NodeSchema,
  NodeFrom,
  NodeSlot,
  JSExpression,
  JSONValue,
  JSFunction,
  NodeEvent,
  NodeDirective
} from '../protocols';
import { PropModel } from './prop';
import { EventModel } from './event';
import { DirectiveModel } from './directive';

/**
 * 节点发生改变时触发的事件名称
 */
export const EVENT_NODE_CHANGE = 'EVENT_NODE_CHANGE';

/**
 * 节点模型
 */
export class NodeModel {
  /**
   * 标记
   */
  public readonly __VTJ_NODE__: boolean = true;

  /**
   * 锁定
   */
  public lock: boolean = false;

  /**
   * 记录所有节点的实例
   */
  static nodes: Record<string, NodeModel> = {};
  /**
   * 节点唯一标识
   */
  readonly id: string;
  /**
   * 名称，即组件的名称或html的标签名
   */
  readonly name: string;
  /**
   * 组件来源
   */
  readonly from: NodeFrom;
  /**
   * 是否不可见
   */
  public invisible: boolean = false;
  /**
   * 子节点
   */
  public children: NodeModel[] | string | JSExpression = '';

  /**
   * 放置在父组件的插槽
   */
  public slot?: NodeSlot;

  /**
   * 节点属性
   */
  public props: Record<string, PropModel> = {};

  /**
   * 节点事件
   */
  public events: Record<string, EventModel> = {};

  /**
   * 指令
   */
  public directives: DirectiveModel[] = [];

  public disposed: boolean = false;

  constructor(
    private schema: NodeSchema,
    public parent: NodeModel | null = null
  ) {
    const { id = uid(), name, from = '' } = schema;
    this.id = id;
    this.name = name;
    this.from = from;
    this.update(schema, true);
    NodeModel.nodes[this.id] = this;
  }
  /**
   * 更新节点属性
   * @param schema
   * @param silent 是否静默，静默更新即不触发事件
   */
  update(schema: Partial<NodeSchema>, silent: boolean = false) {
    Object.assign(this.schema, schema);
    const {
      invisible = false,
      children = [],
      slot,
      props = {},
      events = {},
      directives = []
    } = this.schema;
    this.invisible = invisible;
    this.setChildren(children, silent);
    this.setSlot(slot, silent);
    this.props = PropModel.parse(props);
    this.events = EventModel.parse(events);
    this.directives = DirectiveModel.parse(directives);
  }

  setChildren(
    children: NodeSchema[] | string | JSExpression = '',
    silent: boolean = false
  ) {
    if (Array.isArray(children)) {
      this.children = children.map((dsl) => new NodeModel(dsl, this));
    } else {
      this.children = children;
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 设置节点放置的插槽
   * @param slot
   * @param silent
   */
  setSlot(slot?: string | NodeSlot, silent: boolean = false) {
    this.slot = typeof slot === 'string' ? { name: slot, params: [] } : slot;
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  setProp(
    name: string,
    value: JSONValue | JSExpression | JSFunction,
    defaultValue?: JSONValue | JSExpression | JSFunction
  ) {
    const prop = this.props[name];
    if (prop) {
      prop.setValue(value);
    } else {
      this.props[name] = new PropModel(name, value, defaultValue);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeProp(name: string) {
    delete this.props[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  getPropValue(name: string) {
    const prop = this.props[name];
    if (!prop) return undefined;
    return prop.getValue();
  }

  setEvent(scheam: NodeEvent) {
    const event = this.events[scheam.name];
    if (event) {
      event.update(scheam);
    } else {
      this.events[scheam.name] = new EventModel(scheam);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeEvent(name: string) {
    delete this.events[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  setDirective(scheam: NodeDirective) {
    const index = this.directives.findIndex((n) => n.id === scheam.id);
    if (index >= 0) {
      this.directives.splice(index, 1, new DirectiveModel(scheam));
    } else {
      this.directives.push(new DirectiveModel(scheam));
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeDirective(dirctive: DirectiveModel) {
    const index = this.directives.findIndex((n) => n.id === dirctive.id);
    if (index >= 0) {
      this.directives.splice(index, 1);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  removeChild(node: NodeModel) {
    const { children, disposed } = this;
    if (disposed) return;
    if (!Array.isArray(children)) return;
    const index = children.findIndex((n) => n === node);
    node.parent = null;
    children.splice(index, 1);
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  appendChild(node: NodeModel) {
    const { children, disposed } = this;
    if (disposed) return;
    node.parent = this;
    if (!Array.isArray(children)) {
      this.children = [node];
    } else {
      children.push(node);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  toDsl(): NodeSchema {
    const {
      id,
      name,
      from,
      invisible,
      slot,
      children,
      props,
      directives,
      events
    } = this;
    const nodes = Array.isArray(children)
      ? children.filter((n) => !n.invisible).map((n) => n.toDsl())
      : children;

    return {
      ...this.schema,
      id,
      name,
      from,
      invisible,
      slot,
      children: nodes,
      props: PropModel.toDsl(props),
      directives: DirectiveModel.toDsl(directives),
      events: EventModel.toDsl(events)
    };
  }

  dispose() {
    const { children, disposed } = this;
    if (disposed) return;
    if (Array.isArray(children)) {
      children.forEach((node) => node.dispose());
    }

    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = null;
    this.disposed = true;
    delete NodeModel.nodes[this.id];
  }
}
