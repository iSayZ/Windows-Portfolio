import { FileSystemItem } from '../types';

export const binFileSystem = (): FileSystemItem[] => [
  {
    id: 'virus',
    name: 'virus.exe',
    type: 'virus',
    parentId: 'Recycle Bin',
    path: 'This PC/Recycle Bin/virus.exe',
    icon: '/assets/images/app-icons/explorer/virus.png',
    isSystem: false,
    openWith: 'Notepad',
  },
  {
    id: 'internet-explorer',
    name: 'Internet Explorer',
    type: 'error',
    parentId: 'Recycle Bin',
    path: 'This PC/Recycle Bin/internet-explorer.exe',
    icon: '/assets/images/app-icons/apps/internet-explorer.svg',
    isSystem: false,
    openWith: 'Error',
  },
];
