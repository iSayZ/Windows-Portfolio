import { FileExplorer, WebView } from '@/app/components/apps';
import { AppDefinition } from '@/app/components/apps/types';

export const launchpadApps: AppDefinition[] = [
  {
    icon: '/assets/images/app-icons/apps/explorer.svg',
    iconSize: 'size-7',
    shortname: 'File Explorer',
    name: 'File Explorer',
    component: FileExplorer,
    defaultSize: {
      width: 800,
      height: 500,
    },
  },
  {
    icon: '/assets/images/app-icons/apps/edge.svg',
    iconSize: 'size-8',
    shortname: 'Edge',
    name: 'Microsoft Edge',
    component: WebView,
    defaultSize: {
      width: 900,
      height: 550,
    },
    defaultProps: {
      url: 'https://www.google.fr/webhp?igu=1',
    },
  },
];