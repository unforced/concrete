import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  // Disable experimental features
  experimental: {
    // Disable turbopack
  },
  // Use the default webpack compiler
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
