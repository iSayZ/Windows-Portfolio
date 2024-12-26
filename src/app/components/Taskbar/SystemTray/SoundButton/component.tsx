import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "@/app/components/Tooltip";
import { MenuPortal } from "../../MenuPortal";
import { SoundMenu } from "./SoundMenu";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { playlist } from "./constants";

const SoundButton: React.FC = () => {
  const [volume, setVolume] = useState<number>(0); 
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false); // Track if audio is playing

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  const toggleSoundMenu = () => setIsSoundMenuOpen(!isSoundMenuOpen);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={17} />;
    if (volume < 33) return <Volume size={17} />;
    if (volume < 66) return <Volume1 size={17} />;
    return <Volume2 size={17} />;
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;

      if (newVolume > 0 && audioRef.current.paused) {
        // Play audio if it's paused
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        setIsAudioPlaying(true); // Track that audio is now playing
      }
    }
  };

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex];
      if (isAudioPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [currentSongIndex, isAudioPlaying]);

  useEffect(() => {
    if (audioRef.current && volume === 0) {
      audioRef.current.pause();
    }
  }, [volume]);

  return (
    <div>
      {/* Toggle button to open menu */}
      <Tooltip content={`Volume ${volume}%`}>
        <button
          ref={toggleButtonRef}
          className="flex items-center justify-center size-7 hover:bg-accent transition rounded"
          aria-label="Volume settings"
          onClick={toggleSoundMenu}
        >
          {getVolumeIcon()}
        </button>
      </Tooltip>

      {/* SoundMenu */}
      <MenuPortal isOpen={isSoundMenuOpen} onClose={toggleSoundMenu}>
        <SoundMenu 
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isOpen={isSoundMenuOpen}
          onClose={toggleSoundMenu}
          toggleButtonRef={toggleButtonRef}
        />
      </MenuPortal>

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        controls
        style={{ display: "none" }}
        onEnded={handleSongEnd}
      >
        <source src={playlist[currentSongIndex]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SoundButton;

