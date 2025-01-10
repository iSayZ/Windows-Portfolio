'use client';

import { motion } from 'framer-motion';
import { Background } from '../Background';
import { Desktop } from '../Desktop';
import { Taskbar } from '../Taskbar';

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

export const AnimatedLayout = () => {
  return (
    <div className="relative h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        <Background />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={desktopVariants}
      >
        <Desktop />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={taskbarVariants}
      >
        <Taskbar />
      </motion.div>
    </div>
  );
};