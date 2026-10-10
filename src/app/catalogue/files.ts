/* The catalogue: one PDF, served untouched from public/catalogue/. The page previews this same file and
   the download button gives this same file. */
export const PDF_FILE = '/catalogue/amd-nsri-catalogue.pdf';
/* the name the PDF is saved under (also sent as Content-Disposition, see next.config.mjs) */
export const PDF_DOWNLOAD_NAME = 'AMD-NSRI-Catalogue.pdf';

/* PDF.js (Mozilla, Apache-2.0) draws the preview. It is the official build, self-hosted in public/vendor
   and fetched only when a visitor asks for the preview. */
export const PDFJS_DIR = '/vendor/pdfjs-5.7.284';
