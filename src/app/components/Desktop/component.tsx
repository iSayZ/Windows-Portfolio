"use client";

import { AppIcon } from "../AppIcon";
import apps from "./constants";

const Desktop: React.FC = () => {
    return (
        <div className="h-[calc(100vh-3rem)] w-full p-6 flex flex-col flex-wrap gap-2 content-start">
            {apps.map((app) => (
                <AppIcon 
                    key={app.name} 
                    icon={app.icon}
                    name={app.name}
                    onClick={app.onClick} 
                />
            ))}
        </div>
    )
}

export default Desktop;