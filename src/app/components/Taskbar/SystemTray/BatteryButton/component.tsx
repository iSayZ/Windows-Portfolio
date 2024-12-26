import React, { useRef, useState } from "react";
import { Tooltip } from "@/app/components/Tooltip";
import { MenuPortal } from "../../MenuPortal";
import { BatteryMenu } from "./BatteryMenu";
import { BatteryMedium } from "lucide-react";

const BatteryButton: React.FC = () => {
  const [isBatteryMenuOpen, setIsBatteryMenuOpen] = useState<boolean>(false);
  const batteryPercentage = 72; // Fixed battery percentage

  const toggleBatteryMenu = () => setIsBatteryMenuOpen(!isBatteryMenuOpen);

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      {/* Battery Button */}
      <Tooltip content={`Battery ${batteryPercentage}%`}>
        <button
          ref={toggleButtonRef}
          className="flex items-center justify-center size-7 hover:bg-accent transition rounded"
          aria-label="Battery settings"
          onClick={toggleBatteryMenu}
        >
          <BatteryMedium size={19} />
        </button>
      </Tooltip>

      {/* Battery Menu */}
      <MenuPortal 
        isOpen={isBatteryMenuOpen}
        onClose={toggleBatteryMenu}
      >
        <BatteryMenu 
          batteryPercentage={batteryPercentage}
          isOpen={isBatteryMenuOpen}
          onClose={toggleBatteryMenu}
          toggleButtonRef={toggleButtonRef}
        />
      </MenuPortal>
    </div>
  );
};

export default BatteryButton;
