import { Tooltip } from '@/app/components/Tooltip';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { MenuPortal } from '@/app/components/Taskbar/MenuPortal';
import { SearchMenu } from './SearchMenu';

const SearchButton: React.FC = () => {
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState<boolean>(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleSearchMenu = () => setIsSearchMenuOpen(!isSearchMenuOpen);

  return (
    <>
      <Tooltip content="Search">
        <button
          ref={toggleButtonRef}
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition active:scale-95 h-full"
          onClick={toggleSearchMenu}
        >
          <div className="relative w-7 h-7">
            <Image
              src="/assets/images/app-icons/apps/search.svg"
              alt="Search"
              layout="fill"
              objectFit="contain"
              className="rounded-sm transform scale-x-[-1]"
            />
          </div>
        </button>
      </Tooltip>

      <MenuPortal isOpen={isSearchMenuOpen} onClose={toggleSearchMenu}>
        <SearchMenu
          isOpen={isSearchMenuOpen}
          onClose={toggleSearchMenu}
          toggleButtonRef={toggleButtonRef}
        />
      </MenuPortal>
    </>
  );
};

export default SearchButton;
