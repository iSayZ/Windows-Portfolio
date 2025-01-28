import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { AnimatedLayout } from './components/AnimatedLayout';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Portfolio Windows | Alexis Estrine - Développeur Web',
  description:
    'Explorez mon portfolio interactif inspiré de Windows. Développeur JavaScript Full-Stack passionné, je crée des expériences web innovantes et performantes. Découvrez mes projets, compétences techniques et réalisations à travers une interface unique.',
  keywords: [
    'développeur frontend',
    'React',
    'Next.js',
    'TypeScript',
    'portfolio interactif',
    'développeur web',
    'Alexis Estrine',
    'interface Windows',
  ],
  authors: [{ name: 'Alexis Estrine' }],
  openGraph: {
    title: 'Portfolio Windows | Alexis Estrine - Développeur Web',
    description:
      "Explorez mon portfolio interactif inspiré de Windows. Développeur JavaScript Full-Stack passionné par l'innovation web.",
    type: 'website',
    images: [
      {
        url: '/assets/meta.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Windows Alexis Estrine',
      },
    ],
    siteName: 'Portfolio Windows | Alexis Estrine - Développeur Web',
    url: 'https://windows.estrine-alexis.fr/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Windows | Alexis Estrine - Développeur Web',
    description:
      "Explorez mon portfolio interactif inspiré de Windows. Développeur JavaScript Full-Stack passionné par l'innovation web.",
    images: ['/assets/meta.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link rel="icon" href="/assets/favicon.svg" type="image/svg" />
      <body className="overflow-hidden">
        <ThemeProvider>
          <AudioProvider>
            {children}
            <Analytics />
            <AnimatedLayout />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
