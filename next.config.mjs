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
};

export default nextConfig;
