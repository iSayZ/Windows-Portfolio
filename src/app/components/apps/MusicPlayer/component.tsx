import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { MusicPlayerProps } from './types';

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ filePath, realPath }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

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
          setError(`Could not load audio: ${filePath}`);
          setAudioUrl(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAudio();

    // Cleanup function to revoke object URL
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [realPath, filePath]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Update progress bar
      if (progressRef.current) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
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

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // Progress bar interaction
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
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
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Song Title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {filePath ? filePath.split('/').pop() : 'Audio Player'}
          </h2>
        </div>

        {/* Audio Element */}
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
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            ref={progressRef}
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6">
          {/* Volume */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMute} 
              className="text-gray-600 hover:text-gray-800"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Play/Pause */}
          <button 
            onClick={togglePlay} 
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};