import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import CatalogueView from './CatalogueView';
import { PDF_FILE } from './files';

export const metadata: Metadata = pageMetadata({
  name: 'Catalogue',
  path: '/catalogue',
  description:
    'The AMD NSRI catalogue — facade systems, surface logic and fabrication. Preview it on the page or download the PDF.',
});

/* The size is read when the page is built, so replacing the file and redeploying updates the label on its own. */
function sizeOf(publicPath: string): number {
  try {
    return fs.statSync(path.join(process.cwd(), 'public', publicPath)).size;
  } catch {
    return 0;
  }
}

export default function CataloguePage() {
  return <CatalogueView pdfBytes={sizeOf(PDF_FILE)} />;
}
