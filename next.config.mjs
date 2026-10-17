import fs from 'fs';

/* Files moved in the public/ clean-up (config/moved-public-files.json) and in later per-project image work
   (config/moved/<project>.json, one file per project so each can be rolled back on its own). The standalone tool
   pages keep their public URLs through rewrites; every other old file URL answers with a permanent redirect. */
const readMoves = (url) => JSON.parse(fs.readFileSync(url, 'utf8')).moves;
const movedDir = new URL('./config/moved/', import.meta.url);
const moves = [
  ...readMoves(new URL('./config/moved-public-files.json', import.meta.url)),
  ...(fs.existsSync(movedDir)
    ? fs.readdirSync(movedDir).filter((f) => f.endsWith('.json')).sort().flatMap((f) => readMoves(new URL(f, movedDir)))
    : []),
];
// a file moved twice (renamed in the clean-up, then optimised) redirects straight to where it is now, in one hop
const next = new Map(moves.filter((m) => !m.rewrite).map((m) => [m.from, m.to]));
const finalPath = (p) => { const seen = new Set(); while (next.has(p) && !seen.has(p)) { seen.add(p); p = next.get(p); } return p; };
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
    return [
      // the site's first address still reaches the production deployment: send every request on it, path and
      // query kept, to the same page on amdnsri.com (SITE_URL in src/lib/seo.ts). Only this exact host matches,
      // so amdnsri.com, www and the preview deployments are untouched. It comes first so moved files take one hop.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'amd-nsri-portfolio-alpha.vercel.app' }],
        destination: 'https://amdnsri.com/:path*',
        permanent: true,
      },
      // the Custom Grasshopper Scripts service was taken off the site; its page sends visitors to the Tools page
      { source: '/tools/grasshopper-scripts', destination: '/tools', permanent: true },
      ...moves
        .filter((m) => !m.rewrite)
        .flatMap((m) => sources(m.from).map((source) => ({ source, destination: finalPath(m.from), permanent: true }))),
    ];
  },
};

export default nextConfig;
