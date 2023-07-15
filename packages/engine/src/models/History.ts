import { shallowReactive, ShallowReactive, toRaw } from 'vue';
import {
  emitter,
  EVENT_HISTORY_GO,
  EVENT_HISTORY_BACK,
  EVENT_HISTORY_CHANGE,
  EVENT_HISTORY_PUSH,
  EVENT_HISTORY_REMOVE,
  EVENT_HISTORY_SAVE,
  BlockSchema,
  HistoryScheam,
  HistoryItemSchema,
  HistoryItemParams
} from '../core';

import { uid, cloneDeep } from '../utils';

export interface HistoryOptions {
  history: HistoryScheam;
  max?: number;
}

export class History {
  index: number = -1;
  list: ShallowReactive<HistoryItemSchema[]> = [];
  max: number;
  blockId: string;
  constructor(options: HistoryOptions) {
    const { history, max = 50 } = options;
    this.blockId = history.blockId;
    this.max = max;
    this.refresh(history.items || []);
  }

  refresh(list: HistoryItemSchema[]) {
    this.index = -1;
    this.list = shallowReactive(list);
  }

  go() {
    const { index, list } = this;
    if (index < 0) return;
    --this.index;
    const item = list[this.index];
    if (item) {
      emitter.emit(EVENT_HISTORY_GO, item);
      emitter.emit(EVENT_HISTORY_CHANGE, item);
    }
  }

  back() {
    const { index, list } = this;
    if (index >= list.length - 1) return;
    if (index < 0) {
      this.index = 0;
    }
    ++this.index;
    const item = list[this.index];
    if (item) {
      emitter.emit(EVENT_HISTORY_BACK, item);
      emitter.emit(EVENT_HISTORY_CHANGE, item);
    }
  }

  push(block: BlockSchema) {
    const { max, list, blockId } = this;
    const item: HistoryItemSchema = {
      id: uid(),
      title: new Date().toLocaleString(),
      block: cloneDeep(block)
    };
    list.unshift(item);
    if (list.length > max) {
      this.list = list.splice(max);
    }
    this.index = -1;
    emitter.emit(EVENT_HISTORY_PUSH, { blockId, item } as HistoryItemParams);
    emitter.emit(EVENT_HISTORY_SAVE, this.toDsl());
  }

  load(id: string) {
    const index = this.list.findIndex((n) => n.id === id);
    if (index >= 0) {
      this.index = index;
      emitter.emit(EVENT_HISTORY_CHANGE, this.list[index]);
    }
  }

  remove(id: string) {
    const index = this.list.findIndex((n) => n.id === id);
    const { list, blockId } = this;
    if (index > -1) {
      const items = list.splice(index, 1);
      if (index === this.index) {
        this.index = -1;
      } else if (this.index >= list.length) {
        this.index = list.length - 1;
      }
      emitter.emit(EVENT_HISTORY_REMOVE, {
        blockId,
        item: items[0]
      } as HistoryItemParams);
      emitter.emit(EVENT_HISTORY_SAVE, this.toDsl());
    }
  }

  toDsl(): HistoryScheam {
    const { blockId, list } = this;
    return {
      blockId,
      items: toRaw(list)
    };
  }
}
