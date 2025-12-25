import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  // Add cache control headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "max-age=0",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=0",
          },
        ],
      },
    ];
  },
  // Generate unique build ID to force cache invalidation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default withMDX(nextConfig);
