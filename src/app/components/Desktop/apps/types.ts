export interface WindowSize {
    width: number;
    height: number;
  }
  
  export interface AppDefinition {
    icon: string;
    shortname: string;
    name: string;
    component: React.ComponentType;
    defaultSize: WindowSize;
  }