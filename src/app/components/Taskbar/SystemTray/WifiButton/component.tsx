import React, { useState, useRef } from 'react';
import { Tooltip } from '@/app/components/Tooltip';
import { MenuPortal } from '../../MenuPortal';
import { WifiMenu } from './WifiMenu';
import { Wifi } from 'lucide-react';

const WifiButton: React.FC = () => {
  const [isWifiMenuOpen, setIsWifiMenuOpen] = useState(false);

  const toggleWifiMenu = () => setIsWifiMenuOpen(!isWifiMenuOpen);

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      {/* Wifi Button */}
      <Tooltip content="Wifi connected">
        <button
          ref={toggleButtonRef}
          className="flex items-center justify-center size-7 hover:bg-accent transition rounded"
          aria-label="Wifi settings"
          onClick={toggleWifiMenu}
        >
          <Wifi size={19} />
        </button>
      </Tooltip>

      {/* Wifi Menu */}
      <MenuPortal isOpen={isWifiMenuOpen} onClose={toggleWifiMenu}>
        <WifiMenu
          isOpen={isWifiMenuOpen}
          onClose={toggleWifiMenu}
          toggleButtonRef={toggleButtonRef}
        />
      </MenuPortal>
    </div>
  );
};

export default WifiButton;
