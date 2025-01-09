import React, { useState } from 'react';
import { Background } from '../Background';
import { Desktop } from '../Desktop';

const translations = {
  en: {
    title: 'Screen not supported',
    message: 'This application requires a screen width of at least 768px for an optimal experience. Please use a device with a larger screen.',
  },
  fr: {
    title: 'Écran non supporté',
    message: "Cette application nécessite un écran d'au moins 768px de largeur pour une expérience optimale. Veuillez utiliser un appareil avec un écran plus large.",
  },
} as const;

export const ScreenSizeAlert = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <>
      <Background />
      <Desktop />
      <div className="fixed inset-0 bg-background backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="max-w-md bg-secondary-bg p-6 rounded-lg shadow-lg text-center relative">
          {/* Language toggle button */}
          <button
            onClick={toggleLanguage}
            className="absolute top-3 right-3 text-2xl transform transition-transform hover:scale-110"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          >
            {language === 'en' ? '🇫🇷' : '🇬🇧'}
          </button>

          <h2 className="text-xl font-bold text-foreground mb-4">
            {translations[language].title}
          </h2>
          <p className="text-foreground/80">
            {translations[language].message}
          </p>
        </div>
      </div>
    </>
  );
};