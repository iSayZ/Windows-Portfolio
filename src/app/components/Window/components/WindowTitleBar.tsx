import React from 'react';

interface WindowTitleBarProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
}) => (
  <div className="flex items-center justify-between h-8 px-2 bg-white border-b border-gray-200">
    <div className="text-sm font-medium">{title}</div>
    <div className="flex gap-2">
      <button
        onClick={onMinimize}
        className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600"
      />
      <button
        onClick={onMaximize}
        className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600"
      />
      <button
        onClick={onClose}
        className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600"
      />
    </div>
  </div>
);