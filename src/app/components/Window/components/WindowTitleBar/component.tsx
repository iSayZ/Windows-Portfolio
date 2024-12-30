import { Calculator } from 'lucide-react';
import React from 'react';
import { WindowTitleBarProps } from './types';

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  title,
  onClose,
  onMaximize,
}) => (
  <div className="flex items-center justify-between h-8 px-2 bg-secondary-bg border-b text-foreground">
    {/* Header */}
    <div className="flex items-center gap-1">
      {/* Icon on the left side with slight gap */}
      <div className="flex items-center justify-center w-6 h-6">
        <Calculator />
      </div>

      {/* Title with slight gap to the right of the icon */}
      <div className="text-sm font-medium">{title}</div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2">
      {/* Maximize Button */}
      <button
        onClick={onMaximize}
        className="w-6 h-6 flex items-center justify-center relative bg-transparent p-2 rounded-custom-sm"
      >
        <div className="absolute size-[0.9rem] rounded-sm border-foreground border-[1.5px]" />
      </button>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center relative bg-transparent hover:bg-red-400 p-2 rounded-custom-sm"
      >
        <div className="absolute w-4 h-[1.5px] bg-foreground transform rotate-45 transition-colors" />
        <div className="absolute w-4 h-[1.5px] bg-foreground transform -rotate-45 transition-colors" />
      </button>
    </div>
  </div>
);
