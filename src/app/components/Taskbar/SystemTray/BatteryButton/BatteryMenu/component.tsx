import React, { useRef } from "react";
import { BatteryMedium } from "lucide-react";
import { BatteryMenuProps } from "./types";
import useClickOutside from "@/app/hooks/useClickOutside";

const BatteryMenu: React.FC<BatteryMenuProps> = ({ batteryPercentage, isOpen, onClose, toggleButtonRef }) => {

    const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef]
  });

  return (
    <div className="absolute right-0 bottom-12 mt-2 bg-background backdrop-blur-lg rounded-md p-4 m-4 shadow-lg flex flex-col gap-2 w-80">
      {/* Battery percentage display */}
      <p className="text-center text-md text-nowrap text-ellipsis overflow-hidden font-bold">
        Battery : {batteryPercentage}%
      </p>
      <p className="text-xs text-center">(Remaining autonomy 2 hours and 34 minutes)</p>
      <div className="flex items-center gap-4">
        {/* Battery icon */}
        <div className="text-primary">
          <BatteryMedium size={30} />
        </div>
        {/* Battery gauge (not an input) */}
        <div className="w-full bg-gray-300 rounded h-2">
  <div
    className="h-2 bg-blue-500 rounded"
    style={{ width: `${batteryPercentage}%` }} // Définit la largeur en fonction du pourcentage de batterie
  />
</div>

      </div>
    </div>
  );
};

export default BatteryMenu;
