'use client';

import React from 'react';
import { SoundButton } from './SoundButton';
import { BatteryButton } from './BatteryButton';
import { WifiButton } from './WifiButton';

const SystemTray: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg relative">
      {/* Icons settings */}
      <div className="flex items-center">
        <WifiButton />
        <SoundButton />
        <BatteryButton />
      </div>
    </div>
  );
};

export default SystemTray;
