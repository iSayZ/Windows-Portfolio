'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Undo2, 
  Redo2, 
  Pen,
  Eraser,
  Square,
  Circle,
  Triangle,
  Star,
  Heart
} from 'lucide-react';

type Tool = 'pen' | 'eraser' | 'shape';
type Shape = 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart';

interface DrawState {
  dataUrl: string;
  tool: Tool;
  color: string;
  brushSize: number;
}

interface Point {
  x: number;
  y: number;
}

const COLORS_ROW1 = ['#000000', '#808080', '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#800080', '#FFC0CB', '#A52A2A'];
const COLORS_ROW2 = ['#FFFFFF', '#C0C0C0', '#FF69B4', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C', '#CD853F', '#E6E6FA'];

export const Paint = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentShape, setCurrentShape] = useState<Shape>('rectangle');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(1);
  const [history, setHistory] = useState<DrawState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const startPoint = useRef<Point | null>(null);
  const lastPoint = useRef<Point | null>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx?.drawImage(canvas, 0, 0);

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const saveToHistory = () => {
    if (!canvasRef.current) return;
    const newState: DrawState = {
      dataUrl: canvasRef.current.toDataURL(),
      tool: currentTool,
      color: color,
      brushSize: brushSize
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      loadCanvasState(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      loadCanvasState(history[newIndex]);
    }
  };

  const loadCanvasState = (state: DrawState) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.src = state.dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const drawShape = (start: Point, end: Point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = brushSize;

    const width = end.x - start.x;
    const height = end.y - start.y;

    switch (currentShape) {
      case 'rectangle':
        ctx.strokeRect(start.x, start.y, width, height);
        break;
      case 'circle':
        const radius = Math.sqrt(width * width + height * height) / 2;
        ctx.beginPath();
        ctx.arc(start.x + width / 2, start.y + height / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(start.x + width / 2, start.y);
        ctx.lineTo(start.x, start.y + height);
        ctx.lineTo(start.x + width, start.y + height);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'star':
        drawStar(ctx, start.x + width / 2, start.y + height / 2, 5, width / 2, height / 4);
        break;
      case 'heart':
        drawHeart(ctx, start.x, start.y, width, height);
        break;
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.stroke();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    const topCurveHeight = height * 0.3;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + topCurveHeight);
    ctx.bezierCurveTo(
      x, y, 
      x, y + topCurveHeight, 
      x + width / 2, y + height
    );
    ctx.bezierCurveTo(
      x + width, y + topCurveHeight, 
      x + width, y, 
      x + width / 2, y + topCurveHeight
    );
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    startPoint.current = coords;
    lastPoint.current = coords;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !lastPoint.current) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'shape' && startPoint.current) {
      const tempCanvas = new Image();
      tempCanvas.src = history[historyIndex].dataUrl;
      tempCanvas.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        drawShape(startPoint.current!, coords);
      };
    } else {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.stroke();
      lastPoint.current = coords;
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPoint.current = null;
      startPoint.current = null;
      saveToHistory();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="flex flex-col shadow-md gap-0">
        {/* Première ligne : outils */}
        <div className="p-3 bg-secondary-bg border-b border-border flex items-center justify-between gap-6">
          <div className="flex gap-1 rounded-lg p-1">
            <button onClick={undo} className="p-2 rounded-lg hover:bg-gray-300 transition-colors" title="Undo">
              <Undo2 size={18} />
            </button>
            <button onClick={redo} className="p-2 rounded-lg hover:bg-gray-300 transition-colors" title="Redo">
              <Redo2 size={18} />
            </button>
          </div>

          <div className="flex gap-1 bg-background/50 rounded-lg p-1">
            <button 
              onClick={() => setCurrentTool('pen')} 
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'pen' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Pen size={18} />
            </button>
            <button 
              onClick={() => setCurrentTool('eraser')}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'eraser' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Eraser size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-background/50 rounded-lg p-2">
            <span className="text-sm font-extrabold">Thickness</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-32 h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-blue-500
                hover:[&::-webkit-slider-thumb]:bg-accent-foreground"
            />
            <span className="text-sm font-extrabold w-6">{brushSize}</span>
          </div>

          <div className="flex gap-1 bg-background/50 rounded-lg p-1">
            <button 
              onClick={() => { setCurrentTool('shape'); setCurrentShape('rectangle'); }}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'shape' && currentShape === 'rectangle' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Square size={18} />
            </button>
            <button 
              onClick={() => { setCurrentTool('shape'); setCurrentShape('circle'); }}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'shape' && currentShape === 'circle' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Circle size={18} />
            </button>
            <button 
              onClick={() => { setCurrentTool('shape'); setCurrentShape('triangle'); }}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'shape' && currentShape === 'triangle' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Triangle size={18} />
            </button>
            <button 
              onClick={() => { setCurrentTool('shape'); setCurrentShape('star'); }}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'shape' && currentShape === 'star' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Star size={18} />
            </button>
            <button 
              onClick={() => { setCurrentTool('shape'); setCurrentShape('heart'); }}
              className={`p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentTool === 'shape' && currentShape === 'heart' ? 'bg-blue-500 text-accent-foreground' : ''}`}
            >
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Deuxième ligne : taille et couleurs */}
        <div className="p-3 bg-secondary-bg backdrop-blur-sm border-b border-border flex justify-center items-center">

          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {COLORS_ROW1.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-lg transition-transform hover:scale-110 active:scale-95
                    ${color === c ? 'ring-2 ring-accent ring-offset-2 ring-offset-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              {COLORS_ROW2.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-lg transition-transform hover:scale-110 active:scale-95
                    ${color === c ? 'ring-2 ring-accent ring-offset-2 ring-offset-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white overflow-hidden" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="w-full h-full bg-white rounded-lg"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};

export default Paint;