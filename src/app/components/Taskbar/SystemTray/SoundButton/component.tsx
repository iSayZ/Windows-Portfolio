'use client';

import React, { useRef, useState } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/app/context/AudioContext';
import { SoundMenu } from './SoundMenu';
import { Tooltip } from '@/app/components/Tooltip';
import { MenuPortal } from '../../MenuPortal';

export const SoundButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { volume, isMuted } = useAudio();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={19} />;
    if (volume < 33) return <Volume size={19} />;
    if (volume < 66) return <Volume1 size={19} />;
    return <Volume2 size={19} />;
  };

  return (
    <div>
      <Tooltip content={`Volume ${volume}%`}>
        <button
          ref={toggleButtonRef}
          onClick={toggleMenu}
          className="flex items-center justify-center size-7 hover:bg-accent transition rounded"
          aria-label="Sound settings"
        >
          {getVolumeIcon()}
        </button>
      </Tooltip>

      <MenuPortal isOpen={isMenuOpen} onClose={toggleMenu}>
        <SoundMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          toggleButtonRef={toggleButtonRef}
        />
      </MenuPortal>
    </div>
  );
};