import {
  AppsConfig,
  Calculator,
  FileExplorer,
  ImageViewer,
  MusicPlayer,
  Notepad,
  Paint,
  PdfViewer,
  type PdfViewerProps,
  Terminal,
  WebView,
  YouTubeViewer,
} from '@/app/components/apps';

export const allApps: AppsConfig = {
  fileExplorer: {
    icon: '/assets/images/app-icons/apps/explorer.svg',
    shortname: 'File Explorer',
    name: 'File Explorer',
    component: FileExplorer,
    defaultSize: {
      width: 800,
      height: 500,
    },
  },
  vscode: {
    icon: '/assets/images/app-icons/apps/vscode.svg',
    shortname: 'VsCode',
    name: 'Visual Studio Code',
    component: WebView,
    defaultSize: {
      width: 800,
      height: 400,
    },
    defaultProps: {
      url: 'https://github1s.com/iSayZ/Windows-Portfolio',
    },
  },
  chrome: {
    icon: '/assets/images/app-icons/apps/chrome.svg',
    shortname: 'Chrome',
    name: 'Google Chrome',
    component: WebView,
    defaultSize: {
      width: 900,
      height: 550,
    },
    defaultProps: {
      url: 'https://www.google.fr/webhp?igu=1',
    },
  },
  edge: {
    icon: '/assets/images/app-icons/apps/edge.svg',
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
  cv: {
    icon: '/assets/images/app-icons/apps/pdf.svg',
    shortname: 'CV',
    name: 'CV Estrine Alexis - JS Developer',
    component: PdfViewer,
    defaultSize: {
      width: 800,
      height: 550,
    },
    defaultProps: {
      pdfUrl: '/assets/documents/cv.pdf',
    } as PdfViewerProps,
  },
  calculator: {
    icon: '/assets/images/app-icons/apps/calculator.png',
    shortname: 'Calculator',
    name: 'Calculator',
    component: Calculator,
    defaultSize: {
      width: 300,
      height: 550,
    },
  },
  terminal: {
    icon: '/assets/images/app-icons/apps/terminal.png',
    shortname: 'Terminal',
    name: 'Terminal',
    component: Terminal,
    defaultSize: {
      width: 700,
      height: 400,
    },
  },
  github: {
    icon: '/assets/images/app-icons/apps/github.svg',
    shortname: 'GitHub',
    name: 'GitHub',
    component: () => null,
    defaultSize: {
      width: 0,
      height: 0,
    },
    externalUrl: 'https://github.com/iSayZ',
  },
  linkedin: {
    icon: '/assets/images/app-icons/apps/linkedin.svg',
    shortname: 'LinkedIn',
    name: 'LinkedIn',
    component: () => null,
    defaultSize: {
      width: 0,
      height: 0,
    },
    externalUrl: 'https://www.linkedin.com/in/alexis-estrine/',
  },
  notepad: {
    icon: '/assets/images/app-icons/apps/notepad.png',
    shortname: 'Notepad',
    name: 'Notepad',
    component: Notepad,
    defaultSize: {
      width: 600,
      height: 400,
    },
  },
  imageViewer: {
    icon: '/assets/images/app-icons/apps/image-viewer.png',
    shortname: 'ImageViewer',
    name: 'ImageViewer',
    component: ImageViewer,
    defaultSize: {
      width: 400,
      height: 500,
    },
    defaultProps: {
      realPath: '',
    },
  },
  youtube: {
    icon: '/assets/images/app-icons/apps/youtube.svg',
    shortname: 'YouTube',
    name: 'YouTube',
    component: YouTubeViewer,
    defaultSize: {
      width: 889,
      height: 500,
    },
    defaultProps: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      unmute: true,
    },
  },
  musicPlayer: {
    icon: '/assets/images/app-icons/apps/music-player.svg',
    shortname: 'MusicPlayer',
    name: 'MusicPlayer',
    component: MusicPlayer,
    defaultSize: {
      width: 500,
      height: 300,
    },
    defaultProps: {
      realPath: '/assets/audios/free-fall.mp3',
    },
  },
  paint: {
    icon: '/assets/images/app-icons/apps/paint.svg',
    shortname: 'Paint',
    name: 'Paint',
    component: Paint,
    defaultSize: {
      width: 700,
      height: 500,
    },
  },
};
