import React, { useRef, useEffect } from 'react';
import { useTerminal } from './hooks/useTerminal';

export const Terminal: React.FC = () => {
  const { state, handlers } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <div 
        className={`flex-1 flex flex-col p-2 font-mono text-sm ${
          state.isBSODMode 
            ? 'bg-blue-600 text-white' 
            : state.isMatrixMode 
              ? 'bg-black text-green-500' 
              : 'bg-black'
        }`}
        onClick={handleTerminalClick}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden select-text">
          {state.history.map((line, index) => (
            <div 
              key={index} 
              className={`whitespace-pre-wrap ${
                state.isBSODMode
                  ? 'text-white font-bold'
                  : state.isMatrixMode || line.type === 'matrix'
                    ? 'text-green-500 font-bold'
                    : line.type === 'input' 
                      ? 'text-white' 
                      : line.type === 'error' 
                        ? 'text-red-500' 
                        : 'text-green-500'
              } ${line.type === 'matrix' ? 'animate-pulse' : ''} ${
                line.type === 'bsod' ? 'text-2xl' : ''
              }`}
            >
              {line.type === 'input' ? '> ' : ''}{line.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <div className="flex items-center mt-2">
          <span className={`mr-2 ${
            state.isBSODMode 
              ? 'text-white' 
              : state.isMatrixMode 
                ? 'text-green-500' 
                : 'text-white'
          }`}>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={state.currentCommand}
            onChange={(e) => handlers.handleInputChange(e.target.value)}
            onKeyDown={handlers.handleKeyDown}
            className={`flex-1 bg-transparent outline-none ${
              state.isBSODMode 
                ? 'text-white caret-white' 
                : state.isMatrixMode 
                  ? 'text-green-500 caret-green-500' 
                  : 'text-white caret-white'
            }`}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};