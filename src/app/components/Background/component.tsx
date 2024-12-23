"use client";

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const Background: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="absolute -z-10 inset-0">
      {/* Background Image */}
      <Image
        src={`/assets/images/background/bg-windows-${isDarkMode ? "dark" : "light"}.jpg`}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
        unoptimized
      />

      {/* Black Overlay */}
      <div
        className="absolute inset-0 bg-black/10"
      />
    </div>
  );
};

export default Background;
