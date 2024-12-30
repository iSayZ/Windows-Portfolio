import React, { RefObject } from 'react';
import { useWindowsStore } from '../store';
import { Window } from './Window';

interface WindowManagerTypes {
  desktopRef: RefObject<HTMLDivElement | null>;
}

export const WindowManager: React.FC<WindowManagerTypes> = ({ desktopRef }) => {
  const windows = useWindowsStore((state) => state.windows);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {windows.map((window) => (
        <div key={window.id} className="pointer-events-auto">
          <Window window={window} desktopRef={desktopRef} />
        </div>
      ))}
    </div>
  );
};