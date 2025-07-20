import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/internal",
  trailingSlash: false,
  assetPrefix: "/admin-static",
  output: "standalone",
};

export default nextConfig;
