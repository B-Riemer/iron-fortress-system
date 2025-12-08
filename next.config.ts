import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warnung: Dies erlaubt Produktion-Builds auch bei Linter-Fehlern
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warnung: Dies erlaubt Produktion-Builds auch bei Type-Fehlern
    ignoreBuildErrors: true,
  },
};

export default nextConfig;