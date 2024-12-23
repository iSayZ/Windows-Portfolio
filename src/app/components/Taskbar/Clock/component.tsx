import React, { useState, useEffect } from 'react';
import { getUserPreferences, formatTime, formatDate } from './utils/time';

const Clock: React.FC = () => {
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
        <div className="flex flex-col items-end justify-center ml-auto px-4 hover:bg-background rounded-custom-sm h-full cursor-pointer">
            <p className="text-sm">{currentTime}</p>
            <p className="text-sm">{currentDate}</p>
        </div>
    );
};

export default Clock;