export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PreviousState {
  position: Position;
  size: Size;
}

export interface Window {
  id: string;
  title: string;
  component: React.ComponentType;
  position: Position;
  size: Size;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  previousState?: PreviousState;
}
