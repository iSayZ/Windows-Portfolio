'use client';

import Image from 'next/image';
import { allApps } from '@/app/components/apps/config/appsConfig';
import { useOpenApp, useRecentAppsStore } from '@/app/hooks/useOpenApp';

interface RecentAppsProps {
  onClose: () => void;
}

export const RecentApps = ({ onClose }: RecentAppsProps) => {
  const recentApps = useRecentAppsStore((state) => state.recentApps);
  const openApp = useOpenApp();

  const validRecentApps = recentApps.map((key) => allApps[key]).filter(Boolean);

  if (validRecentApps.length === 0) {
    return <div className="text-sm text-gray-500 italic">No recent apps</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {validRecentApps.map((app) => (
        <button
          key={app.shortname}
          onClick={() => {
            openApp(app);
            onClose();
          }}
          className="flex items-center gap-3 p-2 rounded hover:bg-accent transition"
        >
          <div className="relative w-6 h-6">
            <Image
              src={app.icon}
              alt={app.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-sm">{app.name}</span>
        </button>
      ))}
    </div>
  );
};
