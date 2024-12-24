export interface CalendarPortalProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: string;
    toggleButtonRef: React.RefObject<HTMLDivElement | null>;
}