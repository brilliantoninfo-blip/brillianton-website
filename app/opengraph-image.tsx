import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Brillianton Global Education";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "International academic mentorship", title: "Your ambition has no borders." });
}
