import type { Metadata } from 'next';
import './globals.css';
import { Background } from './components/Background';
import { ThemeProvider } from './context/ThemeContext';
import { Taskbar } from './components/Taskbar';
import { Desktop } from './components/Desktop';
import { AudioProvider } from './context/AudioContext';

export const metadata: Metadata = {
  title: 'Windows Portfolio - Alexis Estrine',
  description:
    "Découvrez le portfolio interactif d'Alexis Estrine, conçu comme une interface Windows. Explorez mes projets, compétences et expériences dans une expérience unique et immersive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="overflow-hidden">
        <ThemeProvider>
          <AudioProvider>
            <Background />
            {children}
            <Desktop />
            <Taskbar />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
