import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Global opportunities";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Global opportunities", title: "Fulbright · Chevening · DAAD · Erasmus Mundus", accent: "From India to the world" });
}
