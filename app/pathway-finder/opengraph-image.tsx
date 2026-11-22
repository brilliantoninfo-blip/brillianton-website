import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pathway finder";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Pathway finder", title: "Find your global pathway in one minute" });
}
