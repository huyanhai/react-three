/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    turbo: {
      rules: {
        "*.glsl": ["raw-loader"],
      },
    },
  },
};

module.exports = nextConfig;
