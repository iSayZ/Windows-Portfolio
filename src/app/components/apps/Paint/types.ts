export type Tool = 'pen' | 'eraser' | 'shape';
export type Shape = 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart';

export interface DrawState {
  dataUrl: string;
  tool: Tool;
  color: string;
  brushSize: number;
}

export interface Point {
  x: number;
  y: number;
}

export const COLORS_ROW1 = ['#000000', '#808080', '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#800080', '#FFC0CB', '#A52A2A'];
export const COLORS_ROW2 = ['#FFFFFF', '#C0C0C0', '#FF69B4', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C', '#CD853F', '#E6E6FA'];