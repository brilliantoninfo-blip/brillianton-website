import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getGuide, guides } from "@/lib/guides";

export const alt = "Brillianton guide";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  return renderOg({ eyebrow: g?.eyebrow ?? "Guide", title: g ? `${g.h1} ${g.accent}` : "Brillianton guide" });
}
