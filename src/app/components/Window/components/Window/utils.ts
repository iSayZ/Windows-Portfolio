import { RefObject } from 'react';
import { WindowStyles } from './types';

export const getMaximizedStyles = (desktopRef: RefObject<HTMLDivElement | null>): Partial<WindowStyles> => {
  if (!desktopRef.current) return {};
  const rect = desktopRef.current.getBoundingClientRect();
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: rect.width,
    height: rect.height
  };
};