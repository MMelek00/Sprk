/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["http://localhost:3001"],
    path: "/",
  },
};

module.exports = nextConfig;
