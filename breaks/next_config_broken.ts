/**
 * BREAK: build_failure
 * ───────────────────────────────────────────────────────────────────────────
 * Bug: next.config.ts references an invalid experimental option
 * `appDir: true` which was removed in Next.js 14 and causes a hard build
 * error in Next.js 15.
 *
 * GitHub Actions output will show:
 *   > next build
 *   Error: Invalid next.config.ts options detected:
 *   The following fields are not supported: experimental.appDir
 *   See https://nextjs.org/docs/app for the correct configuration.
 *   Error: Command failed: npm run build
 *   Exit code: 1
 * ───────────────────────────────────────────────────────────────────────────
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // BUG: appDir was removed in Next.js 14 — causes build error in v15
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
};

export default nextConfig;
