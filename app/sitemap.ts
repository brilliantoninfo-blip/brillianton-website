import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/programmes", "/pathway-finder", "/opportunities", "/insights", "/contact"];
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.8 })),
    ...guides.map((g) => ({ url: `${site.url}/guides/${g.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...insights.map((i) => ({ url: `${site.url}/insights/${i.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
