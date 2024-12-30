import React, { RefObject } from 'react';
import { useWindowsStore } from '../../store/windowsStore';
import { Window } from '../Window';
import { WindowManagerTypes } from './types';

export const WindowManager: React.FC<WindowManagerTypes> = ({ desktopRef }) => {
  const windows = useWindowsStore((state) => state.windows);

  return (
    <div className="fixed inset-0 pointer-events-none text-foreground">
      {windows.map((window) => (
        <div key={window.id} className="pointer-events-auto">
          <Window window={window} desktopRef={desktopRef} />
        </div>
      ))}
    </div>
  );
};
