import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { LanguageProvider } from '@/lib/LanguageContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { SITE_URL, OG_LOCALE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  // tab icons (src/app/favicon.ico is added by Next itself) and the phone home-screen icons; the standalone tool
  // pages in public/tools link the same files in their own <head>
  icons: {
    icon: [
      { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'AMD NSRI',
    description:
      'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
    type: 'website',
    locale: OG_LOCALE,
    url: SITE_URL,
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
        {/* Vercel Web Analytics: cookieless page views for every Next.js page. The standalone tool pages
            in public/ (nestri, nestri-pro, ipunch) carry their own copy of the script. */}
        <Analytics />
      </body>
    </html>
  );
}
