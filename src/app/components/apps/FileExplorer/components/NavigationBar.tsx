import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Monitor,
  Search,
} from 'lucide-react';
import React from 'react';

interface NavigationBarProps {
  currentPath: string[];
  onNavigate: (path: string[]) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentPath,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  searchQuery,
  onSearch,
}) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-secondary-bg">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="p-1 hover:bg-hover rounded-sm disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className="p-1 hover:bg-hover rounded-sm disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </button>
        <div className="flex items-center gap-1 px-2 border rounded-sm flex-1 h-8 bg-background">
          <Monitor size={16} className="mr-1" />
          {currentPath.map((segment, index) => (
            <React.Fragment key={segment}>
              {index > 0 && <ChevronRight size={16} />}
              <span className="text-sm">{segment}</span>
            </React.Fragment>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search"
            className="pl-8 pr-2 py-1 border rounded-sm h-8 bg-background"
          />
          <Search
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};
