import { ResizeHandlePosition } from './types';

export const getResizeHandleClassName = (position: ResizeHandlePosition): string => {
  const baseClasses = 'resize-handle z-50';
  const positionClasses = {
    nw: '-top-1 -left-1 size-2 cursor-nwse-resize',
    ne: '-top-1 -right-1 size-2 cursor-nesw-resize',
    sw: '-bottom-1 -left-1 size-2 cursor-nesw-resize',
    se: '-bottom-1 -right-1 size-2 cursor-nwse-resize',
    n: '-top-1 left-1/2 transform -translate-x-1/2 h-2 w-[calc(100%-1rem)] cursor-ns-resize',
    s: '-bottom-1 left-1/2 transform -translate-x-1/2 h-2 w-[calc(100%-1rem)] cursor-ns-resize',
    w: '-left-1 top-1/2 transform -translate-y-1/2 w-2 h-[calc(100%-1rem)] cursor-ew-resize',
    e: '-right-1 top-1/2 transform -translate-y-1/2 w-2 h-[calc(100%-1rem)] cursor-ew-resize'
  };

  return `${baseClasses} absolute ${positionClasses[position]}`;
};

export const getWindowStyles = (isMaximized: boolean): string => 
  `bg-white shadow-xl relative${
    isMaximized ? '' : ' rounded-lg'
  }`;

export const getWindowContentStyles = (isMaximized: boolean): string => 
  `relative h-[calc(100%-2rem)] cursor-default overflow-hidden${
    isMaximized ? '' : ' rounded-b-lg'
  }`;