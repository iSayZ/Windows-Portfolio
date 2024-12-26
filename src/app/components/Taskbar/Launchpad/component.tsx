import Image from "next/image"

const Launchpad: React.FC = () => {
    return (
        <>
                    <button
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
          onClick={() => alert('Windows !')}
        >
          <div className="relative w-8 h-8">
            <Image
              src="/assets/images/app-icons/taskbar/windows.svg"
              alt="Windows Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          </div>
        </button>

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

        {/* <button
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
          onClick={() => alert('Github !')}
        >
          <div className="relative w-8 h-8">
            <Image
              src="/assets/images/app-icons/taskbar/github.svg"
              alt="Github Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          </div>
        </button>

        <button
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
          onClick={() => alert('Linkedin !')}
        >
          <div className="relative w-8 h-8">
            <Image
              src="/assets/images/app-icons/taskbar/linkedin.svg"
              alt="Linkedin Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          </div>
        </button> */}

        <button
          className="flex items-center justify-center p-1 rounded-sm hover:bg-accent transition"
          onClick={() => alert('Dark !')}
        >
          <div className="relative w-8 h-8">
            <Image
              src="/assets/images/app-icons/taskbar/moon.png"
              alt="Moon Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-sm"
            />
          </div>
        </button>
        </>
    )
}

export default Launchpad;