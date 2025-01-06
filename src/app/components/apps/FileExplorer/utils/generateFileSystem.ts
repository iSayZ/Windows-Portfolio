import { AppDefinition, AppsConfig } from '../../types';
import { FileSystemItem, FileType } from '../types';

export const generateDesktopapplications = (
  desktopApps: AppDefinition[],
): FileSystemItem[] => {
  return desktopApps.map((app) => ({
    id: `desktop-${app.shortname.toLowerCase()}`,
    name: `${app.shortname}`,
    type: 'application' as FileType,
    parentId: 'desktop',
    path: `This PC/Desktop/${app.shortname}`,
    isSystem: false,
    openWith: app.shortname,
    icon: app.icon,
  }));
};

export const generateAppFiles = (
  appKey: string,
  app: any,
  parentFolderId: string,
  programFilesPath: string,
): FileSystemItem[] => {
  const commonFiles: FileSystemItem[] = [
    {
      id: `${parentFolderId}-uninstall`,
      name: 'uninstall.exe',
      type: 'application' as FileType,
      parentId: parentFolderId,
      path: `${programFilesPath}/${app.name}/uninstall.exe`,
      isSystem: true,
    },
    {
      id: `${parentFolderId}-license`,
      name: 'license.txt',
      type: 'document' as FileType,
      parentId: parentFolderId,
      path: `${programFilesPath}/${app.name}/license.txt`,
      isSystem: true,
    },
  ];

  const specificFiles: Record<string, FileSystemItem[]> = {
    vscode: [
      {
        id: 'program-files-vscode-data',
        name: 'data',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/Visual Studio Code/data`,
        isSystem: true,
      },
      {
        id: 'program-files-vscode-extensions',
        name: 'extensions',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/Visual Studio Code/extensions`,
        isSystem: true,
      },
      {
        id: 'program-files-vscode-config',
        name: 'argv.json',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/Visual Studio Code/argv.json`,
        isSystem: true,
      },
    ],
    chrome: [
      {
        id: `${parentFolderId}-resources`,
        name: 'chrome_100_percent.pak',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/chrome_100_percent.pak`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-locales`,
        name: 'locales',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/locales`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-dll1`,
        name: 'chrome_elf.dll',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/chrome_elf.dll`,
        isSystem: true,
      },
    ],
    edge: [
      {
        id: `${parentFolderId}-resources`,
        name: 'edge_100_percent.pak',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/edge_100_percent.pak`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-locales`,
        name: 'locales',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/locales`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-dll1`,
        name: 'msedge_elf.dll',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/msedge_elf.dll`,
        isSystem: true,
      },
    ],
    paint: [
      {
        id: `${parentFolderId}-config`,
        name: 'mspaint.ini',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/mspaint.ini`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-brushes`,
        name: 'Brushes',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/Brushes`,
        isSystem: true,
      },
    ],
    musicPlayer: [
      {
        id: `${parentFolderId}-config`,
        name: 'config.json',
        type: 'document' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/config.json`,
        isSystem: true,
      },
      {
        id: `${parentFolderId}-codecs`,
        name: 'codecs',
        type: 'folder' as FileType,
        parentId: parentFolderId,
        path: `${programFilesPath}/${app.name}/codecs`,
        isSystem: true,
      },
    ],
  };

  return [...commonFiles, ...(specificFiles[appKey] || [])] as FileSystemItem[];
};

export const generateProgramFiles = (allApps: AppsConfig): FileSystemItem[] => {
  const items: FileSystemItem[] = [];

  const x64Apps = ['vscode', 'chrome', 'edge', 'github'];
  const x86Apps = [
    'notepad',
    'calculator',
    'musicPlayer',
    'imageViewer',
    'paint',
  ];

  // Program Files (64-bit)
  Object.entries(allApps)
    .filter(([key]) => x64Apps.includes(key))
    .forEach(([key, app]) => {
      // Application folder
      const folderId = `program-files-${key}-folder`;
      items.push({
        id: folderId,
        name: app.name,
        type: 'folder',
        parentId: 'program-files',
        path: `This PC/Local Disk (C:)/Program Files/${app.name}`,
        isSystem: true,
      });

      // Main executable
      items.push({
        id: `program-files-${key}-exe`,
        name: `${app.shortname}.exe`,
        type: 'application',
        parentId: folderId,
        path: `This PC/Local Disk (C:)/Program Files/${app.name}/${app.shortname}.exe`,
        isSystem: false,
        openWith: app.shortname,
        icon: app.icon,
      });

      // Additional files
      items.push(
        ...generateAppFiles(
          key,
          app,
          folderId,
          'This PC/Local Disk (C:)/Program Files',
        ),
      );
    });

  // Program Files (x86)
  Object.entries(allApps)
    .filter(([key]) => x86Apps.includes(key))
    .forEach(([key, app]) => {
      const folderId = `program-files-x86-${key}-folder`;
      items.push({
        id: folderId,
        name: app.name,
        type: 'folder',
        parentId: 'program-files-x86',
        path: `This PC/Local Disk (C:)/Program Files (x86)/${app.name}`,
        isSystem: true,
      });

      items.push({
        id: `program-files-x86-${key}-exe`,
        name: `${app.shortname} (x86).exe`,
        type: 'application',
        parentId: folderId,
        path: `This PC/Local Disk (C:)/Program Files (x86)/${app.name}/${app.shortname} (x86).exe`,
        isSystem: false,
        openWith: app.shortname,
        icon: app.icon,
      });

      // Additional files specific to the x86 version
      items.push(
        ...generateAppFiles(
          key,
          app,
          folderId,
          'This PC/Local Disk (C:)/Program Files (x86)',
        ),
      );

      // Adding a specific x86 manifest file
      items.push({
        id: `program-files-x86-${key}-manifest`,
        name: 'app.manifest',
        type: 'document',
        parentId: folderId,
        path: `This PC/Local Disk (C:)/Program Files (x86)/${app.name}/app.manifest`,
        isSystem: true,
      });
    });

  return items;
};
