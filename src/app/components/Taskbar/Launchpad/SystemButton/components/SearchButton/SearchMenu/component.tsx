'use client';

import React, { useRef, useState } from 'react';
import { allApps } from '@/app/components/apps/config/appsConfig';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import { quickSearches } from './config';
import { AllAppsMenu } from '../../AllAppsMenu';
import useClickOutside from '@/app/hooks/useClickOutside';
import { SearchBar } from '../../SearchBar';
import { RecentApps } from './RecentApps';
import { SearchMenuProps } from './types';

export const SearchMenu: React.FC<SearchMenuProps> = ({
  isOpen,
  onClose,
  toggleButtonRef,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const openApp = useOpenApp();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef],
  });

  // Quick search manager
  const handleQuickSearch = (query: string) => {
    const edgeApp = {
      ...allApps.edge,
      defaultProps: {
        url: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
      },
    };
    openApp(edgeApp);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-12 m-4 left-1/2 -translate-x-1/2 w-[640px] bg-background backdrop-blur-2xl rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {searchQuery ? (
          <AllAppsMenu
            searchQuery={searchQuery}
            onClose={onClose}
            onBack={() => setSearchQuery('')}
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-8">
              {/* Recent */}
              <div>
                <h2 className="text-md font-bold mb-4">Recent</h2>
                <RecentApps onClose={onClose} />
              </div>

              {/* Quick searches */}
              <div>
                <h2 className="text-md font-bold mb-4">Quick searches</h2>
                <div className="flex flex-col gap-2">
                  {quickSearches.map((search) => (
                    <button
                      key={search.id}
                      onClick={() => handleQuickSearch(search.searchQuery)}
                      className="flex items-center gap-3 p-2 rounded hover:bg-accent transition"
                    >
                      <span className="text-md">{search.icon}</span>
                      <span className="text-sm">{search.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
