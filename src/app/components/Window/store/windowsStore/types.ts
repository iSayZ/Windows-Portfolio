import { RefObject } from 'react';
import { Window, Position, Size } from '../../types';

export interface WindowsState {
  windows: Window[];
  activeWindowId: string | null;
  maxZIndex: number;
}

export interface WindowsActions {
  addWindow: (window: Omit<Window, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, position: Position) => void;
  updateSize: (id: string, size: Size) => void;
  toggleMaximize: (id: string, desktopRef?: RefObject<HTMLDivElement | null>) => void;
}

export type WindowsStore = WindowsState & WindowsActions;