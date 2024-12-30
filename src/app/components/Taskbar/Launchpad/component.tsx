import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { WindowsButton } from './WindowsButton';

const Launchpad: React.FC = () => {
  return (
    <div className="m-auto lg:absolute lg:left-[50%] lg:-translate-x-[50%] p-1 flex gap-2">
      <WindowsButton />

      <button
        className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
        onClick={() => alert('Search !')}
      >
        <div className="relative w-7 h-7">
          <Image
            src="/assets/images/app-icons/taskbar/search.svg"
            alt="Search Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-sm"
          />
        </div>
      </button>

      <button
        className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
        onClick={() => alert('Folder !')}
      >
        <div className="relative w-7 h-7">
          <Image
            src="/assets/images/app-icons/taskbar/folder.svg"
            alt="Folder Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-sm"
          />
        </div>
      </button>

      <button
        className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
        onClick={() => alert('Edge !')}
      >
        <div className="relative w-8 h-8">
          <Image
            src="/assets/images/app-icons/taskbar/edge.svg"
            alt="Edge Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-sm"
          />
        </div>
      </button>
      <ThemeToggle />
    </div>
  );
};

export default Launchpad;
