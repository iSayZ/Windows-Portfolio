import { RefObject } from 'react';
import { Window, Position, Size } from '../../types';

export type DesktopRef = RefObject<HTMLDivElement>;

export interface WindowsState {
  windows: Window[];
  desktopRef: DesktopRef | null;
  activeWindowId: string | null;
  maxZIndex: number;
}

export interface WindowsActions {
  setDesktopRef: (ref: DesktopRef) => void;
  addWindow: (window: Omit<Window, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, position: Position) => void;
  updateSize: (id: string, size: Size) => void;
  toggleMaximize: (id: string, desktopRef?: DesktopRef) => void;
}

export type WindowsStore = WindowsState & WindowsActions;
