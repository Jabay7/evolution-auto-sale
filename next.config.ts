import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export: the whole site is prerendered to /out and served by GitHub
   * Pages, which runs no Node process. Nothing here is dynamic, so nothing is
   * lost — except the image optimiser, hence `unoptimized`. Source images are
   * pre-sized in scripts/prepare-images.mjs instead.
   */
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
