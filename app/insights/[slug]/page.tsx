import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Photo } from "@/components/ui/primitives";
import { InsightCard } from "@/sections/home/InsightsPreview";
import { getInsight, insights } from "@/lib/insights";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/insights/${slug}` }, openGraph: { title: post.title, description: post.excerpt, type: "article" } };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();
  const related = insights.filter((i) => i.slug !== slug).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        articleSection: post.category,
        image: `${site.url}/insights/${post.slug}/opengraph-image`,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: `${site.url}/insights/${post.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${site.url}/insights` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/insights/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="relative overflow-hidden bg-ink pb-16 pt-40 text-white sm:pt-48">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div className="frame relative max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-white/55">
            <Link href="/insights" className="hover:text-sun">
              Insights
            </Link>{" "}
            / <span className="text-white/80">{post.category}</span>
          </nav>
          <h1 className="mt-8 text-display font-semibold">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">{post.excerpt}</p>
          <p className="eyebrow mt-8 text-sun">{post.readTime}</p>
        </div>
      </header>
      <div className="bg-ink">
        <div className="frame">
          <Photo src={post.image} alt="" className="aspect-[21/9] w-full rounded-t-[28px]" priority />
        </div>
      </div>

      <div className="bg-paper py-20 sm:py-28">
        <div className="frame max-w-3xl">
          <div className="space-y-6 text-lg leading-[1.75] text-ink/80">
            {post.body.map((b, i) => {
              if (b.type === "h")
                return (
                  <h2 key={i} className="pt-6 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {b.text}
                  </h2>
                );
              if (b.type === "quote")
                return (
                  <blockquote key={i} className="my-10 border-l-2 border-royal pl-6 text-2xl leading-snug text-ink sm:text-3xl">
                    <span className="italic-serif">{b.text}</span>
                  </blockquote>
                );
              if (b.type === "list")
                return (
                  <ul key={i} className="space-y-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-4">
                        <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
          <div className="mt-16 rounded-[28px] bg-royal p-8 text-white sm:p-10">
            <p className="text-2xl font-semibold">Want guidance on your own path?</p>
            <p className="mt-2 text-white/75">Talk to the Brillianton team about Mission QS100 or Future Fellows.</p>
            <div className="mt-6">
              <Button href="/contact" variant="light">
                Connect with our team
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="related-title">
        <div className="frame">
          <h2 id="related-title" className="text-title font-semibold text-ink">
            Keep reading
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <InsightCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
