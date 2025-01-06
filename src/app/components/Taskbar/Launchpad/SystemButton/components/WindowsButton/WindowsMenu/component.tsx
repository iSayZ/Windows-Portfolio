import React, { useRef, useState } from 'react';
import { Search, Power } from 'lucide-react';
import { WindowsMenuProps } from './types';
import useClickOutside from '@/app/hooks/useClickOutside';
import Image from 'next/image';
import { pinnedApps } from '@/app/components/apps/config/pinnedAppsConfig';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import { AllAppsMenu } from '../../AllAppsMenu';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchBar } from '../../SearchBar';

const WindowsMenu: React.FC<WindowsMenuProps> = ({
  isOpen,
  onClose,
  toggleButtonRef,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllApps, setShowAllApps] = useState(false);
  const openApp = useOpenApp();
  const { isDarkMode } = useTheme();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef],
  });

  const recommendedItems = [
    { name: 'Get Started', desc: 'Welcome to Windows', icon: '🚀' },
    { name: 'Brand Guidelines', desc: '2h ago', icon: '📄' },
    { name: 'Travel Itinerary', desc: '17h ago', icon: '✈️' },
    { name: 'Expense Worksheet', desc: '12h ago', icon: '📊' },
  ];

  // Display AllAppsMenu if you do a search or click on “All apps”
  const shouldShowAllApps = showAllApps || searchQuery.length > 0;

  return (
    <div
      ref={menuRef}
      className="absolute bottom-12 m-4 left-1/2 -translate-x-1/2 w-[640px] bg-background backdrop-blur-2xl rounded-lg shadow-lg overflow-hidden"
    >
      {/* Search Section */}
      <div className="p-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {shouldShowAllApps ? (
          <AllAppsMenu
            searchQuery={searchQuery}
            onClose={onClose}
            onBack={() => {
              setShowAllApps(false);
              setSearchQuery('');
            }}
          />
        ) : (
          <>
            {/* Pinned Section */}
            <div className="mb-6 p-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-md font-extrabold">Pinned</span>
                <button
                  className={`text-sm px-1 rounded-sm shadow-sm ${isDarkMode ? 'bg-black hover:bg-white/25 border border-white' : 'bg-secondary-bg hover:bg-accent'}`}
                  onClick={() => setShowAllApps(true)}
                >
                  All apps &gt;
                </button>
              </div>
              <div className="grid grid-cols-6">
                {pinnedApps.map((app) => (
                  <button
                    key={app.shortname}
                    onClick={() => {
                      openApp(app);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-accent transition active:scale-95"
                  >
                    <div className="relative w-7 h-7">
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-xs">{app.shortname}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Section */}
            <div>
              <div className="flex justify-between items-center mb-2 p-2">
                <span className="text-md font-extrabold">Recommended</span>
                <button
                  className={`text-sm px-1 rounded-sm shadow-sm ${isDarkMode ? 'bg-black hover:bg-white/25 border border-white' : 'bg-secondary-bg hover:bg-accent'}`}
                >
                  More &gt;
                </button>
              </div>
              <div className="grid grid-cols-2">
                {recommendedItems.map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-sm hover:bg-accent transition active:scale-95"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="text-left">
                      <div className="text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bg-accent flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="relative overflow-hidden w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Image
              src="/assets/images/profile/profile-alexis.png"
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
              className="absolute"
            />
          </div>
          <span className="text-sm">Alexis Estrine</span>
        </div>
        <button className="p-2 rounded-md hover:bg-accent">
          <Power size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default WindowsMenu;
