'use client';

import { useEffect, useState } from 'react';
import { HackerScreen, useHackerScreenStore } from './components/HackerScreen';
import { ScreenSizeAlert } from './components/ScreenSizeAlert';
import { ErrorDialog } from './components/ErrorDialog';
import { useErrorDialogStore } from './components/ErrorDialog/store';

const Home = () => {
  const { isOpen: isHackerScreenOpen, setIsOpen: setHackerScreenOpen } =
    useHackerScreenStore();
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);
  const { isOpen, filePath, errorCode, customMessage, setOpen } =
    useErrorDialogStore();

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
      <ErrorDialog
        isOpen={isOpen}
        filePath={filePath}
        errorCode={errorCode}
        customMessage={customMessage}
        onClose={() => setOpen(false)}
      />
      {isHackerScreenOpen && (
        <HackerScreen onClose={() => setHackerScreenOpen(false)} />
      )}
    </>
  );
};

export default Home;
