import { FileSystemItem } from '../types';
import { AppDefinition } from '../../types';

export const generateDesktopShortcuts = (
  desktopApps: AppDefinition[],
): FileSystemItem[] => {
  return desktopApps.map((app) => ({
    id: `desktop-${app.shortname.toLowerCase()}`,
    name: `${app.shortname}`,
    type: 'shortcut',
    parentId: 'desktop',
    path: `This PC/Desktop/${app.shortname}`,
    isSystem: false,
    openWith: app.shortname,
    icon: app.icon,
  }));
};
