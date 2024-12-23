import React, { useState, useEffect } from 'react';
import { getUserPreferences, formatTime, formatDate } from './utils/time';
import { CalendarPortal } from './CalendarPortal';

const Clock: React.FC = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [preferences, setPreferences] = useState({
        timeZone: '',
        locale: '',
        uses24Hour: true
    });

    useEffect(() => {
        const userPrefs = getUserPreferences();
        setPreferences(userPrefs);

        const interval = setInterval(() => {
            const date = new Date();
            setCurrentTime(formatTime(
                date, 
                userPrefs.timeZone, 
                userPrefs.uses24Hour,
                userPrefs.locale
            ));
            setCurrentDate(formatDate(date, userPrefs.timeZone));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div 
                className="flex flex-col items-end justify-center ml-auto px-4 hover:bg-background rounded-custom-sm h-full cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
                <p className="text-sm">{currentTime}</p>
                <p className="text-sm">{currentDate}</p>
            </div>
            {currentDate &&
                <CalendarPortal 
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    currentDate={currentDate}
                />
            }
        </>
    );
};

export default Clock;