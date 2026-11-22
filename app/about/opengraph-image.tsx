import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About Brillianton";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About us", title: "Global vision. Personal guidance.", accent: "An imagined city of brilliance" });
}
