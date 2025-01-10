import { useState, useCallback, useMemo } from 'react';
import { FileSystemItem } from '../types';

interface FileExplorerState {
  currentPath: string[];
  history: string[][];
  historyIndex: number;
  selectedItems: string[];
  searchQuery: string;
}

interface UseFileExplorerProps {
  fileSystem: FileSystemItem[];
  initialPath?: string[];
}

export const useFileExplorer = ({
  fileSystem,
  initialPath = ['This PC'],
}: UseFileExplorerProps) => {
  const [state, setState] = useState<FileExplorerState>({
    currentPath: initialPath,
    history: [initialPath],
    historyIndex: 0,
    selectedItems: [],
    searchQuery: '',
  });

  const currentItems = useMemo(() => {
    const currentPathStr = state.currentPath.join('/');
    return fileSystem.filter((item) => {
      const parentPath = item.path.split('/').slice(0, -1).join('/');
      return parentPath === currentPathStr;
    });
  }, [fileSystem, state.currentPath]);

  const navigateBack = useCallback(() => {
    if (state.historyIndex > 0) {
      setState((prev) => ({
        ...prev,
        historyIndex: prev.historyIndex - 1,
        currentPath: prev.history[prev.historyIndex - 1],
      }));
    }
  }, [state.historyIndex]);

  const navigateForward = useCallback(() => {
    if (state.historyIndex < state.history.length - 1) {
      setState((prev) => ({
        ...prev,
        historyIndex: prev.historyIndex + 1,
        currentPath: prev.history[prev.historyIndex + 1],
      }));
    }
  }, [state.historyIndex, state.history.length]);

  const navigateTo = useCallback((item: FileSystemItem) => {
    if (item.type === 'folder' || item.type === 'drive') {
      const newPath = item.path.split('/');
      setState((prev) => {
        const newHistory = [
          ...prev.history.slice(0, prev.historyIndex + 1),
          newPath,
        ];
        return {
          ...prev,
          currentPath: newPath,
          history: newHistory,
          historyIndex: prev.historyIndex + 1,
          selectedItems: [],
        };
      });
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  return {
    currentPath: state.currentPath,
    currentItems: state.searchQuery
      ? currentItems.filter((item) =>
          item.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      : currentItems,
    canGoBack: state.historyIndex > 0,
    canGoForward: state.historyIndex < state.history.length - 1,
    selectedItems: state.selectedItems,
    searchQuery: state.searchQuery,
    navigateBack,
    navigateForward,
    navigateTo,
    handleSearch,
  };
};
