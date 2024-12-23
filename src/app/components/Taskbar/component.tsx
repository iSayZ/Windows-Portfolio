"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Clock } from "./Clock";

const Taskbar: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`w-full h-12 absolute bottom-0 right-0 left-0 backdrop-blur-xl ${isDarkMode ? 'bg-black/10' : 'bg-white/60'} px-4 flex items-center`}>
            <Clock />
        </div>
    )
}

export default Taskbar;