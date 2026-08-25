import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "Rich text editor components for the shadcn/ui ecosystem.",
    display: "standalone",
    icons: [
      {
        sizes: "16x16",
        src: "/favicon-16x16.png",
        type: "image/png",
      },
      {
        sizes: "32x32",
        src: "/favicon-32x32.png",
        type: "image/png",
      },
      {
        sizes: "96x96",
        src: "/favicon-96x96.png",
        type: "image/png",
      },
      {
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
      {
        sizes: "180x180",
        src: "/apple-touch-icon.png",
        type: "image/png",
      },
    ],
    name: "editorcn",
    short_name: "editorcn",
    start_url: "/",
    theme_color: "#000000",
  };
}
