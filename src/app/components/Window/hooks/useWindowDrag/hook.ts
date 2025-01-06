import { useCallback, useState } from 'react';
import { DesktopRef, useWindowsStore } from '../../store/windowsStore';
import { DragState } from './types';

export const useWindowDrag = (windowId: string, desktopRef: DesktopRef) => {
  const { updatePosition, bringToFront, windows } = useWindowsStore();
  const window = windows.find((w) => w.id === windowId);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!window || !desktopRef.current) return;

      // Only if you click on the title bar
      if (!(e.target as HTMLElement).closest('.window-titlebar')) return;

      bringToFront(windowId);

      setDragState({
        isDragging: true,
        initialX: e.clientX,
        initialY: e.clientY,
        originalX: window.position.x,
        originalY: window.position.y,
      });
    },
    [window, bringToFront, windowId],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState || !window || !desktopRef.current) return;

      const deltaX = e.clientX - dragState.initialX;
      const deltaY = e.clientY - dragState.initialY;

      const rect = desktopRef.current.getBoundingClientRect();
      const newX = dragState.originalX + deltaX;
      const newY = dragState.originalY + deltaY;

      // Constrain position within desktop limits
      updatePosition(windowId, {
        x: Math.max(0, Math.min(newX, rect.width - window.size.width)),
        y: Math.max(0, Math.min(newY, rect.height - window.size.height)),
      });
    },
    [dragState, window, updatePosition, windowId, desktopRef],
  );

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging: !!dragState,
  };
};
