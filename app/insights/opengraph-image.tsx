import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Insights and resources";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Insights & resources", title: "Scholarships, admissions and fellowship advice" });
}
