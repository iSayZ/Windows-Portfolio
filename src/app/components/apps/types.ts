export interface WindowSize {
  width: number;
  height: number;
}

export interface AppDefinition<T = any> {
  icon: string;
  iconSize?: string;
  shortname: string;
  name: string;
  component: React.ComponentType<T>;
  defaultSize: WindowSize;
  defaultProps?: T;
  externalUrl?: string;
}

export type AppName =
  | 'fileExplorer'
  | 'vscode'
  | 'chrome'
  | 'edge'
  | 'cv'
  | 'calculator'
  | 'terminal'
  | 'github'
  | 'linkedin'
  | 'notepad'
  | 'imageViewer'
  | 'youtube'
  | 'musicPlayer'
  | 'paint'
  | 'guestBook'
  | 'bin'
  | 'welcomeApp'
  | 'portfolio';

export type AppsConfig = {
  [K in AppName]: AppDefinition;
};
