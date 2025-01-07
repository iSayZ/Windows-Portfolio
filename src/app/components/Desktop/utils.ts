import { SortMethod } from './types';
import { AppDefinition } from '../apps/types';

export const sortApps = (
  apps: AppDefinition[],
  sortMethod: SortMethod,
  randomOrderSeed: number[],
) => {
  const items = [...apps];
  switch (sortMethod) {
    case 'name':
      return items.sort((a, b) => a.shortname.localeCompare(b.shortname));
    case 'size':
      return randomOrderSeed.map((index) => items[index]);
    case 'date':
    default:
      return items;
  }
};
