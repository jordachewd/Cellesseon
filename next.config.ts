import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Disable source maps in production to avoid 404 errors
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
