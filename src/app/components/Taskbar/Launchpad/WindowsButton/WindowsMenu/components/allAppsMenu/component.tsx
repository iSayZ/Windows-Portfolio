import React, { useMemo } from 'react';
import Image from 'next/image';
import { allApps } from '@/app/components/apps/config/appsConfig';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import { AppDefinition } from '@/app/components/apps/types';
import { useTheme } from '@/app/context/ThemeContext';

interface AllAppsMenuProps {
  searchQuery: string;
  onClose: () => void;
  onBack: () => void;
}

const AllAppsMenu: React.FC<AllAppsMenuProps> = ({
  searchQuery,
  onClose,
  onBack,
}) => {
  const openApp = useOpenApp();
  const { isDarkMode } = useTheme();

  // Convert allApps to array and sort by shortname
  const sortedApps = useMemo(() => {
    return Object.values(allApps).sort((a, b) =>
      a.shortname.localeCompare(b.shortname),
    );
  }, []);

  // Filter apps based on search query
  const filteredApps = useMemo(() => {
    if (!searchQuery) return sortedApps;

    const query = searchQuery.toLowerCase();
    return sortedApps.filter(
      (app) =>
        app.shortname.toLowerCase().includes(query) ||
        app.name.toLowerCase().includes(query),
    );
  }, [sortedApps, searchQuery]);

  // Organize apps into columns
  const appsInColumns = useMemo(() => {
    const columns: AppDefinition[][] = [[], [], []];
    filteredApps.forEach((app, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(app);
    });
    return columns;
  }, [filteredApps]);

  // Handle web search
  const handleWebSearch = () => {
    const edgeApp = {
      ...allApps.edge,
      defaultProps: {
        url: `https://www.google.fr/search?q=${encodeURIComponent(searchQuery)}`,
      },
    };
    openApp(edgeApp);
    onClose();
  };

  return (
    <div className="p-4 flex flex-col max-h-[60vh]">
      {/* Web search option */}
      {searchQuery && (
        <button
          onClick={handleWebSearch}
          className="text-blue-500 hover:underline text-left mb-4 flex-shrink-0"
        >
          Search the web for &quot;{searchQuery}&quot;...
        </button>
      )}

      {/* Header */}
      <div className="mb-4 flex justify-between items-center flex-shrink-0">
        <span className="text-md font-extrabold">All apps</span>
        <button
          onClick={onBack}
          className={`text-sm px-1 rounded-sm shadow-sm ${isDarkMode ? 'bg-black hover:bg-white/25 border border-white' : 'bg-secondary-bg hover:bg-accent'}`}
        >
          &lt; Back
        </button>
      </div>

      {/* No results message */}
      {filteredApps.length === 0 && (
        <div className="text-center py-8 text-gray-500 flex-shrink-0">
          <p>No apps match your search.</p>
          <p className="text-sm">
            Try using different keywords or check your spelling.
          </p>
        </div>
      )}

      {/* Apps list grid with scroll */}
      {filteredApps.length > 0 && (
        <div className="overflow-y-auto pr-2 flex-grow">
          <div className="flex gap-4">
            {appsInColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1 flex flex-col gap-1">
                {column.map((app) => (
                  <button
                    key={app.shortname}
                    onClick={() => {
                      openApp(app);
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2 rounded-sm hover:bg-accent w-full text-left transition active:scale-95"
                  >
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-sm truncate">{app.shortname}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppsMenu;
