const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: ['lh3.googleusercontent.com', 'vercel.com'],
  }, 
  async redirects () {   
    return [
      {
        source: '/github',
        destination: 'https://github.com/steven-tey/precedent',
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
