"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { SystemTray } from "./SystemTray";
import { Clock } from "./Clock";

const Taskbar: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`w-full h-12 absolute bottom-0 right-0 left-0 backdrop-blur-xl ${isDarkMode ? 'bg-black/10' : 'bg-white/60'} px-4 flex items-center`}>
            <div>
            </div>
            <div className="ml-auto flex gap-2 items-center">
                <SystemTray />
                <Clock />
            </div>
        </div>
    )
}

export default Taskbar;