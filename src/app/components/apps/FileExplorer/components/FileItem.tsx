import Image from 'next/image';
import { FileSystemItem, FileType } from '../types';

interface FileItemProps {
  item: FileSystemItem;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected: boolean;
}

const getIconPath = (type: FileType, name: string, customIcon?: string) => {
  // If a custom icon exist, use it
  if (customIcon) {
    return customIcon;
  }

  const basePath = '/assets/images/app-icons/explorer';

  // Special folders
  if (type === 'folder') {
    switch (name.toLowerCase()) {
      case 'pictures':
      case 'images':
        return `${basePath}/folders/picture-folder.png`;
      case 'videos':
        return `${basePath}/folders/video-folder.png`;
      case 'music':
        return `${basePath}/folders/audio-folder.png`;
      case 'documents':
        return `${basePath}/folders/documents-folder.png`;
      case 'desktop':
        return `${basePath}/folders/desktop-folder.png`;
      case 'downloads':
        return `${basePath}/folders/download-folder.png`;
      default:
        return `${basePath}/folders/folder.svg`;
    }
  }

  // Other file types
  switch (type) {
    case 'image':
      return `${basePath}/picture.svg`;
    case 'audio':
      return `${basePath}/mp3.png`;
    case 'video':
      return `${basePath}/video.png`;
    case 'text':
      return `${basePath}/text.png`;
    case 'document':
      return `${basePath}/document.png`;
    case 'application':
      return `${basePath}/document.png`;
    case 'drive':
      return `${basePath}/disk.png`;
    default:
      return `${basePath}/document.png`;
  }
};

export const FileItem: React.FC<FileItemProps> = ({
  item,
  onClick,
  onDoubleClick,
  isSelected,
}) => {
  const iconPath = getIconPath(item.type, item.name, item.icon);

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`
        flex flex-col items-center p-2 rounded-sm cursor-pointer w-full
        ${isSelected ? 'bg-blue-500/20' : 'hover:bg-accent'}
      `}
    >
      <div className="relative size-14 mb-1">
        <Image
          src={iconPath}
          alt={item.name}
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-sm text-center break-words w-full">
        {item.name}
      </span>
    </div>
  );
};
