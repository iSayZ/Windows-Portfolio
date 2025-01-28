import React, { useState } from 'react';
import Image from 'next/image';
import { Background } from '../Background';
import { Desktop } from '../Desktop';

const translations = {
  en: {
    title: 'Screen not supported',
    message:
      'This application requires a screen width of at least 768px for an optimal experience. Please use a device with a larger screen.',
    button: 'View mobile portfolio',
  },
  fr: {
    title: 'Écran non supporté',
    message:
      "Cette application nécessite un écran d'au moins 768px de largeur pour une expérience optimale. Veuillez utiliser un appareil avec un écran plus large.",
    button: 'Voir le portfolio mobile',
  },
} as const;

export const ScreenSizeAlert = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const handleRedirect = () => {
    window.location.href = 'https://estrine-alexis.fr';
  };

  return (
    <>
      <Background />
      <Desktop />
      <div className="fixed inset-0 bg-background backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="max-w-md bg-secondary-bg rounded-lg shadow-lg text-center relative overflow-hidden">
          {/* Language toggle buttons */}
          <div className="flex justify-end p-4 gap-2 bg-secondary-bg">
            <button
              onClick={() => setLanguage('fr')}
              disabled={language === 'fr'}
              className={`flex items-center gap-2 px-3 py-1 rounded-md border ${
                language === 'fr'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Image
                src="/assets/images/welcome/fr-flag.svg"
                alt="Français"
                className="w-6 h-4 object-cover"
                width={50}
                height={50}
              />
              FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              disabled={language === 'en'}
              className={`flex items-center gap-2 px-3 py-1 rounded-md border ${
                language === 'en'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Image
                src="/assets/images/welcome/en-flag.svg"
                alt="English"
                className="w-6 h-4 object-cover"
                width={50}
                height={50}
              />
              EN
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {translations[language].title}
            </h2>
            <p className="text-foreground/80 mb-8">
              {translations[language].message}
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={handleRedirect}
            >
              {translations[language].button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
