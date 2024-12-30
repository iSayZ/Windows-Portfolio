'use client';

import { useRef } from 'react';
import { AppIcon } from '../AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { Calculator } from './calculator';
import apps from './constants';
import { calculateCenteredPosition } from '../Window/utils';

const Desktop: React.FC = () => {
  const addWindow = useWindowsStore((state) => state.addWindow);

  const desktopRef = useRef<HTMLDivElement | null>(null);

  const openCalculator = () => {
    // Définir la taille de la fenêtre
    const windowSize = { width: 300, height: 400 };

    // Obtenir la taille du desktop
    const desktopSize = desktopRef.current
      ? {
          width: desktopRef.current.clientWidth,
          height: desktopRef.current.clientHeight,
        }
      : { width: window.innerWidth, height: window.innerHeight };

    // Calculer la position centrée
    const centeredPosition = calculateCenteredPosition(windowSize, desktopSize);

    addWindow({
      id: crypto.randomUUID(),
      title: 'Calculatrice',
      component: Calculator,
      position: centeredPosition,
      size: windowSize,
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
            key={app.name}
            icon={app.icon}
            name={app.name}
            onClick={openCalculator}
          />
        ))}
      </div>
      <WindowManager desktopRef={desktopRef} />
    </>
  );
};

export default Desktop;
