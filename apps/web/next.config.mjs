/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@kodnest/db', '@kodnest/shared'],
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
};

export default nextConfig;
