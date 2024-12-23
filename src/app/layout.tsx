import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
