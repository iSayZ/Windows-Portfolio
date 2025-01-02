import { NavigationBar } from './components/NavigationBar';
import { FileList } from './components/FileList';
import { defaultFileSystem } from './data/defaultFileSystem';
import { useFileExplorer } from './hook/useFileExplorer';
import { FileSystemItem } from './types';
import { apps } from '../../Desktop/config/desktopAppsConfig';
import { useOpenApp } from '@/app/hooks/useOpenApp';

interface FileExplorerProps {
  initialFileSystem?: FileSystemItem[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  initialFileSystem = defaultFileSystem,
}) => {
  const fileSystem = defaultFileSystem(apps);
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
  } = useFileExplorer(fileSystem);

  const handleFileOpen = (item: FileSystemItem) => {
    if (item.type === 'folder' || item.type === 'drive') {
      navigateTo(item);
    } else if (!item.isSystem && item.openWith) {
      const app = apps.find((app) => app.shortname === item.openWith);
      if (app) {
        // If the file type is text open with Notepad
        if (item.type === 'text' && app.shortname === 'Notepad') {
          openApp({
            ...app,
            defaultProps: {
              realPath: item.realPath
            }
          });
        // If the file type is image open with ImageViewer
        } else if (item.type === 'image' && app.shortname === 'ImageViewer') {
          openApp({
            ...app,
            name: `ImageViewer - ${item.name}`,
            defaultProps: {
              realPath: item.realPath
            }
          });
        // If the file type is video open with YouTubeViewer
        } else if (item.type === 'video' && app.shortname === 'YouTube') {
          openApp({
            ...app,
            defaultProps: {
              url: item.realPath,
              unmute: true,
            }
          });
        // If the file type is audio open with MusicPlayer
        } else if (item.type === 'audio' && app.shortname === 'MusicPlayer') {
          openApp({
            ...app,
            defaultProps: {
              realPath: item.realPath,
              unmute: true,
            }
          });
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
