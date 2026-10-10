/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // the printable catalogue always downloads under a clear name, even when its URL is opened directly
        source: '/catalogue/amd-nsri-catalogue.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'attachment; filename="AMD-NSRI-Catalogue.pdf"' },
        ],
      },
    ];
  },
};

export default nextConfig;
