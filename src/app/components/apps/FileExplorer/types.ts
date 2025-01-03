export type FileType =
  | 'folder'
  | 'image'
  | 'video'
  | 'audio'
  | 'text'
  | 'drive'
  | 'document'
  | 'shortcut'
  | 'virus';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  path: string;
  realPath?: string;
  icon?: string;
  extension?: string;
  size?: string;
  lastModified?: string;
  isSystem?: boolean;
  openWith?: string;
}
