export interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  toggleButtonRef: React.RefObject<HTMLElement | null>;
}
