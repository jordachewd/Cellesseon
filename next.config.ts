import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Disable source maps in production to avoid 404 errors
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
      source: "/api/:path*",
      headers: [
        {
        key: "Access-Control-Allow-Origin",
        value: "https://cellesseon.vercel.app", // Change this to your specific domain if necessary
        },
        {
        key: "Access-Control-Allow-Methods",
        value: "GET, POST, OPTIONS",
        },
        {
        key: "Access-Control-Allow-Headers",
        value: "Content-Type, Authorization",
        },
      ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
