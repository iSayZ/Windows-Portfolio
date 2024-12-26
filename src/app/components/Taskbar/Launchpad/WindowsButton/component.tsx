import { Tooltip } from "@/app/components/Tooltip";
import Image from "next/image";
import { useRef, useState } from "react";
import { MenuPortal } from "../../MenuPortal";
import { WindowsMenu } from "./WindowsMenu";

const WindowsButton: React.FC = () => {
    const [isWindowsMenuOpen, setIsWindowsMenuOpen] = useState<boolean>(false);
  
    const toggleWindowsMenu = () => setIsWindowsMenuOpen(!isWindowsMenuOpen);
  
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
    return (
        <>
            {/* Windows Button */}
            <Tooltip content='Windows menu'>
                <button
                ref={toggleButtonRef}
                className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
                onClick={toggleWindowsMenu}
                >
                    <div className="relative w-8 h-8">
                        <Image
                        src="/assets/images/app-icons/taskbar/windows.svg"
                        alt="Windows Logo"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-sm"
                        />
                    </div>
                </button>
            </Tooltip>

            {/* Windows Menu */}
            <MenuPortal 
                isOpen={isWindowsMenuOpen}
                onClose={toggleWindowsMenu}
            >
                <WindowsMenu 
                isOpen={isWindowsMenuOpen}
                onClose={toggleWindowsMenu}
                toggleButtonRef={toggleButtonRef}
                />
            </MenuPortal>
        </>
    )
}

export default WindowsButton;