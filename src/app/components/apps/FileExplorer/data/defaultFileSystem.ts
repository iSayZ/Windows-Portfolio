import { AppDefinition } from '../../types';
import { FileSystemItem } from '../types';
import { generateDesktopShortcuts } from '../utils/generateFileSystem';

export const defaultFileSystem = (
  desktopApps: AppDefinition[],
): FileSystemItem[] => [
  // Root
  {
    id: 'this-pc',
    name: 'This PC',
    type: 'folder',
    parentId: null,
    path: 'This PC',
    isSystem: true,
  },
  // Disk C: structure
  {
    id: 'local-disk-c',
    name: 'Local Disk (C:)',
    type: 'drive',
    parentId: 'this-pc',
    path: 'This PC/Local Disk (C:)',
    isSystem: true,
  },
  // Programme Files
  {
    id: 'program-files',
    name: 'Program Files',
    type: 'folder',
    parentId: 'local-disk-c',
    path: 'This PC/Local Disk (C:)/Program Files',
    isSystem: true,
  },
  {
    id: 'program-files-x86',
    name: 'Program Files (x86)',
    type: 'folder',
    parentId: 'local-disk-c',
    path: 'This PC/Local Disk (C:)/Program Files (x86)',
    isSystem: true,
  },
  // Windows
  {
    id: 'windows',
    name: 'Windows',
    type: 'folder',
    parentId: 'local-disk-c',
    path: 'This PC/Local Disk (C:)/Windows',
    isSystem: true,
  },
  {
    id: 'windows-system32',
    name: 'System32',
    type: 'folder',
    parentId: 'windows',
    path: 'This PC/Local Disk (C:)/Windows/System32',
    isSystem: true,
  },
  {
    id: 'ntoskrnl',
    name: 'ntoskrnl.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/ntoskrnl.exe',
    isSystem: true,
  },
  {
    id: 'kernel32',
    name: 'kernel32.dll',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/kernel32.dll',
    isSystem: true,
  },
  {
    id: 'user32',
    name: 'user32.dll',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/user32.dll',
    isSystem: true,
  },
  {
    id: 'ntdll',
    name: 'ntdll.dll',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/ntdll.dll',
    isSystem: true,
  },
  {
    id: 'winload',
    name: 'winload.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/winload.exe',
    isSystem: true,
  },
  {
    id: 'cmd',
    name: 'cmd.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/cmd.exe',
    isSystem: true,
  },
  {
    id: 'explorer',
    name: 'explorer.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/explorer.exe',
    isSystem: true,
  },
  {
    id: 'taskmgr',
    name: 'taskmgr.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/taskmgr.exe',
    isSystem: true,
  },
  {
    id: 'regedit',
    name: 'regedit.exe',
    type: 'document',
    parentId: 'windows-system32',
    path: 'This PC/Local Disk (C:)/Windows/System32/regedit.exe',
    isSystem: true,
  },

  // Boot files
  {
    id: 'windows-boot',
    name: 'Boot',
    type: 'folder',
    parentId: 'windows',
    path: 'This PC/Local Disk (C:)/Windows/Boot',
    isSystem: true,
  },
  {
    id: 'bootmgr',
    name: 'bootmgr',
    type: 'document',
    parentId: 'windows-boot',
    path: 'This PC/Local Disk (C:)/Windows/Boot/bootmgr',
    isSystem: true,
  },
  {
    id: 'bcd',
    name: 'BCD',
    type: 'document',
    parentId: 'windows-boot',
    path: 'This PC/Local Disk (C:)/Windows/Boot/BCD',
    isSystem: true,
  },
  {
    id: 'winload-efi',
    name: 'winload.efi',
    type: 'document',
    parentId: 'windows-boot',
    path: 'This PC/Local Disk (C:)/Windows/Boot/winload.efi',
    isSystem: true,
  },
  {
    id: 'bootstat-dat',
    name: 'bootstat.dat',
    type: 'document',
    parentId: 'windows-boot',
    path: 'This PC/Local Disk (C:)/Windows/Boot/bootstat.dat',
    isSystem: true,
  },
  {
    id: 'memtest',
    name: 'memtest.exe',
    type: 'document',
    parentId: 'windows-boot',
    path: 'This PC/Local Disk (C:)/Windows/Boot/memtest.exe',
    isSystem: true,
  },
  // Desktop
  {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Desktop',
    isSystem: true,
  },
  // To generate all desktop apps
  ...generateDesktopShortcuts(desktopApps),
  // Documents with a text file
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Documents',
    isSystem: true,
  },
  {
    id: 'my-life-plan',
    name: 'my-life-plan.txt',
    type: 'text',
    parentId: 'documents',
    path: 'This PC/Documents/my-life-plan.txt',
    realPath: '/assets/documents/fake-files/explorer/documents/my-life-plan.txt',
    isSystem: false,
    openWith: 'Notepad',
  },
  {
    id: 'passwords',
    name: 'passwords.txt',
    type: 'text',
    parentId: 'documents',
    path: 'This PC/Documents/passwords.txt',
    realPath: '/assets/documents/fake-files/explorer/documents/passwords.txt',
    isSystem: false,
    openWith: 'Notepad',
  },
  // Pictures with an image
  {
    id: 'pictures',
    name: 'Pictures',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Pictures',
    isSystem: true,
  },
  {
    id: 'cat-woman',
    name: 'cat-woman.jpg',
    type: 'image',
    parentId: 'pictures',
    path: 'This PC/Pictures/cat-woman.jpg',
    realPath: '/assets/documents/fake-files/explorer/pictures/cat-woman.jpg',
    isSystem: false,
    openWith: 'ImageViewer',
  },
  {
    id: 'dev-dream',
    name: 'dev-dream.webp',
    type: 'image',
    parentId: 'pictures',
    path: 'This PC/Pictures/dev-dream.webp',
    realPath: '/assets/documents/fake-files/explorer/pictures/dev-dream.webp',
    isSystem: false,
    openWith: 'ImageViewer',
  },
  {
    id: 'my-next-tattoo',
    name: 'my-next-tattoo.jpg',
    type: 'image',
    parentId: 'pictures',
    path: 'This PC/Pictures/my-next-tattoo.jpg',
    realPath: '/assets/documents/fake-files/explorer/pictures/my-next-tattoo.jpg',
    isSystem: false,
    openWith: 'ImageViewer',
  },
  // Music with an audio file
  {
    id: 'music',
    name: 'Music',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Music',
    isSystem: true,
  },
  {
    id: 'song',
    name: 'favorite-song.mp3',
    type: 'audio',
    parentId: 'music',
    path: 'This PC/Music/favorite-song.mp3',
    isSystem: false,
    openWith: 'Media Player',
  },
  // Videos with a video file
  {
    id: 'videos',
    name: 'Videos',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Videos',
    isSystem: true,
  },
  {
    id: 'video',
    name: 'vacation.mp4',
    type: 'video',
    parentId: 'videos',
    path: 'This PC/Videos/vacation.mp4',
    isSystem: false,
    openWith: 'Media Player',
  },
  // Downloads with a text file
  {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    parentId: 'this-pc',
    path: 'This PC/Downloads',
    isSystem: true,
  },
  {
    id: 'virus',
    name: 'virus.exe',
    type: 'text',
    parentId: 'downloads',
    path: 'This PC/Downloads/downloaded-file.txt',
    realPath: '/assets/documents/fake-files/explorer/downloads/virus.txt',
    icon: '/assets/images/app-icons/explorer/virus.png',
    isSystem: false,
    openWith: 'Notepad',
  },
];
