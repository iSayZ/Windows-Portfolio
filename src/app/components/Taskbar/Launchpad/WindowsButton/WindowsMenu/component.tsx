import React, { useRef } from 'react';
import { Search, Power } from 'lucide-react';
import { WindowsMenuProps } from './types';
import useClickOutside from '@/app/hooks/useClickOutside';
import Image from 'next/image';

const WindowsMenu: React.FC<WindowsMenuProps> = ({ isOpen, onClose, toggleButtonRef }) => {
  const pinnedApps = [
    { name: 'Edge', icon: '🌐' },
    { name: 'Word', icon: '📝' },
    { name: 'Excel', icon: '📊' },
    { name: 'PowerPoint', icon: '📑' },
    { name: 'Mail', icon: '✉️' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Store', icon: '🏪' },
    { name: 'Photos', icon: '🖼️' },
    { name: 'OneNote', icon: '📓' },
    { name: 'Phone', icon: '📱' },
    { name: 'To Do', icon: '✓' },
    { name: 'LinkedIn', icon: '💼' }
  ];

  const recommendedItems = [
    { name: 'Get Started', desc: 'Welcome to Windows', icon: '🚀' },
    { name: 'Brand Guidelines', desc: '2h ago', icon: '📄' },
    { name: 'Travel Itinerary', desc: '17h ago', icon: '✈️' },
    { name: 'Expense Worksheet', desc: '12h ago', icon: '📊' }
  ];

  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef]
  });

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-12 m-4 left-1/2 -translate-x-1/2 w-[640px] bg-background backdrop-blur-2xl rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center gap-2 p-2 mb-4 bg-white/90 rounded-md">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Type here to search"
            className="bg-transparent w-full outline-none text-sm"
          />
        </div>

        <div className="mb-6 p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-md font-extrabold">Pinned</span>
            <button className="text-sm bg-accent px-1 rounded-sm shadow-sm">All apps &gt;</button>
          </div>
          <div className="grid grid-cols-6">
            {pinnedApps.map((app, i) => (
              <button key={i} className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-accent">
                <span className="text-2xl">{app.icon}</span>
                <span className="text-xs">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 p-2">
            <span className="text-md font-extrabold">Recommended</span>
            <button className="text-sm bg-accent px-1 rounded-sm shadow-sm">More &gt;</button>
          </div>
          <div className="grid grid-cols-2">
            {recommendedItems.map((item, i) => (
              <button key={i} className="flex items-center gap-3 p-2 rounded-sm hover:bg-accent">
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

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