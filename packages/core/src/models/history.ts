import { uid, cloneDeep } from '@vtj/base';
import type { HistorySchema, HistoryItem, BlockSchema } from '../protocols';
import { emitter, logger } from '../tools';

export interface HistoryModelOptions {
  max: number;
}

export const EVENT_HISTORY_CHANGE = 'EVENT_HISTORY_CHANGE';
export const EVENT_HISTORY_LOAD = 'EVENT_HISTORY_LOAD';

export class HistoryModel {
  private options: HistoryModelOptions = { max: 50 };
  index: number = -1;
  id: string;
  items: HistoryItem[];
  constructor(
    schema: HistorySchema,
    options: Partial<HistoryModelOptions> = {}
  ) {
    Object.assign(this.options, options);
    const { id, items = [] } = schema;
    this.id = id;
    this.items = items;
  }

  toDsl(): HistorySchema {
    const { id, items } = this;
    return {
      id,
      items
    };
  }
  /**
   * 获取历史项
   * @param id
   * @returns
   */
  get(id: string) {
    return this.items.find((n) => n.id === id);
  }

  /**
   * 增加历史记录
   * @param dsl
   * @param silent
   */
  add(dsl: BlockSchema, silent: boolean = false) {
    const { max } = this.options;
    const item: HistoryItem = {
      id: uid(),
      label: new Date().toLocaleString(),
      dsl: cloneDeep(dsl)
    };
    this.items.unshift(item);
    if (this.items.length > max) {
      this.items.splice(max);
    }
    this.index = -1;
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, this);
    }
  }
  /**
   * 删除历史记录
   * @param id
   * @param silent
   */
  remove(id: string, silent: boolean = false) {
    const index = this.items.findIndex((n) => n.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
      if (index === this.index) {
        this.index = -1;
      } else if (this.index >= this.items.length) {
        this.index = this.items.length - 1;
      }
    } else {
      logger.warn(`not found HistoryItem for id: ${id} `);
    }
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, this);
    }
  }

  forward(silent: boolean = false) {
    const { index, items } = this;
    if (index < 0) return;
    --this.index;
    const item = items[this.index];
    if (item && !silent) {
      emitter.emit(EVENT_HISTORY_LOAD, item);
    }
  }

  backward(silent: boolean = false) {
    const { index, items } = this;
    if (index >= items.length - 1) return;
    if (index < 0) {
      this.index = 0;
    }
    ++this.index;
    const item = items[this.index];
    if (item && !silent) {
      emitter.emit(EVENT_HISTORY_LOAD, item);
    }
  }

  load(id: string, silent: boolean = false) {
    const index = this.items.findIndex((n) => n.id === id);
    if (index >= 0) {
      this.index = index;
      if (!silent) {
        emitter.emit(EVENT_HISTORY_LOAD, this.items[index]);
      }
    }
  }
  clear(silent: boolean = false) {
    this.index = -1;
    this.items = [];
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, this);
    }
  }
}
