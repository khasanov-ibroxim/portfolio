/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ STATIC EXPORT
  output: 'export',

  // ✅ Images configuration - unoptimized for static export
  images: {
    unoptimized: true,
  },

  // ✅ Trailing slash
  trailingSlash: true,

  // ✅ Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;