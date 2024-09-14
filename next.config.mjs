/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com/**",
      },
      {
        protocol: "https",
        hostname: "exciting-ladybug-809.convex.cloud/**",
      },
    ],
  },
};

export default nextConfig;
