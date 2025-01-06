'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface AudioContextType {
  volume: number;
  isMuted: boolean;
  previousVolume: number;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  registerAudio: (audioElement: HTMLAudioElement) => void;
  unregisterAudio: (audioElement: HTMLAudioElement) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [volume, setVolumeState] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(50);
  const [audioElements, setAudioElements] = useState<Set<HTMLAudioElement>>(
    new Set(),
  );

  // Appliquer le volume à tous les éléments audio enregistrés
  const applyVolumeToAll = useCallback(
    (newVolume: number) => {
      audioElements.forEach((audio) => {
        audio.volume = newVolume / 100;
      });
    },
    [audioElements],
  );

  // Mettre à jour le volume
  const setVolume = useCallback(
    (newVolume: number) => {
      setVolumeState(newVolume);
      if (!isMuted) {
        applyVolumeToAll(newVolume);
      }
    },
    [isMuted, applyVolumeToAll],
  );

  // Basculer le mode muet
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (prev) {
        // Restaurer le volume précédent
        applyVolumeToAll(previousVolume);
        return false;
      } else {
        // Sauvegarder le volume actuel et couper le son
        setPreviousVolume(volume);
        applyVolumeToAll(0);
        return true;
      }
    });
  }, [volume, previousVolume, applyVolumeToAll]);

  // Enregistrer un nouvel élément audio
  const registerAudio = useCallback(
    (audioElement: HTMLAudioElement) => {
      setAudioElements((prev) => {
        const newSet = new Set(prev);
        newSet.add(audioElement);
        return newSet;
      });
      // Appliquer le volume actuel au nouvel élément
      audioElement.volume = isMuted ? 0 : volume / 100;
    },
    [volume, isMuted],
  );

  // Supprimer un élément audio
  const unregisterAudio = useCallback((audioElement: HTMLAudioElement) => {
    setAudioElements((prev) => {
      const newSet = new Set(prev);
      newSet.delete(audioElement);
      return newSet;
    });
  }, []);

  const value = {
    volume,
    isMuted,
    previousVolume,
    setVolume,
    toggleMute,
    registerAudio,
    unregisterAudio,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte audio
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Hook pour gérer facilement un élément audio
export const useAudioElement = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const { registerAudio, unregisterAudio } = useAudio();

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      registerAudio(audioElement);
      return () => unregisterAudio(audioElement);
    }
  }, [audioRef, registerAudio, unregisterAudio]);
};
