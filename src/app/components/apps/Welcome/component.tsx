import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from './types';
import { content } from './constants';

const WelcomeApp = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="absolute inset-0 overflow-auto bg-background backdrop-blur-2xl flex flex-col">
      {/* Header with language buttons */}
      <div className="flex justify-end p-4 gap-2 bg-secondary-bg sticky top-0">
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

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center max-w-2xl mx-auto gap-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {content[language].title}
        </h1>
        <p className="text-lg text-center leading-relaxed">
          {content[language].messages[0]}
        </p>
        <p className="text-lg text-center leading-relaxed">
          {content[language].messages[1]}
        </p>
        <Image
          src="/assets/images/welcome/windows.gif"
          alt="Animation démonstrative des fenêtres"
          width={800}
          height={300}
          className="my-4"
        />
        <p className="text-lg text-center leading-relaxed">
          {content[language].messages[2]}
        </p>

        <p className="text-lg text-center leading-relaxed">
          {content[language].messages[3]}
        </p>
        <p className="text-lg text-center leading-relaxed">
          {content[language].messages[4]}
        </p>
      </div>
    </div>
  );
};

export default WelcomeApp;
