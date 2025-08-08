import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    reactCompiler: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
      },
      {
        hostname: "nautical-gerbil-702.convex.cloud",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
