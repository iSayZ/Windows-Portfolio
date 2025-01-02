import React from 'react';
import Image from 'next/image';
import { WindowTitleBarProps } from './types';

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  icon,
  title,
  onClose,
  onMaximize,
  isMaximized,
}) => (
  <div
    className={`flex items-center justify-between h-8 px-2 bg-secondary-bg text-foreground${
      !isMaximized ? ' rounded-t-lg' : ''
    }`}
  >
    {/* Header */}
    <div className="flex items-center gap-2">
      {/* Icon on the left side with slight gap */}
      <div className="flex items-center justify-center w-6 h-6">
        <Image
          src={icon}
          alt={title}
          width={30}
          height={30}
          className=""
          priority
        />
      </div>

      {/* Title with slight gap to the right of the icon */}
      <div className="text-sm font-medium">{title}</div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2">
      {/* Maximize Button */}
      <button
        onClick={onMaximize}
        className="w-6 h-6 flex items-center justify-center relative bg-transparent p-2 rounded-custom-sm hover:bg-gray-300"
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
