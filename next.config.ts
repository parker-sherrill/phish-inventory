import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    // 🚀 Ignore lint errors during `next build` (good for quick deploys)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
