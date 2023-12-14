import { type Ref, type ShallowRef, shallowRef, unref, nextTick } from 'vue';
import { type Context } from '@vtj/renderer';
import {
  type Dependencie,
  type DropPosition,
  type MaterialDescription,
  type NodeSchema,
  NodeModel,
  BlockModel,
  isBlock,
  emitter,
  EVENT_PROJECT_ACTIVED
} from '@vtj/core';
import { type Engine } from './engine';

export interface VtjElement extends HTMLElement {
  __vtj__?: string;
  __context__?: Context;
}

export interface DesignHelper {
  model: NodeModel | BlockModel;
  el: VtjElement;
  rect: DOMRect;
  type?: DropPosition;
  path?: Array<NodeModel | BlockModel>;
}

export class Designer {
  private proxied: Record<string, any> = {};
  public document: Document | null = null;
  public contentWindow: Window | null = null;
  public hover: ShallowRef<DesignHelper | null> = shallowRef(null);
  public dropping: ShallowRef<DesignHelper | null> = shallowRef(null);
  public selected: ShallowRef<DesignHelper | null> = shallowRef(null);
  public dragging: MaterialDescription | null = null;
  constructor(
    public engine: Engine,
    public iframe: Ref<HTMLIFrameElement | undefined>,
    public dependencies: Ref<Dependencie[]>
  ) {
    engine.ready(() => {
      engine.simulator?.init(iframe, dependencies);
      const cw = engine.simulator?.contentWindow;
      if (cw) {
        this.contentWindow = cw;
        this.document = cw.document;
        this.bindEvents(cw, this.document);
      }
    });
  }

  private bind(func: (...args: any[]) => void, name: string) {
    let proxy = this.proxied[name];
    if (!proxy) {
      proxy = func.bind(this);
      this.proxied[name] = proxy;
    }
    return proxy;
  }

  private bindEvents(cw: Window, doc: Document) {
    doc.addEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.addEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    cw.addEventListener('resize', this.bind(this.onViewChange, 'onViewChange'));
    doc.addEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('dragover', this.bind(this.onDragOver, 'onDragOver'));
    doc.addEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.addEventListener('click', this.bind(this.onSelected, 'onSelected'));
    emitter.on(
      EVENT_PROJECT_ACTIVED,
      this.bind(this.onActiveChange, 'onActiveChange')
    );
  }

  private unbindEvents(cw: Window, doc: Document) {
    doc.removeEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.removeEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    cw.removeEventListener(
      'resize',
      this.bind(this.onViewChange, 'onViewChange')
    );
    doc.removeEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener(
      'dragover',
      this.bind(this.onDragOver, 'onDragOver')
    );
    doc.removeEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.removeEventListener('click', this.bind(this.onSelected, 'onSelected'));
    emitter.off(
      EVENT_PROJECT_ACTIVED,
      this.bind(this.onActiveChange, 'onActiveChange')
    );
  }

  private onMouseOver(e: MouseEvent) {
    this.hover.value = this.getHelper(e);
  }
  private onViewChange() {
    this.updateRect();
  }

  private onLeave(_e: MouseEvent) {
    this.hover.value = null;
    this.dropping.value = null;
  }

  private onActiveChange() {
    this.hover.value = null;
    this.dropping.value = null;
    this.selected.value = null;
  }

  private async onDrop(e: DragEvent) {
    e.preventDefault();
    const { engine, dragging, dropping } = this;
    const current = engine.project?.current;
    const helper = this.getHelper(e);
    if (!current || !dragging || !dropping.value || !helper) return;
    if (!(await this.allowDrop(helper.model))) return;
    const dsl = this.createNodeDsl(dragging);
    const node = new NodeModel(dsl);
    const type = dropping.value.type;
    // todo: slot
    current.addNode(
      node,
      isBlock(helper.model) ? undefined : helper.model,
      type
    );
  }

  private onSelected(e: MouseEvent) {
    this.selected.value = this.getHelper(e);
  }

  private async onDragOver(e: DragEvent) {
    const helper = this.getHelper(e);
    if (!helper) return;
    const { model } = helper;
    if (model && (await this.allowDrop(model))) {
      e.preventDefault();
      this.dropping.value = helper;
    } else {
      this.dropping.value = null;
    }
  }

  private isVtjElement(el: EventTarget | HTMLElement): el is VtjElement {
    return !!(el as any).__vtj__;
  }

  private findVtjElement(targets: HTMLElement[] | EventTarget[]) {
    return targets.find((el) => this.isVtjElement(el)) as VtjElement | null;
  }

  private getNodeByElement(el: VtjElement): NodeModel | null {
    const id = el.__vtj__ ?? '';
    return NodeModel.nodes[id] || null;
  }

  private getDropType(rect: DOMRect, x: number, y: number) {
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

  private getNodePath(
    path: EventTarget[] | HTMLElement[] = []
  ): Array<BlockModel | NodeModel> {
    const elements = path.filter((n) => this.isVtjElement(n));
    const root = this.engine.project?.current as BlockModel;
    const nodePath = elements.map(
      (n) => this.getNodeByElement(n as VtjElement) as NodeModel
    );
    return [...nodePath, root];
  }

  private createNodeDsl(desc: MaterialDescription) {
    const { name, snippet = {}, from } = desc;
    const dsl: NodeSchema = {
      ...snippet,
      name,
      from: from || desc.package
    };
    return dsl;
  }

  private getElmenetByModel(model: NodeModel | BlockModel) {
    if (!this.document || !model) return null;
    if (isBlock(model)) return this.document.body;
    // todo: 需要性能优化，从渲染器 refs中获取
    const list: Array<HTMLElement> = Array.from(
      this.document.querySelectorAll('*')
    );
    return list.find(
      (el) => (el as VtjElement).__vtj__ === model.id
    ) as VtjElement;
  }

  private findPathByNode(node: NodeModel): Array<NodeModel | BlockModel> {
    const path: Array<NodeModel | BlockModel> = [node];
    let current: NodeModel = node;
    while (current.parent && current.parent !== current) {
      current = current.parent as NodeModel;
      if (current !== node) {
        path.unshift(current);
      }
    }
    const root = this.engine.project?.current as BlockModel;
    path.unshift(root);
    return path.reverse();
  }

  getHelper(e: DragEvent | MouseEvent): DesignHelper | null {
    const targets = e.composedPath() || [];
    const el = this.findVtjElement(targets) || this.document?.body;
    if (!el) return null;
    const model = this.getNodeByElement(el) || this.engine.project?.current;
    if (!model) return null;
    const rect = el.getBoundingClientRect();
    const type = this.getDropType(rect, e.clientX, e.clientY);
    const path = this.getNodePath(targets);
    return {
      el,
      model,
      rect,
      type,
      path
    };
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

  setDragging(desc: MaterialDescription | null) {
    this.dragging = desc;
  }

  async setHover(model: NodeModel | BlockModel | null) {
    await nextTick();
    if (model) {
      const el = this.getElmenetByModel(model);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const path = isBlock(model) ? [] : this.findPathByNode(model);
      this.hover.value = {
        el,
        model,
        rect,
        type: 'inner',
        path
      };
    } else {
      this.hover.value = null;
    }
  }

  async setSelected(model: NodeModel | BlockModel | null) {
    await nextTick();
    if (model) {
      const el = this.getElmenetByModel(model);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const path = isBlock(model) ? [] : this.findPathByNode(model);
      this.selected.value = {
        el,
        model,
        rect,
        type: 'inner',
        path
      };
    } else {
      this.selected.value = null;
    }
  }

  async allowDrop(target: NodeModel | BlockModel) {
    const { dragging, engine } = this;
    const current = engine.project?.current;
    if (!dragging || !current) return false;
    if (isBlock(target)) return true;
    const componentMap = engine.assets.componentMap;
    const targetDesc =
      (await engine.assets.getBlockMaterial(target.from)) ||
      componentMap.get(target.name);
    if (!targetDesc) return false;
    const { parentIncludes = true, name } = dragging;
    const { childIncludes = true } = targetDesc;

    const mathParent =
      parentIncludes === true ||
      (Array.isArray(parentIncludes) && parentIncludes.includes(target.name));

    const matchChild =
      childIncludes === true ||
      (Array.isArray(childIncludes) && childIncludes.includes(name));

    return mathParent && matchChild;
  }

  dispose() {
    const { contentWindow: cw, document: doc } = this;
    if (cw && doc) {
      this.unbindEvents(cw, doc);
    }
    this.engine.simulator?.dispose();
    this.document = null;
    this.contentWindow = null;
  }
}
