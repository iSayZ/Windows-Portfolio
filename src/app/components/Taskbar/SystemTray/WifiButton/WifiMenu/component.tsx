import React, { useRef, useState } from "react";
import { WifiLow, WifiHigh, Wifi, Loader, LockKeyhole, WifiOff } from "lucide-react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { WifiMenuProps } from "./types";
import { wifiList } from "./constants";

const WifiMenu: React.FC<WifiMenuProps> = ({ isOpen, onClose, toggleButtonRef }) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [currentWiFi, setCurrentWiFi] = useState<string>("WifiAndChill");

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    isOpen,
    onClose,
    refs: [toggleButtonRef, menuRef],
  });

  // Sort Wi-Fi list by signal strength descending
  const sortedWifiList = [...wifiList].sort((a, b) => b.strength - a.strength);

  const handleConnect = (wifiName: string) => {
    if (wifiName === currentWiFi) return; // Already connected
    setConnecting(wifiName);
    setTimeout(() => {
      setCurrentWiFi(wifiName);
      setConnecting(null);
    }, 2000);
  };

  const renderSignalIcon = (strength: number) => {
    if (strength === 0) return <WifiOff size={20} />;
    if (strength < 50) return <WifiLow size={20} />;
    if (strength < 80) return <WifiHigh size={20} />;
    return <Wifi size={20} />;
  };

  // Find the current Wi-Fi in the list to get its strength
  const currentWiFiDetails = wifiList.find(wifi => wifi.name === currentWiFi);
  const currentWiFiStrength = currentWiFiDetails ? currentWiFiDetails.strength : 0;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 bottom-12 mt-2 bg-background backdrop-blur-lg rounded-md p-4 m-4 shadow-lg flex flex-col gap-4 w-80"
    >
      {/* Current connection */}
      <div className="text-center">
        <p className="text-md font-bold text-foreground">
          Connected to : <span className="text-blue-500">{currentWiFi}</span>
        </p>
        <p className="text-xs text-foreground">
          (Connection strength: {currentWiFiStrength}%)
        </p>
      </div>

      {/* Available Wi-Fi networks */}
      <div className="border-t border-foreground pt-2">
        {sortedWifiList.map((wifi, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer ${
              wifi.name === currentWiFi ? "bg-accent/50 text-blue-500" : ""
            }`}
            onClick={() => handleConnect(wifi.name)}
          >
            {/* Wi-Fi signal icon */}
            {renderSignalIcon(wifi.strength)}

            {/* Wi-Fi name */}
            <p className={`text-sm flex-1 ${wifi.name === currentWiFi ? "text-blue-500" : "text-foreground"}`}>
                {wifi.name} {wifi.secured && '(secured)'}
            </p>

            {/* Lock icon for secured networks */}
            {wifi.secured && (
              <LockKeyhole 
                size={16} 
                className={wifi.name === currentWiFi ? "text-blue-500" : "text-foreground"} 
              />
            )}

            {/* Spinner if connecting */}
            {connecting === wifi.name && (
              <Loader size={16} className="animate-spin text-foreground text-blue-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WifiMenu;
