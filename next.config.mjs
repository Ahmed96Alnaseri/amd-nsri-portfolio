import fs from 'fs';

/* Files moved in the public/ clean-up (config/moved-public-files.json). The standalone tool pages keep their
   public URLs through rewrites; every other old file URL answers with a permanent redirect to its new home. */
const { moves } = JSON.parse(fs.readFileSync(new URL('./config/moved-public-files.json', import.meta.url), 'utf8'));
// redirect sources are path patterns: characters with a meaning there are escaped
const literal = (p) => p.replace(/[\\:()*+?{}[\]]/g, (c) => '\\' + c);
// requests arrive percent-encoded (a space as %20, ı as %C4%B1), so each old path is matched in that form too
const encoded = (p) => p.split('/').map(encodeURIComponent).join('/');
const sources = (p) => [...new Set([p, encoded(p)])].map(literal);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // the catalogue PDF opens in the browser's viewer when its URL is visited ("Open PDF"), and is saved
        // under a clean name from there or from the page's Download button
        source: '/catalogue/amd-nsri-catalogue.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'inline; filename="AMD-NSRI-Catalogue.pdf"' },
        ],
      },
    ];
  },
  async rewrites() {
    // /ipunch.html, /nestri.html, /nestri-pro.html stay the addresses visitors, links and analytics use
    return moves.filter((m) => m.rewrite).map((m) => ({ source: m.from, destination: m.to }));
  },
  async redirects() {
    return moves
      .filter((m) => !m.rewrite)
      .flatMap((m) => sources(m.from).map((source) => ({ source, destination: m.to, permanent: true })));
  },
};

export default nextConfig;
