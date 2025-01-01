export interface WindowSize {
    width: number;
    height: number;
  }
  
  export interface AppDefinition<T = any> {
    icon: string;
    shortname: string;
    name: string;
    component: React.ComponentType<T>;
    defaultSize: WindowSize;
    defaultProps?: T;
    externalUrl?: string;
  }