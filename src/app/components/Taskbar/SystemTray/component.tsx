"use client";

import React from "react";
import { Wifi } from "lucide-react";
import { Tooltip } from "../../Tooltip";
import { SoundButton } from "./SoundButton";
import { BatteryButton } from "./BatteryButton";

const SystemTray: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg relative">
      {/* Icons settings */}
      <div className="flex items-center">
        <Tooltip content={
          <div>
            <div>WiFiAndChill</div>
            <div className="text-center text-blue-500">Connected</div>
          </div>
        }>
          <button
            className="flex items-center justify-center size-7 hover:bg-accent rounded"
            aria-label="Wi-Fi settings"
          >
            <Wifi size={18} />
          </button>
        </Tooltip>
        
        <SoundButton />
        <BatteryButton />
      </div>
    </div>
  );
};

export default SystemTray;
