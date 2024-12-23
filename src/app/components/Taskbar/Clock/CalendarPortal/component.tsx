import React from 'react';
import { createPortal } from 'react-dom';
import Calendar from '../Calendar/component';

const CalendarPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  toggleButtonRef: React.RefObject<HTMLDivElement | null>;
}> = ({ isOpen, onClose, currentDate, toggleButtonRef }) => {
  if (typeof window === 'undefined') return null; 

  return createPortal(
    <Calendar isOpen={isOpen} onClose={onClose} currentDate={currentDate} toggleButtonRef={toggleButtonRef} />,
    document.body
  );
};

export default CalendarPortal;