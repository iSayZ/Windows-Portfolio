import { FileSystemItem } from '../types';
import { FileItem } from './FileItem';

interface FileListProps {
  items: FileSystemItem[];
  onItemClick: (item: FileSystemItem) => void;
  onItemDoubleClick: (item: FileSystemItem) => void;
  selectedItems: string[];
}

export const FileList: React.FC<FileListProps> = ({
  items,
  onItemClick,
  onItemDoubleClick,
  selectedItems,
}) => {
  return (
    <div className="p-4 flex flex-wrap gap-1 overflow-auto">
      {items.map((item) => (
        <div className="w-[100px]" key={item.id}>
          {' '}
          {/* Conteneur à largeur fixe */}
          <FileItem
            item={item}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
            isSelected={selectedItems.includes(item.id)}
          />
        </div>
      ))}
    </div>
  );
};
