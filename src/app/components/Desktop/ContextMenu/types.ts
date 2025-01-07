import { IconSize, SortMethod } from '../types';
import { LucideIcon } from 'lucide-react';

export interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenTerminal: () => void;
  onChangeView: (view: SortMethod) => void;
  onSelectAll: () => void;
  onToggleIcons: () => void;
  onChangeIconSize: (size: IconSize) => void;
  currentIconSize: IconSize;
  areIconsVisible: boolean;
  currentSortMethod: string;
}

interface BaseMenuItem {
  icon?: LucideIcon;
  onClick?: () => void;
  label?: string;
  subItems?: SubMenuItem[];
  type?: 'separator';
}

export interface MenuItem extends BaseMenuItem {
  type?: 'separator';
}

export interface SubMenuItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}
