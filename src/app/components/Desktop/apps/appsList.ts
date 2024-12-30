import { VsCode } from './VsCode';
import { Chrome } from './Chrome';
import { AppDefinition } from './types';

export const apps: AppDefinition[] = [
  {
    icon: '/assets/images/app-icons/desktop/vscode.svg',
    shortname: 'VsCode',
    name: 'Visual Studio Code',
    component: VsCode,
    defaultSize: {
      width: 800,
      height: 400
    }
  },
  {
    icon: '/assets/images/app-icons/desktop/chrome.svg',
    shortname: 'Chrome',
    name: 'Google Chrome',
    component: Chrome,
    defaultSize: {
      width: 900,
      height: 550
    }
  },
];