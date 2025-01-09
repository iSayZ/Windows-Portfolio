import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  appName: string;
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  appName,
  isLoading,
  onLoadingComplete
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const progressRef = useRef(0);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const initialDuration = 1500;
    const startTime = performance.now();
    const startProgress = progressRef.current;
    const targetProgress = 75;

    const animateLoading = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(
        startProgress + ((targetProgress - startProgress) * elapsed) / initialDuration,
        targetProgress
      );

      progressRef.current = progress;
      setDisplayProgress(progress);

      if (progress < targetProgress) {
        animationRef.current = requestAnimationFrame(animateLoading);
      } else if (!isLoading) {
        startFinalAnimation();
      }
    };

    const startFinalAnimation = () => {
      const finalDuration = 300;
      const finalStartTime = performance.now();
      const finalStartProgress = progressRef.current;
      const finalTarget = 100;

      const animateCompletion = (currentTime: number) => {
        const elapsed = currentTime - finalStartTime;
        const progress = Math.min(
          finalStartProgress + ((finalTarget - finalStartProgress) * elapsed) / finalDuration,
          finalTarget
        );

        progressRef.current = progress;
        setDisplayProgress(progress);

        if (progress < finalTarget) {
          animationRef.current = requestAnimationFrame(animateCompletion);
        } else {
          setIsAnimationComplete(true);
        }
      };

      animationRef.current = requestAnimationFrame(animateCompletion);
    };

    animationRef.current = requestAnimationFrame(animateLoading);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && isAnimationComplete) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 400); // Délai de transition avant de montrer l'app
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAnimationComplete, onLoadingComplete]);

  return (
    <div
      className={`absolute inset-0 bg-background backdrop-blur-2xl flex flex-col items-center justify-center
      `}
      style={{ transition: 'opacity 400ms ease-out' }}
    >
      <h2 className="text-foreground text-2xl font-bold mb-8">{appName}</h2>
      <div className="w-64 bg-white h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transform-gpu"
          style={{
            width: `${displayProgress}%`,
            transition: 'width 150ms ease-out'
          }}
        />
      </div>
      <div className="mt-2 text-sm text-foreground/70">
        {Math.round(displayProgress)}%
      </div>
    </div>
  );
};
