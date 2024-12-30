export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface ResizeState {
  isResizing: boolean;
  direction: ResizeDirection;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  initialLeft: number;
  initialTop: number;
}