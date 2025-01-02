import {
  WebView,
  PdfViewer,
  Calculator,
  Terminal,
  FileExplorer,
  type PdfViewerProps,
  type AppDefinition,
} from '@/app/components/apps';

export const apps: AppDefinition[] = [
  {
    icon: '/assets/images/app-icons/taskbar/explorer.svg',
    shortname: 'File Explorer',
    name: 'File Explorer',
    component: FileExplorer,
    defaultSize: {
      width: 800,
      height: 500,
    },
  },
  {
    icon: '/assets/images/app-icons/desktop/vscode.svg',
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
  {
    icon: '/assets/images/app-icons/desktop/chrome.svg',
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
  {
    icon: '/assets/images/app-icons/desktop/pdf.svg',
    shortname: 'CV',
    name: 'CV Estrine Alexis - JS Developper',
    component: PdfViewer,
    defaultSize: {
      width: 800,
      height: 550,
    },
    defaultProps: {
      pdfUrl: '/assets/documents/cv.pdf',
    } as PdfViewerProps,
  },
  {
    icon: '/assets/images/app-icons/desktop/calculator.png',
    shortname: 'Calculator',
    name: 'Calculator',
    component: Calculator,
    defaultSize: {
      width: 300,
      height: 550,
    },
  },
  {
    icon: '/assets/images/app-icons/desktop/terminal.png',
    shortname: 'Terminal',
    name: 'Terminal',
    component: Terminal,
    defaultSize: {
      width: 700,
      height: 400,
    },
  },
  {
    icon: '/assets/images/app-icons/desktop/github.svg',
    shortname: 'GitHub',
    name: 'GitHub',
    component: () => null,
    defaultSize: {
      width: 0,
      height: 0,
    },
    externalUrl: 'https://github.com/iSayZ',
  },
  {
    icon: '/assets/images/app-icons/desktop/linkedin.svg',
    shortname: 'LinkedIn',
    name: 'LinkedIn',
    component: () => null,
    defaultSize: {
      width: 0,
      height: 0,
    },
    externalUrl: 'https://www.linkedin.com/in/alexis-estrine/',
  },
];
