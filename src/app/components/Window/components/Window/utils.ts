import { WindowStyles } from './types';
import { DesktopRef } from '../../store';

export const getMaximizedStyles = (
  desktopRef: DesktopRef,
): Partial<WindowStyles> => {
  if (!desktopRef.current) return {};
  const rect = desktopRef.current.getBoundingClientRect();
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: rect.width,
    height: rect.height,
  };
};
