import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next build` and `next dev` share `.next` by default, so a build run while
   * the dev server is up overwrites its artifacts and the browser starts
   * failing to fetch RSC payloads for a build ID that no longer exists.
   * Set NEXT_DIST_DIR to typecheck-build into a scratch directory instead:
   *   NEXT_DIST_DIR=.next-verify pnpm build
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
