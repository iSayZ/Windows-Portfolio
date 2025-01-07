'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider that manages the theme state
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // If no preference is saved, apply light mode by default
    const savedTheme = localStorage.getItem('theme');

    // If a theme is saved, apply it
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.remove('dark-theme');
    } else {
      // Otherwise, apply dark mode by default
      setIsDarkMode(false);
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light'); // Save the default preference
    }
  }, []);

  // Function to toggle between themes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
