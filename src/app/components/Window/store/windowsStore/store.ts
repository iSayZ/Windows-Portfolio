import { create } from 'zustand';
import { WindowsStore } from './types';
import { createActions } from './actions';

export const useWindowsStore = create<WindowsStore>((set) => ({
  windows: [],
  desktopRef: null,
  activeWindowId: null,
  maxZIndex: 0,
  ...createActions(set),
}));
