'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { HackerScreen, useHackerScreenStore } from './components/HackerScreen';
import { ScreenSizeAlert } from './components/ScreenSizeAlert';

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] 
    }
  }
};

const desktopVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      delay: 0.6
    }
  }
};

const taskbarVariants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

const Home = () => {
  const { isOpen: isHackerScreenOpen, setIsOpen: setHackerScreenOpen } = useHackerScreenStore();
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Background with fade in animation */}
          <motion.div
            className="absolute inset-0 z-0"
            initial="hidden"
            animate="visible"
            variants={backgroundVariants}
            key="background"
          >
            <Background />
          </motion.div>

          {/* Desktop with fade in animation */}
          <motion.div
            className="absolute inset-0 z-10"
            initial="hidden"
            animate="visible"
            variants={desktopVariants}
            key="desktop"
          >
            <Desktop />
          </motion.div>

          {/* Taskbar with uphill animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20"
            initial="hidden"
            animate="visible"
            variants={taskbarVariants}
            key="taskbar"
          >
            <Taskbar />
          </motion.div>

          {isHackerScreenOpen && (
            <HackerScreen onClose={() => setHackerScreenOpen(false)} />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Home;