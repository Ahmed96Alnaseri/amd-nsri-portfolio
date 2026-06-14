import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'AMD NSRI — Architecture, Design, Fabrication',
  description:
    'A design-driven ecosystem connecting architectural imagination with fabrication reality. Architecture, computational design, facade systems, digital tools, and fabrication intelligence.',
  keywords: [
    'architecture', 'computational design', 'facade systems',
    'parametric design', 'fabrication', 'panelization', 'Grasshopper',
    'Istanbul', 'Ahmed Alnaseri'
  ],
  authors: [{ name: 'Ahmed Alnaseri' }],
  openGraph: {
    title: 'AMD NSRI',
    description: 'A design-driven ecosystem connecting architectural imagination with fabrication reality.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
