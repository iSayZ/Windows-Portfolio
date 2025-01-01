"use client";

import { apps } from './config/desktopAppsConfig';
import { AppIcon } from './AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { calculateCenteredPosition } from '../Window/utils';
import { useRef } from 'react';
import { AppDefinition } from '../apps';

const Desktop: React.FC = () => {
  const addWindow = useWindowsStore((state) => state.addWindow);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const openApp = (app: AppDefinition) => {
    // Open an external link, if externalUrl exist
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
      return;
    }

    // Get the desktop size
    const desktopSize = desktopRef.current
      ? {
          width: desktopRef.current.clientWidth,
          height: desktopRef.current.clientHeight,
        }
      : { width: window.innerWidth, height: window.innerHeight };

    // Get centered position of desktop
    const centeredPosition = calculateCenteredPosition(app.defaultSize, desktopSize);

    // Open an app component with her props
    const ComponentWithProps = () => {
      const Component = app.component;
      return <Component {...app.defaultProps} />;
    };

    // Open a window with app
    addWindow({
      id: crypto.randomUUID(),
      icon: app.icon,
      title: app.name,
      component: ComponentWithProps,
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