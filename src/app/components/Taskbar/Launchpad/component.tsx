'use client';

import { useOpenApp } from '@/app/hooks/useOpenApp';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { WindowsButton } from './WindowsButton';
import { launchpadApps } from './config/launchpadAppsConfig';
import { Tooltip } from '../../Tooltip';

const Launchpad: React.FC = () => {
  const openApp = useOpenApp();

  return (
    <div className="m-auto lg:absolute lg:left-[50%] lg:-translate-x-[50%] p-1 flex gap-2">
      <WindowsButton />

      <Tooltip content="Search Menu">
        <button
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
          onClick={() => alert('Search !')}
        >
          <div className="relative w-7 h-7">
            <Image
              src="/assets/images/app-icons/apps/search.svg"
              alt="Search Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          </div>
        </button>
      </Tooltip>

      {launchpadApps.map((app) => (
        <Tooltip key={app.shortname} content={app.name}>
          <button
            className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
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