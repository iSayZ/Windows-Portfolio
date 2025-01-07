import {
  Terminal,
  LayoutGrid,
  Monitor,
  CheckSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import { MenuItem } from '../types';
import { ContextMenuProps } from '../types';

export function createMenuItems({
  areIconsVisible,
  onSelectAll,
  onToggleIcons,
  onChangeView,
  onOpenTerminal,
  onChangeIconSize,
  currentIconSize,
  currentSortMethod,
}: ContextMenuProps): MenuItem[] {
  return [
    {
      label: 'Select all',
      icon: CheckSquare,
      onClick: onSelectAll,
    },
    {
      label: areIconsVisible ? 'Hide desktop icons' : 'Show desktop icons',
      icon: areIconsVisible ? EyeOff : Eye,
      onClick: onToggleIcons,
    },
    { type: 'separator' as const },
    {
      label: 'Sort by',
      icon: LayoutGrid,
      onClick: () => {},
      subItems: [
        {
          label: 'Name',
          onClick: () => onChangeView('name'),
          isActive: currentSortMethod === 'name',
        },
        {
          label: 'Date modified',
          onClick: () => onChangeView('date'),
          isActive: currentSortMethod === 'date',
        },
        {
          label: 'Size',
          onClick: () => onChangeView('size'),
          isActive: currentSortMethod === 'size',
        },
      ],
    },
    {
      label: 'Open in Terminal',
      icon: Terminal,
      onClick: onOpenTerminal,
    },
    { type: 'separator' as const },
    {
      label: 'Display settings',
      icon: Monitor,
      onClick: () => {},
      subItems: [
        {
          label: 'Small icons',
          onClick: () => onChangeIconSize('small'),
          isActive: currentIconSize === 'small',
        },
        {
          label: 'Medium icons',
          onClick: () => onChangeIconSize('medium'),
          isActive: currentIconSize === 'medium',
        },
        {
          label: 'Large icons',
          onClick: () => onChangeIconSize('large'),
          isActive: currentIconSize === 'large',
        },
      ],
    },
  ];
}
