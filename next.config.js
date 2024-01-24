/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
};

module.exports = nextConfig;
