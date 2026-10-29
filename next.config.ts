import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, ""),
  ...(process.env.GITHUB_PAGES === "true"
    ? { output: "export", trailingSlash: true }
    : {}),
};

export default nextConfig;
