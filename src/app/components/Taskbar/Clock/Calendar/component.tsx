import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  toggleButtonRef: React.RefObject<HTMLDivElement | null>;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose, currentDate, toggleButtonRef }) => {
  const [viewDate, setViewDate] = useState(() => {
    const [day, month, year] = currentDate.split('/').map(Number);
    return new Date(year, month - 1, day);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };
  const navigateMonth = (direction: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + direction);
    setViewDate(newDate);
  };

  const isToday = (year: number, month: number, day: number) => {
    const [currentDay, currentMonth, currentYear] = currentDate.split('/').map(Number);
    return year === currentYear && month === currentMonth - 1 && day === currentDay;
  };

  const isSelected = (year: number, month: number, day: number) => {
    return selectedDate &&
           year === selectedDate.getFullYear() && 
           month === selectedDate.getMonth() && 
           day === selectedDate.getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8" />
      );
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = isToday(viewDate.getFullYear(), viewDate.getMonth(), i);
      const isSelectedDay = isSelected(viewDate.getFullYear(), viewDate.getMonth(), i);
      
      days.push(
        <button
          key={i}
          className={`relative h-8 w-8 rounded-full hover:bg-blue-400 focus:outline-none
            ${isCurrentDay ? 'bg-blue-600' : ''}
            ${isSelectedDay ? 'bg-blue-600' : ''}`}
          onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), i))}
        >
          {i}
        </button>
      );
    }
    
    return days;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target as Node) && 
            toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node)
        ) {
            onClose(); // Ferme le menu si l'on clique en dehors
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="absolute right-0 bottom-12 mt-2 bg-background backdrop-blur-xl rounded-md p-4 m-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <span className="font-semibold">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(day => (
          <div key={day} className="h-8 w-8 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;