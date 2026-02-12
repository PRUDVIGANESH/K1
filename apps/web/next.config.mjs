/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@kodnest/db', '@kodnest/shared'],
};

export default nextConfig;
