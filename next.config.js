/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ["@mui/x-charts"],
  images: { unoptimized: true }
};

module.exports = nextConfig;
