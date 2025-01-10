import { NavigationBar } from './components/NavigationBar';
import { FileList } from './components/FileList';
import { defaultFileSystem } from './data/defaultFileSystem';
import { useFileExplorer } from './hook/useFileExplorer';
import { FileSystemItem } from './types';
import { desktopApps } from '../config/desktopAppsConfig';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import { useHackerScreenStore } from '../../HackerScreen';
import { allApps } from '../config/appsConfig';
import { useErrorDialogStore } from '../../ErrorDialog/store';

interface FileExplorerProps {
  customFileSystem?: FileSystemItem[] | (() => FileSystemItem[]);
  initialPath?: string[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  customFileSystem,
  initialPath,
}) => {
  const fileSystem =
    typeof customFileSystem === 'function'
      ? customFileSystem()
      : customFileSystem || defaultFileSystem(desktopApps, allApps);

  const openApp = useOpenApp();

  const {
    currentPath,
    currentItems,
    canGoBack,
    canGoForward,
    selectedItems,
    searchQuery,
    navigateBack,
    navigateForward,
    navigateTo,
    handleSearch,
  } = useFileExplorer({
    fileSystem,
    initialPath,
  });

  // To show HackerScreen
  const { setIsOpen } = useHackerScreenStore();

  const handleFileOpen = (item: FileSystemItem) => {
    if (item.type === 'folder' || item.type === 'drive') {
      navigateTo(item);
      // If the file is an error execute ErrorDialog
    } else if (item.type === 'error') {
      useErrorDialogStore.getState().showError({
        filePath: item.path,
        errorCode: '-214741639',
        customMessage: 'This software is too obsolete to run on this system.',
      });
    } else if (!item.isSystem && item.openWith) {
      const app = desktopApps.find((app) => app.shortname === item.openWith);
      if (app) {
        // If the file type is text open with Notepad
        if (item.type === 'text' && app.shortname === 'Notepad') {
          openApp({
            ...app,
            defaultProps: {
              realPath: item.realPath,
            },
          });
          // If the file type is image open with ImageViewer
        } else if (item.type === 'image' && app.shortname === 'ImageViewer') {
          openApp({
            ...app,
            name: `ImageViewer - ${item.name}`,
            defaultProps: {
              realPath: item.realPath,
            },
          });
          // If the file type is video open with YouTubeViewer
        } else if (item.type === 'video' && app.shortname === 'YouTube') {
          openApp({
            ...app,
            defaultProps: {
              url: item.realPath,
              unmute: true,
            },
          });
          // If the file type is audio open with MusicPlayer
        } else if (item.type === 'audio' && app.shortname === 'MusicPlayer') {
          openApp({
            ...app,
            defaultProps: {
              realPath: item.realPath,
              unmute: true,
            },
          });
          // If the file is the fake virus open HackerScreen
        } else if (item.type === 'virus') {
          setIsOpen(true);
          // If the file is an error open ErrorDialog
        } else {
          // For other app, open with her app
          openApp(app);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-background backdrop-blur-3xl">
      <NavigationBar
        currentPath={currentPath}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onBack={navigateBack}
        onForward={navigateForward}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onNavigate={() => {}}
      />
      <FileList
        items={currentItems}
        onItemClick={() => {}}
        onItemDoubleClick={handleFileOpen}
        selectedItems={selectedItems}
      />
    </div>
  );
};
