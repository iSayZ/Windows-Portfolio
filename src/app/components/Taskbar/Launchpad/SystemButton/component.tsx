import { Tooltip } from '@/app/components/Tooltip';
import { WindowsButton } from './components/WindowsButton';
import Image from 'next/image';
import { SearchButton } from './components/SearchButton';

export const SystemButton: React.FC = () => {
  return (
    <>
      <WindowsButton />

      <SearchButton />
    </>
  );
};
