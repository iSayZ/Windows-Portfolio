import { AppDefinition } from '../types';
import { allApps } from './appsConfig';

export const launchpadApps: AppDefinition[] = [
  {
    ...allApps.fileExplorer,
    iconSize: 'size-8',
  },
  {
    ...allApps.edge,
    iconSize: 'size-8',
  },
];
