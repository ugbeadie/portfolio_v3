import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a build run without clobbering the dev server's .next:
  //   NEXT_DIST_DIR=.next-verify pnpm build
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
