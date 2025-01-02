import React, { useState, useEffect } from 'react';
import { YouTubeViewerProps } from './types';

export const YouTubeViewer: React.FC<YouTubeViewerProps> = ({ url, unmute = false }) => {
  const [videoSource, setVideoSource] = useState<{
    type: 'youtube' | 'local';
    id: string | null;
  }>({ type: 'youtube', id: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract YouTube video ID from various URL formats
    const extractYouTubeVideoId = (inputUrl: string) => {
      try {
        const urlObj = new URL(inputUrl);
        
        // Check if it's a local file video
        const localVideoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
        const fileExtension = inputUrl.split('.').pop()?.toLowerCase();
        
        if (fileExtension && localVideoExtensions.includes(fileExtension)) {
          // Local video file
          setVideoSource({ type: 'local', id: inputUrl });
          return;
        }

        // YouTube URL handling
        if (urlObj.hostname === 'youtu.be') {
          // Shortened URL format
          setVideoSource({ type: 'youtube', id: urlObj.pathname.slice(1) });
          return;
        } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
          // Long URL formats
          const videoIdParam = urlObj.searchParams.get('v');
          if (videoIdParam) {
            setVideoSource({ type: 'youtube', id: videoIdParam });
            return;
          }
          
          // Handle embed URLs
          const pathParts = urlObj.pathname.split('/');
          const embedIndex = pathParts.indexOf('embed');
          if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
            setVideoSource({ type: 'youtube', id: pathParts[embedIndex + 1] });
            return;
          }
        }
        
        throw new Error('Invalid URL');
      } catch (err) {
        setError('Invalid URL. Please provide a valid YouTube video link or local video file.');
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
          <iframe
            src={`https://www.youtube.com/embed/${videoSource.id}?autoplay=1${unmute ? '&mute=0' : '&mute=1'}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <video
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