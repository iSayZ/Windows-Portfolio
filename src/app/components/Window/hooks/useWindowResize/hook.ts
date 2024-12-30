import { RefObject, useCallback, useEffect, useState } from 'react';
import { useWindowsStore } from '../../store/windowsStore';
import { ResizeDirection, ResizeState } from './types';

export const useWindowResize = (
  windowId: string,
  desktopRef: RefObject<HTMLDivElement | null>,
) => {
  const { updateSize, updatePosition, windows } = useWindowsStore();
  const window = windows.find((w) => w.id === windowId);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      if (!window || !desktopRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      setResizeState({
        isResizing: true,
        direction,
        initialX: e.clientX,
        initialY: e.clientY,
        initialWidth: window.size.width,
        initialHeight: window.size.height,
        initialLeft: window.position.x,
        initialTop: window.position.y,
      });
    },
    [window],
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeState || !window || !desktopRef.current) return;

      const deltaX = e.clientX - resizeState.initialX;
      const deltaY = e.clientY - resizeState.initialY;
      const rect = desktopRef.current.getBoundingClientRect();

      let newWidth = resizeState.initialWidth;
      let newHeight = resizeState.initialHeight;
      let newLeft = resizeState.initialLeft;
      let newTop = resizeState.initialTop;

      // Minimum size
      const minWidth = 200;
      const minHeight = 100;

      const { direction } = resizeState;

      // Horizontal resize
      if (direction.includes('e')) {
        newWidth = Math.max(minWidth, resizeState.initialWidth + deltaX);
        newWidth = Math.min(newWidth, rect.width - newLeft);
      }
      if (direction.includes('w')) {
        const maxLeftDelta = resizeState.initialWidth - minWidth;
        const adjustedDeltaX = Math.max(
          Math.min(deltaX, maxLeftDelta),
          -resizeState.initialLeft,
        );
        newWidth = resizeState.initialWidth - adjustedDeltaX;
        newLeft = resizeState.initialLeft + adjustedDeltaX;
      }

      // Vertical resize
      if (direction.includes('s')) {
        newHeight = Math.max(minHeight, resizeState.initialHeight + deltaY);
        newHeight = Math.min(newHeight, rect.height - newTop);
      }
      if (direction.includes('n')) {
        const maxTopDelta = resizeState.initialHeight - minHeight;
        const adjustedDeltaY = Math.max(
          Math.min(deltaY, maxTopDelta),
          -resizeState.initialTop,
        );
        newHeight = resizeState.initialHeight - adjustedDeltaY;
        newTop = resizeState.initialTop + adjustedDeltaY;
      }

      updateSize(windowId, { width: newWidth, height: newHeight });
      updatePosition(windowId, { x: newLeft, y: newTop });
    },
    [resizeState, window, windowId, updateSize, updatePosition, desktopRef],
  );

  const handleResizeEnd = useCallback(() => {
    setResizeState(null);
  }, []);

  useEffect(() => {
    if (resizeState?.isResizing) {
      globalThis.window.addEventListener('mousemove', handleResizeMove);
      globalThis.window.addEventListener('mouseup', handleResizeEnd);

      return () => {
        globalThis.window.removeEventListener('mousemove', handleResizeMove);
        globalThis.window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizeState?.isResizing, handleResizeMove, handleResizeEnd]);

  return {
    handleResizeStart,
    isResizing: !!resizeState,
  };
};
