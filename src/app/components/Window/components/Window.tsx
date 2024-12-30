import React, { RefObject, useEffect } from 'react';
import { Window as WindowType } from '../types';
import { WindowTitleBar } from './WindowTitleBar';
import { useWindowDrag, useWindowResize } from '../hooks';
import { useWindowsStore } from '../store';

interface WindowProps {
  window: WindowType;
  desktopRef: RefObject<HTMLDivElement | null>;
}

const getMaximizedStyles = (desktopRef: RefObject<HTMLDivElement | null>) => {
  if (!desktopRef.current) return {};
  const rect = desktopRef.current.getBoundingClientRect();
  return {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    width: rect.width,
    height: rect.height
  };
};

export const Window: React.FC<WindowProps> = ({ window, desktopRef }) => {
  const { removeWindow, toggleMaximize, toggleMinimize } = useWindowsStore();
  const { handleMouseDown, handleMouseMove, handleMouseUp, isDragging } = useWindowDrag(window.id, desktopRef);
  const { handleResizeStart } = useWindowResize(window.id, desktopRef);

  useEffect(() => {
    if (isDragging) {
      globalThis.window.addEventListener('mousemove', handleMouseMove);
      globalThis.window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        globalThis.window.removeEventListener('mousemove', handleMouseMove);
        globalThis.window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (window.isMinimized) return null;

  const styles = window.isMaximized 
    ? getMaximizedStyles(desktopRef)
    : {
        position: 'absolute' as const,
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
      };

  const resizeHandles = !window.isMaximized ? (
    <>
      <div
        className="resize-handle absolute top-0 left-0 size-2 cursor-nwse-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'nw')}
      />
      <div
        className="resize-handle absolute top-0 right-0 size-2 cursor-nesw-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'ne')}
      />
      <div
        className="resize-handle absolute bottom-0 left-0 size-2 cursor-nesw-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'sw')}
      />
      <div
        className="resize-handle absolute bottom-0 right-0 size-2 cursor-nwse-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'se')}
      />
      <div
        className="resize-handle absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-[calc(100%-1rem)] cursor-ns-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'n')}
      />
      <div
        className="resize-handle absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-[calc(100%-1rem)] cursor-ns-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 's')}
      />
      <div
        className="resize-handle absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-[calc(100%-1rem)] cursor-ew-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'w')}
      />
      <div
        className="resize-handle absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-[calc(100%-1rem)] cursor-ew-resize z-50"
        onMouseDown={(e) => handleResizeStart(e, 'e')}
      />
    </>
  ) : null;

  return (
    <div
      style={{
        ...styles,
        zIndex: window.zIndex,
        userSelect: 'none',
        borderRadius: window.isMaximized ? '0' : '0.5rem',
      }}
      className="bg-white shadow-xl overflow-hidden border border-gray-500 relative"
    >
      {resizeHandles}
      <div 
        className="window-titlebar cursor-move"
        onMouseDown={!window.isMaximized ? handleMouseDown : undefined}
      >
        <WindowTitleBar
          title={window.title}
          onClose={() => removeWindow(window.id)}
          onMinimize={() => toggleMinimize(window.id)}
          onMaximize={() => toggleMaximize(window.id, desktopRef)}
        />
      </div>
      <div className="relative h-[calc(100%-2rem)] cursor-default">
        <window.component />
      </div>
    </div>
  );
};