import { createMDX } from "fumadocs-mdx/next";
import "@editorcn/env/web";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // typedRoutes: true, // disabled due to Next.js 16 bug with @base-ui/react Form types
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
  rewrites() {
    return [
      {
        destination: "/llms.mdx/docs/:path*",
        source: "/docs/:path*.md",
      },
    ];
  },
  transpilePackages: ["@editorcn/editor"],
  // `@tiptap/react/menus` only exists in Tiptap v3; this app bundles Tiptap v2 (where
  // `BubbleMenu` lives on the `@tiptap/react` root). The block-editor/rte bubble menus
  // dynamically import `/menus` and fall back to the root at runtime, so webpack must
  // not try to resolve the v3-only subpath during the docs build.
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@tiptap\/react\/menus$/,
      })
    );
    return config;
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
