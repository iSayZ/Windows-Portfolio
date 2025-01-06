'use client';

import { useCallback } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useWindowsStore } from '../components/Window';
import { calculateCenteredPosition } from '../components/Window/utils';
import { AppDefinition, AppName } from '../components/apps';
import { allApps } from '../components/apps/config/appsConfig';

interface RecentAppsState {
  recentApps: AppName[];
  addRecentApp: (appKey: AppName) => void;
  clearRecentApps: () => void;
}

export const useRecentAppsStore = create<RecentAppsState>()(
  persist(
    (set) => ({
      recentApps: [],
      addRecentApp: (appKey) =>
        set((state) => ({
          recentApps: [
            appKey,
            ...state.recentApps.filter((key) => key !== appKey),
          ].slice(0, 4),
        })),
      clearRecentApps: () => set({ recentApps: [] }),
    }),
    {
      name: 'recent-apps',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useOpenApp = () => {
  const addWindow = useWindowsStore((state) => state.addWindow);
  const desktopRef = useWindowsStore((state) => state.desktopRef);
  const addRecentApp = useRecentAppsStore((state) => state.addRecentApp);

  return useCallback(
    (app: AppDefinition) => {
      // Find app key and add to recent apps
      const appKey = (Object.keys(allApps) as AppName[]).find(
        (key) => allApps[key].shortname === app.shortname,
      );
      if (appKey) {
        addRecentApp(appKey);
      }

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
    [addWindow, desktopRef, addRecentApp],
  );
};
