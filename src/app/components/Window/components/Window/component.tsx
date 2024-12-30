import React, { useEffect } from 'react';
import { WindowTitleBar } from '../WindowTitleBar';
import { useWindowDrag } from '../../hooks/useWindowDrag';
import { useWindowResize } from '../../hooks/useWindowResize';
import { useWindowsStore } from '../../store/windowsStore';
import { WindowProps, ResizeHandlePosition } from './types';
import { getMaximizedStyles } from './utils';
import { getResizeHandleClassName, getWindowStyles } from './styles';

export const Window: React.FC<WindowProps> = ({ window, desktopRef }) => {
  const { removeWindow, toggleMaximize } = useWindowsStore();
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

  const resizePositions: ResizeHandlePosition[] = ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'];

  const resizeHandles = !window.isMaximized && (
    <>
      {resizePositions.map((position) => (
        <div
          key={position}
          className={getResizeHandleClassName(position)}
          onMouseDown={(e) => handleResizeStart(e, position)}
        />
      ))}
    </>
  );

  return (
    <div
      style={{
        ...styles,
        zIndex: window.zIndex,
        userSelect: 'none',
      }}
      className={getWindowStyles(window.isMaximized)}
    >
      {resizeHandles}
      <div 
        className="window-titlebar cursor-move"
        onMouseDown={!window.isMaximized ? handleMouseDown : undefined}
      >
        <WindowTitleBar
          icon={window.icon}
          title={window.title}
          onClose={() => removeWindow(window.id)}
          onMaximize={() => toggleMaximize(window.id, desktopRef)}
        />
      </div>
      <div className="relative h-[calc(100%-2rem)] cursor-default">
        <window.component />
      </div>
    </div>
  );
};