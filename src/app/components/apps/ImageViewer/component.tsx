import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';
import { ImageViewerProps } from './types';

export const ImageViewer: React.FC<ImageViewerProps> = ({
  filePath,
  realPath,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Image manipulation states
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const loadImage = async () => {
      if (realPath) {
        setIsLoading(true);
        setError(null);
        try {
          // Validate image file extension
          const extension = realPath.split('.').pop()?.toLowerCase();
          const imageExtensions = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp',
            'webp',
            'svg',
            'tiff',
          ];

          if (!extension || !imageExtensions.includes(extension)) {
            throw new Error('Unsupported image type');
          }

          // Fetch the image
          const response = await fetch(realPath);
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } catch (err) {
          console.error('Error loading image:', err);
          setError(`Could not load image: ${filePath}`);
          setImageUrl(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadImage();

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [realPath, filePath]);

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3)); // Max zoom of 3x
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5)); // Min zoom of 0.5x
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="flex flex-col h-full bg-background backdrop-blur-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex justify-center items-center p-1 bg-secondary-bg space-x-4">
        <button
          onClick={handleRotateLeft}
          className="hover:bg-gray-200 p-2 rounded"
          title="Rotate Left"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={handleRotateRight}
          className="hover:bg-gray-200 p-2 rounded"
          title="Rotate Right"
        >
          <RotateCw size={20} />
        </button>
        <button
          onClick={handleZoomIn}
          className="hover:bg-gray-200 p-2 rounded"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="hover:bg-gray-200 p-2 rounded"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleReset}
          className="hover:bg-gray-200 p-2 rounded"
          title="Reset"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">
            {error}
          </div>
        ) : (
          <div
            className="flex items-center justify-center transition-transform duration-300 ease-in-out"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
            }}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={filePath || 'Image'}
                width={500} // Adjust as needed
                height={500} // Adjust as needed
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
