import { Ref, ShallowRef, shallowRef, watch, unref } from 'vue';
import { Engine } from './Engine';
import {
  emitter,
  EVENT_SIMULATOR_READY,
  EVENT_COMPONENETS_DRAG_START,
  EVENT_COMPONENETS_DRAG_END,
  EVENT_HISTORY_CHANGE
} from './emitter';
import {
  ComponentDescription,
  NodeSchema,
  DropHelperType,
  ComponentSlot
} from './types';
import { Node, Block } from '../models';
import { isBlock } from '../utils';
import { ElMessage } from 'element-plus';

export interface VtjElement extends HTMLElement {
  __vtj__?: string;
}

export interface IHelper {
  node: Node | Block;
  el: HTMLElement;
  rect: DOMRect;
  type: DropHelperType;
  path: Array<Block | Node>;
}

export class Designer {
  public draggingComponent: ComponentDescription | null = null;
  public document: Document | null = null;
  private proxied: Record<string, any> = {};
  public hover: ShallowRef<IHelper | null> = shallowRef(null);
  public dropping: ShallowRef<IHelper | null> = shallowRef(null);
  public selected: ShallowRef<IHelper | null> = shallowRef(null);
  constructor(
    public engine: Engine,
    public iframe: Ref<HTMLIFrameElement | undefined>,
    public slotPicker: (
      slots: ComponentSlot[]
    ) => Promise<ComponentSlot | undefined>
  ) {
    engine.simulator.init(iframe);

    emitter.on(EVENT_SIMULATOR_READY, (doc) => {
      this.bindEvents(doc as Document);
    });

    emitter.on(EVENT_COMPONENETS_DRAG_START, (item) => {
      this.draggingComponent = item as ComponentDescription;
    });

    emitter.on(EVENT_COMPONENETS_DRAG_END, () => {
      this.draggingComponent = null;
    });

    emitter.on(EVENT_HISTORY_CHANGE, () => {
      this.selected.value = null;
      this.hover.value = null;
    });

    watch(engine.project.current, () => {
      this.selected.value = null;
      this.hover.value = null;
    });
  }
  dispose() {
    this.engine.simulator.dispose();
    emitter.off(EVENT_SIMULATOR_READY);
    emitter.off(EVENT_COMPONENETS_DRAG_START);
    emitter.off(EVENT_COMPONENETS_DRAG_END);
    if (this.document) {
      this.unbindEvents(this.document);
      this.document = null;
    }
  }

  getNodeByElement(el: VtjElement): Node | null {
    const id = el.__vtj__ ?? '';
    return Node.nodes[id] || null;
  }

  getElementByNode(node: Node | Block): VtjElement | null {
    if (!this.document || !node) return null;
    if (isBlock(node)) return this.document.body;
    // todo: 需要性能优化，从渲染器 refs中获取
    const list: Array<HTMLElement> = Array.from(
      this.document.querySelectorAll('*')
    );
    return list.find(
      (el) => (el as VtjElement).__vtj__ === node.id
    ) as VtjElement;
  }

  getDropType(rect: DOMRect, x: number, y: number) {
    const { left, top, width, height } = rect;
    if (x >= left && x <= left + width * 0.2) {
      return 'left';
    }
    if (x >= left + width * 0.8 && x <= left + width) {
      return 'right';
    }
    if (y >= top && y <= top + height * 0.2) {
      return 'top';
    }
    if (y >= top + height * 0.8 && y <= top + height) {
      return 'bottom';
    }
    return 'inner';
  }

  getElementAndNode(e: DragEvent | MouseEvent) {
    const { engine, document } = this;
    const targets = e.composedPath();
    const el = this.findVtjElement(targets) || document?.body;
    const node = el
      ? this.getNodeByElement(el) || engine.project.current.value
      : null;
    return {
      el,
      node,
      path: targets
    };
  }

  onDragOver(e: DragEvent) {
    const { el, node } = this.getElementAndNode(e);
    if (node && el && this.allowDrop(node)) {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      this.dropping.value = {
        el,
        node,
        rect,
        type: this.getDropType(rect, e.clientX, e.clientY),
        path: []
      };
    } else {
      this.dropping.value = null;
    }
  }

  onMouseOver(e: MouseEvent) {
    const { el, node } = this.getElementAndNode(e);
    if (el && node) {
      const rect = el.getBoundingClientRect();
      this.hover.value = {
        el,
        node,
        rect,
        type: 'inner', // hover 无需 type
        path: []
      };
    }
  }

  onLeave(e: MouseEvent) {
    this.hover.value = null;
    this.dropping.value = null;
  }

  createNodeDsl(info: ComponentDescription) {
    const { name, snippet = {}, from } = info;
    const dsl: NodeSchema = {
      ...snippet,
      name,
      from: from || info.package
    };
    return dsl;
  }

  async getDropSlot(to: Block | Node | null) {
    if (!to) return;
    const { engine, slotPicker } = this;
    const componentMap = engine.assets.componentMap;
    const targetDesc =
      (await engine.assets.getBlockDescription((to as Node).from)) ||
      componentMap[to.name];
    if (!targetDesc?.slots) return;
    const slots: ComponentSlot[] = (targetDesc?.slots || ['default']).map(
      (n) => {
        if (typeof n === 'string') {
          return {
            name: n,
            params: []
          };
        } else {
          return {
            name: n.name,
            params: n.params || []
          };
        }
      }
    );
    if (slots.length === 0) {
      return undefined;
    }
    if (slots.length === 1) {
      return slots[0];
    }

    const slot = await slotPicker(slots).catch((e) => undefined);
    /**
     * 当只有一个插槽，名称是default，并且没有任何参数，可以省略不指定插槽名
     */
    if (
      slot &&
      slot.name === 'default' &&
      (!slot.params || slot.params?.length === 0)
    ) {
      return undefined;
    }
    return slot;
  }

  async onDrop(e: DragEvent) {
    e.preventDefault();
    const { engine, draggingComponent, dropping } = this;

    const root = engine.project.current.value;
    if (!root || !draggingComponent || !dropping.value) return;
    const { el, node: to } = this.getElementAndNode(e);
    if (!el || !to) return;
    if (!this.allowDrop(to)) return;
    const dsl = this.createNodeDsl(draggingComponent);
    const node = new Node(dsl);
    const type = dropping.value.type;
    node.slot = await this.getDropSlot(type === 'inner' ? to : to.parent);
    if (isBlock(to)) {
      root.appendChild(node);
    } else {
      root.appendChild(node, to, type);
    }
  }

  onSelected(e: MouseEvent) {
    const { el, node, path } = this.getElementAndNode(e);
    if (el && node) {
      const rect = el.getBoundingClientRect();
      this.selected.value = {
        el,
        node,
        rect,
        path: this.getNodePath(path),
        type: this.getDropType(rect, e.clientX, e.clientY)
      };
    }
  }

  onViewChange() {
    this.updateRect();
  }

  updateRect() {
    const selected = unref(this.selected);
    const hover = unref(this.hover);

    if (selected) {
      const rect = selected.el.getBoundingClientRect();
      this.selected.value = {
        ...selected,
        rect
      };
    }

    if (hover) {
      const rect = hover.el.getBoundingClientRect();
      this.hover.value = {
        ...hover,
        rect
      };
    }
  }

  getNodePath(path: EventTarget[] | HTMLElement[]): Array<Block | Node> {
    const elements = path.filter(
      (n) => this.isVtjElement(n) && this.isCurrentContext(n)
    );
    const nodes: Array<Block | Node> = elements.map(
      (n) => this.getNodeByElement(n as VtjElement) as Node
    );
    const root = this.engine.project.current.value;
    if (root) {
      nodes.push(root);
    }
    return nodes;
  }

  isVtjElement(el: EventTarget | HTMLElement): el is VtjElement {
    return !!(el as any).__vtj__;
  }

  isCurrentContext(el: EventTarget | HTMLElement) {
    const blockId = this.engine.project.current.value?.id;
    const contextId = (el as any).__context__?.__id;
    return blockId === contextId;
  }

  findVtjElement(targets: HTMLElement[] | EventTarget[]) {
    return targets.find(
      (el) => this.isVtjElement(el) && this.isCurrentContext(el)
    ) as VtjElement | null;
  }

  bind(func: (...args: any[]) => void, name: string) {
    let proxy = this.proxied[name];
    if (!proxy) {
      proxy = func.bind(this);
      this.proxied[name] = proxy;
    }
    return proxy;
  }

  private bindEvents(doc: Document) {
    if (this.document) {
      this.unbindEvents(this.document);
    }
    const window = this.engine.simulator.contentWindow;
    doc.addEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.addEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('dragover', this.bind(this.onDragOver, 'onDragOver'));
    doc.addEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.addEventListener('click', this.bind(this.onSelected, 'onSelected'));
    doc.addEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    window?.addEventListener(
      'resize',
      this.bind(this.onViewChange, 'onViewChange')
    );

    this.document = doc;
  }

  private unbindEvents(doc: Document) {
    const window = this.engine.simulator.contentWindow;
    doc.removeEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.removeEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener(
      'dragover',
      this.bind(this.onDragOver, 'onDragOver')
    );
    doc.removeEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.removeEventListener('click', this.bind(this.onSelected, 'onSelected'));
    doc.removeEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    window?.removeEventListener(
      'resize',
      this.bind(this.onViewChange, 'onViewChange')
    );
    this.document = null;
  }

  allowDrop(target: Node | Block) {
    const { draggingComponent, engine } = this;
    if (!draggingComponent) return true;
    const current = engine.project.current.value;
    return (
      current && current.allowDrop(draggingComponent, target, engine.assets)
    );
  }

  setHover(node: Node | Block) {
    const el = this.getElementByNode(node);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    this.hover.value = {
      el,
      node,
      rect,
      type: 'inner',
      path: []
    };
  }

  setSelected(node: Node | Block) {
    if (!this.document) return;
    const el =
      this.getElementByNode(node) || this.document.createElement('span');
    const rect = el.getBoundingClientRect();
    this.selected.value = {
      el,
      node,
      rect,
      path: this.findPathByNode(node),
      type: 'inner'
    };
  }

  findPathByNode(node: Node | Block): Array<Node | Block> {
    const path: Array<Node | Block> = [node];
    if (isBlock(node)) return path;
    let current: Node = node;
    while (current.parent && current.parent !== current) {
      current = current.parent as Node;
      if (current !== node) {
        path.unshift(current);
      }
    }
    return path.reverse();
  }
}
