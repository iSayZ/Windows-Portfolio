import { WindowsState, WindowsActions } from './types';
import { RefObject } from 'react';

export const createActions = (
  set: (fn: (state: WindowsState) => Partial<WindowsState>) => void,
): WindowsActions => ({
  setDesktopRef: (ref) =>
    set((state) => ({
      desktopRef: ref,
    })),

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
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })),

  updateSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
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
});
