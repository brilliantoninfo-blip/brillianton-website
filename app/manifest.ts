import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brillianton Global Education",
    short_name: "Brillianton",
    description: "International academic mentorship for top global universities, fellowships and scholarships.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A30C4",
    theme_color: "#0A30C4",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
