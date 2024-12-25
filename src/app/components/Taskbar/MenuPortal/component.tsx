import React from 'react';
import { createPortal } from 'react-dom';
import { MenuPortalProps } from './types';

const MenuPortal: React.FC<MenuPortalProps> = ({ isOpen, onClose, children }) => {
  if (typeof window === 'undefined' || !isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default MenuPortal;
