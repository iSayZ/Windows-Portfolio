'use client';

import { useEffect, useState } from 'react';
import { HackerScreen, useHackerScreenStore } from './components/HackerScreen';
import { ScreenSizeAlert } from './components/ScreenSizeAlert';

const Home = () => {
  const { isOpen: isHackerScreenOpen, setIsOpen: setHackerScreenOpen } = useHackerScreenStore();
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenTooSmall(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isScreenTooSmall) {
    return <ScreenSizeAlert />;
  }

  return (
    <>
      {isHackerScreenOpen && (
        <HackerScreen onClose={() => setHackerScreenOpen(false)} />
      )}
    </>
  );
};

export default Home;