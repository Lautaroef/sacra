/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.ibb.co", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
