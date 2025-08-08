/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
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
