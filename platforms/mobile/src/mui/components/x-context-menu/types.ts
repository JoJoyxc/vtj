import type { ExtractPropTypes } from 'vue';
import { contextMenuProps } from './props';

export interface ContextMenuItem {
  title: string;
  icon?: string;
  disabled?: boolean;
  click?: () => void;
}

export type contextMenuPosition = { x: number; y: number };

export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>;
