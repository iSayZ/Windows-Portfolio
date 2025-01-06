import { useAudio, useAudioElement } from '@/app/context/AudioContext';
import {
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { MusicPlayerProps } from './types';

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ realPath }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  // use global AudioContext
  const { isMuted, toggleMute } = useAudio();
  useAudioElement(audioRef);

  const audioName = realPath ? realPath.split('/').pop() : 'Music Player';

  useEffect(() => {
    const loadAudio = async () => {
      if (realPath) {
        setIsLoading(true);
        setError(null);
        try {
          // Validate audio file extension
          const extension = realPath.split('.').pop()?.toLowerCase();
          const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];

          if (!extension || !audioExtensions.includes(extension)) {
            throw new Error('Unsupported audio type');
          }

          // Fetch the audio file
          const response = await fetch(realPath);
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setAudioUrl(objectUrl);
        } catch (err) {
          console.error('Error loading audio:', err);
          setError(`Could not load audio: ${audioName}`);
          setAudioUrl(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAudio();

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [realPath]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);

      if (progressRef.current) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        progressRef.current.value = progress.toString();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Progress bar interaction
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time =
        (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-100 text-red-700 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background backdrop-blur-2xl flex flex-col">
      {/* Content with sound image / name */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image
          src="/assets/images/app-icons/apps/music-player.svg"
          alt="Music Player"
          width={100}
          height={100}
          priority
        />
        <h2 className="text-lg text-foreground">{audioName}</h2>
      </div>

      {/* Bottom Control Bar */}
      <div className="w-full bg-secondary-bg border-t border-secondary p-4">
        {/* Audio element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 text-sm text-foreground mb-8">
          <span className="w-12">{formatTime(currentTime)}</span>
          <div className="flex-1">
            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-foreground
                hover:[&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          <span className="w-12 text-right">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between relative">
          {/* Left control : Shuffle */}
          <button className="text-foreground hover:text-foreground">
            <Shuffle size={20} />
          </button>

          {/* Rigth control : Volume */}
          <button
            onClick={toggleMute}
            className="text-foreground hover:text-foreground"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* Centered control : Prev, Play, Next */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-4">
            <button className="text-foreground hover:text-foreground">
              <SkipBack size={24} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-foreground text-background p-2 rounded-full hover:bg-blue-500 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="text-foreground hover:text-foreground">
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
