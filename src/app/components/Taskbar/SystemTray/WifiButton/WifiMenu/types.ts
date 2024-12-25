export interface WifiMenuProps {
    isOpen: boolean;
    onClose: () => void;
    toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
}