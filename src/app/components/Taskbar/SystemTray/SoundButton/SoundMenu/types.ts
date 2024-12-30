export interface SoundMenuProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isOpen: boolean;
  onClose: () => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
}
