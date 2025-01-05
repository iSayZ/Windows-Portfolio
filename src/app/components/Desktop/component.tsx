'use client';

import { desktopApps } from '../apps/config/desktopAppsConfig';
import { AppIcon } from './AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { RefObject, useEffect, useRef } from 'react';
import { useOpenApp } from '@/app/hooks/useOpenApp';

const Desktop: React.FC = () => {
  const desktopRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const setDesktopRef = useWindowsStore((state) => state.setDesktopRef);
  const openApp = useOpenApp();

  useEffect(() => {
    setDesktopRef(desktopRef);
  }, [setDesktopRef]);

  return (
    <>
      <div
        ref={desktopRef}
        className="h-[calc(100vh-3rem)] w-full p-6 flex flex-col flex-wrap gap-2 content-start"
      >
        {desktopApps.map((app) => (
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
