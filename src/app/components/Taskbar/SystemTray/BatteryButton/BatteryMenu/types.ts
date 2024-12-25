export interface BatteryMenuProps {
    batteryPercentage: number;
    isOpen: boolean;
    onClose: () => void;
    toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
}