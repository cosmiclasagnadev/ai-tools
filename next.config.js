/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.**.**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/_next/image*",
      },
    ],
  },
};

module.exports = nextConfig;
