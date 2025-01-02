import React, { useRef } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import useAudioOutput from './hooks/useAudioOutpout';
import useClickOutside from '@/app/hooks/useClickOutside';
import { useAudio } from '@/app/context/AudioContext';

interface SoundMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const SoundMenu: React.FC<SoundMenuProps> = ({
  isOpen,
  onClose,
  toggleButtonRef,
}) => {
  const audioOutput = useAudioOutput();
  const { volume, isMuted, setVolume, toggleMute } = useAudio();

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef],
  });

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={24} />;
    if (volume < 33) return <Volume size={24} />;
    if (volume < 66) return <Volume1 size={24} />;
    return <Volume2 size={24} />;
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 bottom-12 mt-2 bg-background backdrop-blur-lg rounded-md p-4 m-4 shadow-lg flex flex-col gap-2 w-80"
    >
      <p className="text-center text-md text-nowrap text-ellipsis overflow-hidden font-bold">
        Speaker/Headphones : {audioOutput}
      </p>
      <div className="flex items-center gap-4">
        {/* Icône de volume cliquable pour mute/unmute */}
        <button 
          onClick={toggleMute}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {getVolumeIcon()}
        </button>
        {/* Slider de volume */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <p className="text-center text-lg font-bold">{volume}</p>
      </div>
    </div>
  );
};

export default SoundMenu;