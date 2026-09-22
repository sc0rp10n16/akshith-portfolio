import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about/writings",
        destination: "/writings",
        permanent: true,
      },
      {
        source: "/about/writings/:slug",
        destination: "/writings/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
