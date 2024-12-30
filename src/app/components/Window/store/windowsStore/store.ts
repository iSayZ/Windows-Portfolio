import { create } from 'zustand';
import { WindowsStore } from './types';
import { createActions } from './actions';

export const useWindowsStore = create<WindowsStore>((set) => ({
  windows: [],
  activeWindowId: null,
  maxZIndex: 0,
  ...createActions(set),
}));