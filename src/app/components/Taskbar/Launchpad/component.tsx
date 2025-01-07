'use client';

import { useOpenApp } from '@/app/hooks/useOpenApp';
import Image from 'next/image';
import { launchpadApps } from '../../apps/config/launchpadAppsConfig';
import { Tooltip } from '../../Tooltip';
import { ThemeToggle } from './ThemeToggle';
import { SystemButton } from './SystemButton';

const Launchpad: React.FC = () => {
  const openApp = useOpenApp();

  return (
    <div className="m-auto lg:absolute lg:left-[50%] lg:-translate-x-[50%] p-1 flex gap-2">
      <SystemButton />

      {launchpadApps.map((app) => (
        <Tooltip key={app.shortname} content={app.name}>
          <button
            className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition h-full"
            onClick={() => openApp(app)}
          >
            <div className={`relative ${app.iconSize}`}>
              <Image
                src={app.icon}
                alt={`${app.name} Logo`}
                layout="fill"
                objectFit="contain"
                className="rounded-sm"
              />
            </div>
          </button>
        </Tooltip>
      ))}

      <ThemeToggle />
    </div>
  );
};

export default Launchpad;
