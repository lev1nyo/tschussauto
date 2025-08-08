/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path((?!sitemap\\.xml|sitemap-0\\.xml|robots\\.txt).*)',
        has: [
          {
            type: 'host',
            value: 'tschüssauto.de',
          },
        ],
        destination: 'https://xn--tschssauto-deb.de/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
