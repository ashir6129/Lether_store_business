import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/webp"],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
