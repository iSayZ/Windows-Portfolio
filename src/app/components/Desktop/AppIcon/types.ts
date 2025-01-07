export interface AppIconProps {
  icon: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  'data-app-name'?: string;
}
