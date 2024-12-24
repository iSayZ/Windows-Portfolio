import React from 'react';
import { createPortal } from 'react-dom';
import Calendar from '../Calendar/component';
import { CalendarPortalProps } from './types';

const CalendarPortal: React.FC<CalendarPortalProps> = ({ isOpen, onClose, currentDate, toggleButtonRef }) => {
  if (typeof window === 'undefined') return null; 

  return createPortal(
    <Calendar isOpen={isOpen} onClose={onClose} currentDate={currentDate} toggleButtonRef={toggleButtonRef} />,
    document.body
  );
};

export default CalendarPortal;