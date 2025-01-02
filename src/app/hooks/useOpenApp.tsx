import { useCallback } from 'react';
import { useWindowsStore } from '../components/Window';
import { calculateCenteredPosition } from '../components/Window/utils';
import { AppDefinition } from '../components/apps';

export const useOpenApp = () => {
  const addWindow = useWindowsStore((state) => state.addWindow);
  const desktopRef = useWindowsStore((state) => state.desktopRef);

  return useCallback(
    (app: AppDefinition) => {
      // Open an external link, if externalUrl exist
      if (app.externalUrl) {
        window.open(app.externalUrl, '_blank');
        return;
      }

      // Get the desktop size
      const desktopSize = desktopRef?.current
        ? {
            width: desktopRef.current.clientWidth,
            height: desktopRef.current.clientHeight,
          }
        : { width: window.innerWidth, height: window.innerHeight };

      const centeredPosition = calculateCenteredPosition(
        app.defaultSize,
        desktopSize,
      );

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
    },
    [addWindow, desktopRef],
  );
};
