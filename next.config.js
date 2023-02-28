/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*", "http2.mlstatic.com", "f.fcdn.app", "i.zst.com.br"],
  },
};

module.exports = nextConfig;
