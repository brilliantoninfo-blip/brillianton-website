import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Brillianton";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Talk to a mentor about your next step", accent: "Free first consultation" });
}
