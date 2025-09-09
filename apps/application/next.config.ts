import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações básicas
  reactStrictMode: true,

  // Configuração do TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuração do ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configuração do webpack
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
