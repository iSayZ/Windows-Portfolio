"use client";

import { apps } from './apps/appsList';
import { AppIcon } from '../AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { calculateCenteredPosition } from '../Window/utils';
import { useRef } from 'react';
import { AppDefinition } from './apps';

const Desktop: React.FC = () => {
  const addWindow = useWindowsStore((state) => state.addWindow);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const openApp = (app: AppDefinition) => {
    const desktopSize = desktopRef.current
      ? {
          width: desktopRef.current.clientWidth,
          height: desktopRef.current.clientHeight,
        }
      : { width: window.innerWidth, height: window.innerHeight };

    const centeredPosition = calculateCenteredPosition(app.defaultSize, desktopSize);

    addWindow({
      id: crypto.randomUUID(),
      icon: app.icon,
      title: app.name,
      component: app.component,
      position: centeredPosition,
      size: app.defaultSize,
      isMaximized: false,
      isMinimized: false,
    });
  };

  return (
    <>
      <div
        ref={desktopRef}
        className="h-[calc(100vh-3rem)] w-full p-6 flex flex-col flex-wrap gap-2 content-start"
      >
        {apps.map((app) => (
          <AppIcon
            key={app.shortname}
            icon={app.icon}
            name={app.shortname}
            onClick={() => openApp(app)}
          />
        ))}
      </div>
      <WindowManager desktopRef={desktopRef} />
    </>
  );
};

export default Desktop;