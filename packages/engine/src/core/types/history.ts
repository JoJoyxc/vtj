import { BlockSchema } from './block';

export interface HistoryItemSchema {
  id: string;
  title: string;
  block: BlockSchema;
}

export interface HistoryScheam {
  blockId: string;
  items: HistoryItemSchema[];
}

export interface HistoryItemParams {
  blockId: string;
  item: HistoryItemSchema;
}
