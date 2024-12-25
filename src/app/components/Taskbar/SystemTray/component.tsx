"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, Wifi, Volume2, BatteryMedium } from "lucide-react";
import { MenuPortal } from "../MenuPortal";
import { Tooltip } from "../../Tooltip";
import { SoundButton } from "./SoundButton";

const SystemTray: React.FC = () => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const toggleSettingsMenu = () => setIsSettingsMenuOpen(!isSettingsMenuOpen);

  const [isWifiMenuOpen, setIsWifiMenuOpen] = useState(false);
  const toggleWifiMenu = () => setIsWifiMenuOpen(!isWifiMenuOpen);

  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);
  const toggleSoundMenu = () => setIsSoundMenuOpen(!isSoundMenuOpen);

  const [isBatteryMenuOpen, setIsBatteryMenuOpen] = useState(false);
  const toggleBatteryMenu = () => setIsBatteryMenuOpen(!isBatteryMenuOpen);


  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg relative">
      {/* Icons settings */}
      <div className="flex items-center">
        <Tooltip content="Alex House wifi">
          <button
            className="flex items-center justify-center size-7 hover:bg-accent rounded"
            aria-label="Wi-Fi settings"
          >
            <Wifi size={18} />
          </button>
        </Tooltip>
        {/* <MenuPortal
          isOpen={isWifiMenuOpen}
          onClose={toggleWifiMenu}
        >
          <WifiMenu />
        </MenuPortal> */}
        <SoundButton />
        <Tooltip content="Battery 72%">
          <button
            className="flex items-center justify-center size-7 hover:bg-accent rounded"
            aria-label="Battery status"
          >
            <BatteryMedium size={20} />
          </button>
        </Tooltip>
        {/* <MenuPortal
          isOpen={isBatteryMenuOpen}
          onClose={toggleBatteryMenu}
        >
          <BatteryMenu />
        </MenuPortal> */}
      </div>
    </div>
  );
};

export default SystemTray;
