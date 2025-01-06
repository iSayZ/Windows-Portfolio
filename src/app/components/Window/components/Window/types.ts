import { Window as WindowType } from '../../types';
import { DesktopRef } from '../../store';

export interface WindowProps {
  window: WindowType;
  desktopRef: DesktopRef;
}

export interface WindowStyles {
  position: 'absolute';
  left: number;
  top: number;
  width: number;
  height: number;
}

export type ResizeHandlePosition =
  | 'nw'
  | 'ne'
  | 'sw'
  | 'se'
  | 'n'
  | 's'
  | 'w'
  | 'e';
