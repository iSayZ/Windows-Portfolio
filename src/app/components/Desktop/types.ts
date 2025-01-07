export interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type SortMethod = 'name' | 'date' | 'size';
export type IconSize = 'small' | 'medium' | 'large';

export interface ContextMenuPosition {
  x: number;
  y: number;
}
