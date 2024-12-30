import { create } from 'zustand';
import { Window, Position, Size } from '../types';
import { RefObject } from 'react';

interface WindowsState {
  windows: Window[];
  activeWindowId: string | null;
  maxZIndex: number;
}

interface WindowsActions {
  addWindow: (window: Omit<Window, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, position: Position) => void;
  updateSize: (id: string, size: Size) => void;
  toggleMaximize: (id: string, desktopRef?: RefObject<HTMLDivElement | null>) => void;
  toggleMinimize: (id: string) => void;
}

export const useWindowsStore = create<WindowsState & WindowsActions>((set) => ({
  windows: [],
  activeWindowId: null,
  maxZIndex: 0,

  addWindow: (window) => 
    set((state) => ({
      windows: [...state.windows, { ...window, zIndex: state.maxZIndex + 1 }],
      activeWindowId: window.id,
      maxZIndex: state.maxZIndex + 1,
    })),

  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  bringToFront: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w,
        zIndex: w.id === id ? state.maxZIndex + 1 : w.zIndex,
      })),
      activeWindowId: id,
      maxZIndex: state.maxZIndex + 1,
    })),

  updatePosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),

  updateSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })),

    toggleMaximize: (id: string, desktopRef?: RefObject<HTMLDivElement | null>) =>
      set((state) => ({
        windows: state.windows.map((w) => {
          if (w.id !== id) return w;
    
          const isCurrentlyMaximized = w.isMaximized;
          const newWindow = { ...w, isMaximized: !isCurrentlyMaximized };
    
          if (!isCurrentlyMaximized && desktopRef?.current) {
            const rect = desktopRef.current.getBoundingClientRect();
            newWindow.previousState = {
              position: { ...w.position },
              size: { ...w.size },
            };
            newWindow.position = { x: 0, y: 0 };
            newWindow.size = { width: rect.width, height: rect.height };
          } else if (w.previousState) {
            newWindow.position = w.previousState.position;
            newWindow.size = w.previousState.size;
          }
    
          return newWindow;
        }),
      })),
    

  toggleMinimize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),
}));