'use client';

import { Tooltip } from '@/app/components/Tooltip';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
      onClick={toggleTheme}
    >
      <Tooltip content={isDarkMode ? 'Light mode' : 'Dark mode'}>
        <div className="relative w-8 h-8">
          {isDarkMode ? (
            <Image
              src="/assets/images/app-icons/taskbar/sun.svg"
              alt="Sun Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          ) : (
            <Image
              src="/assets/images/app-icons/taskbar/moon.png"
              alt="Moon Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          )}
        </div>
      </Tooltip>
    </button>
  );
};

export default ThemeToggle;
