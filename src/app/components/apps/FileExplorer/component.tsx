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
  const openApp = useOpenApp(); // Ajout de useOpenApp

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
        openApp(app);
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
