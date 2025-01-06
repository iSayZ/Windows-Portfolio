import React, { useState, useEffect } from 'react';
import { NotepadProps } from './types';

export const Notepad: React.FC<NotepadProps> = ({ filePath, realPath }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFile = async () => {
      if (realPath) {
        setIsLoading(true);
        try {
          const response = await fetch(realPath);
          const text = await response.text();
          setContent(text);
        } catch (error) {
          console.error('Error loading file:', error);
          setContent(`Error loading file: ${filePath}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadFile();
  }, [realPath, filePath]);

  return (
    <div className="flex flex-col h-full bg-background backdrop-blur-2xl">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-2 resize-none bg-background text-foreground font-mono focus:outline-none"
          placeholder="Type something..."
        />
      )}
    </div>
  );
};
