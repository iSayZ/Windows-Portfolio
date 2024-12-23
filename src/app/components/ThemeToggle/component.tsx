"use client";

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-600"
    >
      <span className="transition-transform duration-500 ease-in-out">
        {isDarkMode ? (
          <FaSun size={24} className="transform transition-all duration-500 ease-in-out hover:text-yellow-400" />
        ) : (
          <FaMoon size={24} className="transform transition-all duration-500 ease-in-out hover:text-blue-400" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
