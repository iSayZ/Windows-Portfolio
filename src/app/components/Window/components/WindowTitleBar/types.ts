export interface WindowTitleBarProps {
  icon: string;
  title: string;
  onClose: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}
