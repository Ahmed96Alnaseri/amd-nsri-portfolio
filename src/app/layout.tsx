import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { LanguageProvider } from '@/lib/LanguageContext';
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://amd-nsri-portfolio-alpha.vercel.app'),
  title: {
    default: 'AMD NSRI',
    template: '%s — AMD NSRI',
  },
  description:
    'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
  keywords: [
    'architecture', 'computational design', 'facade systems',
    'parametric design', 'fabrication', 'panelization', 'Grasshopper',
    'Istanbul', 'Ahmed Alnaseri'
  ],
  authors: [{ name: 'Ahmed Alnaseri' }],
  openGraph: {
    title: 'AMD NSRI',
    description:
      'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
    type: 'website',
    locale: 'en_US',
    url: 'https://amd-nsri-portfolio-alpha.vercel.app',
    siteName: 'AMD NSRI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMD NSRI',
    description:
      'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            <main id="main-content">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
