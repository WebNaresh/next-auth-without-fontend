/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "images.pexels.com"],
  },
  // output: "export",
};

module.exports = nextConfig;
