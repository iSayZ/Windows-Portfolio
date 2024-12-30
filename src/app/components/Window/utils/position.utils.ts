import { Position, Size } from '../types';

export const calculateCenteredPosition = (
  windowSize: Size,
  containerSize: Size
): Position => ({
  x: (containerSize.width - windowSize.width) / 2,
  y: (containerSize.height - windowSize.height) / 2,
});

export const constrainPosition = (
  position: Position,
  windowSize: Size,
  containerSize: Size
): Position => ({
  x: Math.max(0, Math.min(position.x, containerSize.width - windowSize.width)),
  y: Math.max(0, Math.min(position.y, containerSize.height - windowSize.height)),
});