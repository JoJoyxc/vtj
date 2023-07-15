import { uid, isBlock } from '../utils';
import {
  NodeSchema,
  JSExpression,
  NodeSlotSchema,
  JSONValue,
  JSFunction,
  NodeEventSchema,
  NodeFrom
} from '../core';
import { Prop } from './Prop';
import { Directive } from './Directive';
import { Event } from './Event';
import { Block } from './Block';
import { emitter, EVENT_NODE_CHANGE } from '../core';

export class Node {
  public readonly __VTJ_NODE__: boolean = true;
  static nodes: Record<string, Node> = {};
  readonly id: string;
  readonly name: string;
  readonly from: NodeFrom;
  public invisible: boolean = false;
  public props: Record<string, Prop> = {};
  public children: Node[] | string | JSExpression = '';
  public slot?: NodeSlotSchema;
  public directives: Directive[] = [];
  public events: Record<string, Event> = {};
  public disposed: boolean = false;
  public root: Block | null = null;
  public lock: boolean = false;
  constructor(
    public schema: NodeSchema,
    public parent: Node | Block | null = null
  ) {
    const { id, name, from = '' } = schema;
    this.id = id || uid();
    this.name = name;
    this.from = from;
    if (parent) {
      this.root = isBlock(parent) ? parent : parent.root;
    }
    this.update(schema, true);
    Node.nodes[this.id] = this;
  }
  update(schema: NodeSchema, silent: boolean = false) {
    Object.assign(this.schema, schema);
    const { children, slot, props, directives, events } = schema;
    this.invisible = !!schema.invisible;
    this.setChildren(children, silent);
    this.setSlot(slot, silent);
    this.props = Prop.parse(props);
    this.directives = Directive.parse(directives);
    this.events = Event.parse(events);
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
    this.root = null;
    this.disposed = true;
    delete Node.nodes[this.id];
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
      props: Prop.toDsl(props),
      directives: Directive.toDsl(directives),
      events: Event.toDsl(events)
    };
  }
  setChildren(
    children: NodeSchema[] | string | JSExpression = '',
    silent: boolean = false
  ) {
    const { disposed } = this;
    if (disposed) return;
    if (Array.isArray(children)) {
      this.children = children.map((dsl) => new Node(dsl, this));
    } else {
      this.children = children;
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setSlot(slot?: string | NodeSlotSchema, silent: boolean = false) {
    this.slot = typeof slot === 'string' ? { name: slot, params: [] } : slot;
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  setProp(name: string, value: JSONValue | JSExpression | JSFunction) {
    const prop = this.props[name];
    if (prop) {
      prop.setValue(value);
    } else {
      // todo: 处理默认值 defaultValue
      this.props[name] = new Prop(name, value);
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
  setEvent(name: string, value: NodeEventSchema) {
    const event = this.events[name];
    if (event) {
      event.update(value);
    } else {
      this.events[name] = new Event(name, value);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeEvent(name: string) {
    delete this.events[name];
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  setDirective(dirctive: Directive) {
    const index = this.directives.findIndex((n) => n.id === dirctive.id);
    if (index >= 0) {
      this.directives.splice(index, 1, dirctive);
    } else {
      this.directives.push(dirctive);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeDirective(dirctive: Directive) {
    const index = this.directives.findIndex((n) => n.id === dirctive.id);
    if (index >= 0) {
      this.directives.splice(index, 1);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  appendChild(node: Node) {
    const { children, disposed } = this;
    if (disposed) return;
    node.parent = this;
    node.root = this.root;
    if (!Array.isArray(children)) {
      this.children = [node];
    } else {
      children.push(node);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  insertChild(node: Node, index: number = 0) {
    const { children, disposed } = this;
    if (disposed) return;
    node.parent = this;
    node.root = this.root;
    if (!Array.isArray(children)) {
      this.children = [node];
    } else {
      children.splice(index, 0, node);
    }
    emitter.emit(EVENT_NODE_CHANGE, this);
  }
  removeChild(node: Node) {
    const { children, disposed } = this;
    if (disposed) return;
    if (!Array.isArray(children)) return;
    const index = children.findIndex((n) => n === node);
    node.parent = null;
    node.root = null;
    children.splice(index, 1);
    emitter.emit(EVENT_NODE_CHANGE, this);
  }

  insertAfter(node: Node) {
    if (!this.parent) return;
    const brothers = this.parent.children;
    if (Array.isArray(brothers)) {
      node.parent = this.parent;
      node.root = this.root;
      const index = brothers.indexOf(this);
      brothers.splice(index + 1, 0, node);
      emitter.emit(EVENT_NODE_CHANGE, this.parent);
    }
  }

  insertBefore(node: Node) {
    if (!this.parent) return;
    const brothers = this.parent.children;
    if (Array.isArray(brothers)) {
      node.parent = this.parent;
      node.root = this.root;
      const index = brothers.indexOf(this);
      brothers.splice(index, 0, node);
      emitter.emit(EVENT_NODE_CHANGE, this.parent);
    }
  }

  moveNext() {
    const parent = this.parent;
    if (!parent) return;
    const children = parent.children;
    if (Array.isArray(children)) {
      const index = children.indexOf(this);
      if (index > -1 && index < children.length - 1) {
        children.splice(index, 1);
        children.splice(index + 1, 0, this);
        emitter.emit(EVENT_NODE_CHANGE, parent);
      }
    }
  }

  movePrev() {
    const parent = this.parent;
    if (!parent) return;
    const children = parent.children;
    if (Array.isArray(children)) {
      const index = children.indexOf(this);
      if (index > 0) {
        children.splice(index, 1);
        children.splice(index - 1, 0, this);
        emitter.emit(EVENT_NODE_CHANGE, parent);
      }
    }
  }

  copy() {
    if (!this.parent) return;
    const dsl = this.toDsl();
    delete dsl.id;
    const node = new Node(dsl);
    this.insertAfter(node);
    return node;
  }
}
