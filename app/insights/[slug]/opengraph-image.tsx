import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getInsight, insights } from "@/lib/insights";

export const alt = "Brillianton insight";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  return renderOg({ eyebrow: post?.category ?? "Insights", title: post?.title ?? "Brillianton Insights" });
}
