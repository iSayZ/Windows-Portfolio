import { RefObject } from 'react';
import { Window as WindowType } from '../../types';

export interface WindowProps {
  window: WindowType;
  desktopRef: RefObject<HTMLDivElement>;
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
