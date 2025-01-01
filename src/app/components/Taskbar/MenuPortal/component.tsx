import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuPortalProps } from './types';

const MenuPortal: React.FC<MenuPortalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (typeof window === 'undefined') return null;

  // Close the menu when clicking outside of it (on the backdrop)
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div onClick={handleBackdropClick}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body, // Use a portal to render the menu outside the current DOM hierarchy
  );
};

export default MenuPortal;