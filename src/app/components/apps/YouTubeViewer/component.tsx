import React, { useState, useEffect, useRef } from 'react';
import { YouTubeViewerProps } from './types';
import { useAudio } from '@/app/context/AudioContext';

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          events: {
            onReady: (event: { target: any }) => void;
          };
          playerVars: {
            autoplay: number;
            mute: number;
          };
        },
      ) => any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubeViewer: React.FC<YouTubeViewerProps> = ({
  url,
  unmute = false,
}) => {
  const [videoSource, setVideoSource] = useState<{
    type: 'youtube' | 'local';
    id: string | null;
  }>({ type: 'youtube', id: null });
  const [error, setError] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const { volume, isMuted, registerAudio } = useAudio();

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }
  }, [videoSource.id]);

  // Initialize YouTube player
  const initializePlayer = () => {
    if (
      videoSource.type === 'youtube' &&
      videoSource.id &&
      window.YT &&
      playerContainerRef.current
    ) {
      // We ignore the returned player instance as we use the event.target in onReady
      new window.YT.Player(playerContainerRef.current, {
        videoId: videoSource.id,
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            // Initialize volume
            event.target.setVolume(volume);
            if (isMuted) {
              event.target.mute();
            }
          },
        },
        playerVars: {
          autoplay: 1,
          mute: unmute ? 0 : 1,
        },
      });
    }
  };

  // Synchronize volume with AudioContext
  useEffect(() => {
    if (player && videoSource.type === 'youtube') {
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volume);
      }
    }
  }, [volume, isMuted, player]);

  // Register local video in AudioContext
  useEffect(() => {
    if (videoSource.type === 'local' && videoRef.current) {
      registerAudio(videoRef.current);
    }
  }, [videoSource.type, registerAudio]);

  useEffect(() => {
    const extractYouTubeVideoId = (inputUrl: string) => {
      try {
        const urlObj = new URL(inputUrl);

        const localVideoExtensions = [
          'mp4',
          'webm',
          'ogg',
          'mov',
          'avi',
          'mkv',
        ];
        const fileExtension = inputUrl.split('.').pop()?.toLowerCase();

        if (fileExtension && localVideoExtensions.includes(fileExtension)) {
          setVideoSource({ type: 'local', id: inputUrl });
          return;
        }

        if (urlObj.hostname === 'youtu.be') {
          setVideoSource({ type: 'youtube', id: urlObj.pathname.slice(1) });
          return;
        } else if (
          urlObj.hostname === 'www.youtube.com' ||
          urlObj.hostname === 'youtube.com'
        ) {
          const videoIdParam = urlObj.searchParams.get('v');
          if (videoIdParam) {
            setVideoSource({ type: 'youtube', id: videoIdParam });
            return;
          }

          const pathParts = urlObj.pathname.split('/');
          const embedIndex = pathParts.indexOf('embed');
          if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
            setVideoSource({ type: 'youtube', id: pathParts[embedIndex + 1] });
            return;
          }
        }

        throw new Error('Invalid URL');
      } catch (err) {
        setError(
          'Invalid URL. Please provide a valid YouTube video link or local video file.',
        );
        setVideoSource({ type: 'youtube', id: null });
      }
    };

    extractYouTubeVideoId(url);
  }, [url]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white p-4 text-center">
        {error}
      </div>
    );
  }

  if (!videoSource.id) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="aspect-video w-full h-full">
        {videoSource.type === 'youtube' ? (
          <div ref={playerContainerRef} className="w-full h-full" />
        ) : (
          <video
            ref={videoRef}
            src={videoSource.id}
            autoPlay
            controls
            muted={!unmute}
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};
