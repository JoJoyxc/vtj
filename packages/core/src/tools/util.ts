import { BlockModel, NodeModel } from '../models';
import { type BlockSchema } from '../protocols';

export function isBlock(value: unknown): value is BlockModel {
  return value instanceof BlockModel;
}

export function isNode(value: unknown): value is BlockModel {
  return value instanceof NodeModel;
}

export function isBlockSchema(value: unknown): value is BlockSchema {
  return !!(value as any).__VTJ_BLOCK__;
}
