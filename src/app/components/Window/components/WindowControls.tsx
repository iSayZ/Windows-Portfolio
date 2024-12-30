import React from 'react';
import { useWindowsStore } from '../store';

interface WindowControlsProps {
  windowId: string;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ windowId }) => {
  const window = useWindowsStore(
    (state) => state.windows.find((w) => w.id === windowId)
  );
  const { toggleMaximize, toggleMinimize, removeWindow } = useWindowsStore();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => toggleMinimize(windowId)}
        className="transition-colors duration-150 hover:bg-gray-200 p-1 rounded"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 20H4V16H20V20Z" />
        </svg>
      </button>
      <button
        onClick={() => toggleMaximize(windowId)}
        className="transition-colors duration-150 hover:bg-gray-200 p-1 rounded"
      >
        {window?.isMaximized ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 8h16v8H4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 4h16v16H4z" />
          </svg>
        )}
      </button>
      <button
        onClick={() => removeWindow(windowId)}
        className="transition-colors duration-150 hover:bg-red-500 hover:text-white p-1 rounded"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
};