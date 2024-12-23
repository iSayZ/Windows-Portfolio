import type { Metadata } from 'next';
import './globals.css';
import { Background } from './components/Background';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

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
      <body>
        <ThemeProvider>
          <Background />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
