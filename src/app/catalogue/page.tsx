import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import CatalogueView from './CatalogueView';
import { WEB_FILE, PDF_FILE } from './files';

export const metadata: Metadata = pageMetadata({
  name: 'Catalogue',
  path: '/catalogue',
  description:
    'The AMD NSRI catalogue — facade systems, surface logic and fabrication. Browse the web edition or download the printable PDF.',
});

/* The sizes are read when the page is built, so replacing a file and redeploying updates the labels on its own. */
function sizeOf(publicPath: string): number {
  try {
    return fs.statSync(path.join(process.cwd(), 'public', publicPath)).size;
  } catch {
    return 0;
  }
}

export default function CataloguePage() {
  return <CatalogueView webBytes={sizeOf(WEB_FILE)} pdfBytes={sizeOf(PDF_FILE)} />;
}
