import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Mission QS100 and Future Fellows";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Our programmes", title: "Mission QS100 & Future Fellows", accent: "Mentorship for top universities and fellowships" });
}
