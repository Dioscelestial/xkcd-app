/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["img-xkcd.com", "imgs.xkcd.com"],
  },
};

module.exports = nextConfig;
