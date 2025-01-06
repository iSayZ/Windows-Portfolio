'use client';

import React, { useEffect, useState } from 'react';

const glitchChars =
  '!@#$%^&*()_+-=[]{}|;:,.<>?`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const commands = [
  'SECURITY BREACH DETECTED!',
  'Virus detected in system...',
  'Initializing virus module v2.0...',
  'Scanning system files...',
  'Corrupting data...',
  'Encrypting files...',
  'Installing malware...',
  'Sending system data...',
  'Hijacking controls...',
  'SYSTEM COMPROMISED',
  'Press ESC to attempt system recovery...',
];

export function HackerScreen({ onClose }: { onClose: () => void }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    const interval = setInterval(() => {
      if (currentLineIndex >= commands.length) {
        setIsComplete(true);
        clearInterval(interval);
        return;
      }

      const currentCommand = commands[currentLineIndex];

      if (currentCharIndex === 0) {
        setDisplayedLines((prev) => [...prev, '']);
      }

      if (currentCharIndex < currentCommand.length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentCommand.slice(
            0,
            currentCharIndex + 1,
          );
          return newLines;
        });
        currentCharIndex++;
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isComplete) {
        handleRecovery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete]);

  const getRandomGlitchText = (length: number) => {
    return Array(length)
      .fill(0)
      .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
      .join('');
  };

  const handleRecovery = () => {
    setIsRecovering(true);
    let glitchCount = 0;
    const totalGlitches = 10;
    const glitchInterval = setInterval(() => {
      setGlitchText(getRandomGlitchText(Math.floor(Math.random() * 100) + 50));
      glitchCount++;

      if (glitchCount >= totalGlitches) {
        clearInterval(glitchInterval);
        setTimeout(() => {
          setGlitchText('');
          onClose();
        }, 500);
      }
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-50 overflow-hidden flex items-center justify-center
      ${isRecovering ? 'animate-[glitch_0.3s_ease-in-out_infinite]' : ''}`}
    >
      <style jsx global>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
      <pre className="font-mono text-xl text-red-500 whitespace-pre-wrap p-8">
        {isRecovering ? glitchText : displayedLines.join('\n')}
        {!isComplete && !isRecovering && (
          <span className="animate-pulse inline-block w-3 h-5 bg-red-500 ml-1" />
        )}
        {isComplete && !isRecovering && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRecovery}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              System Recovery
            </button>
          </div>
        )}
      </pre>
    </div>
  );
}
