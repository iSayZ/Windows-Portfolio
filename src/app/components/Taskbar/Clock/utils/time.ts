export const getUserPreferences = () => {
    // Get user's full locale settings
    const fullLocale = Intl.DateTimeFormat().resolvedOptions();
    
    // Get system locale
    const systemLocale = navigator.language;
    
    // Detect if the locale uses 12-hour format by default
    // This list includes common regions that use 12-hour format
    const twelveHourLocales = ['en-US', 'en-GB', 'en-AU', 'en-CA', 'es-US', 'fr-CA'];
    const uses24Hour = !twelveHourLocales.includes(systemLocale);

    return {
        timeZone: fullLocale.timeZone,
        locale: systemLocale,
        uses24Hour
    };
};

export const formatTime = (date: Date, timeZone: string, use24Hour: boolean, locale: string): string => {
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24Hour,
        timeZone
    }).format(date);
};

export const formatDate = (date: Date, timeZone: string): string => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone
    }).format(date);
};