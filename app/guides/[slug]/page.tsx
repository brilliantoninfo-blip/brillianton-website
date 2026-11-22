import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { Arrow, Button, Eyebrow, Reveal } from "@/components/ui/primitives";
import FinalCTA from "@/sections/home/FinalCTA";
import { getGuide, guides } from "@/lib/guides";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.metaTitle} | Brillianton` },
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.metaTitle, description: g.metaDescription, url: `/guides/${g.slug}`, type: "article" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides/${g.slug}` },
      { "@type": "ListItem", position: 3, name: g.eyebrow, item: `${site.url}/guides/${g.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero eyebrow={g.eyebrow} title={g.h1} accent={g.accent} intro={g.intro} image={g.image} imageAlt={g.imageAlt} illustration={g.image.includes("graduate-walking")} />

      <article className="bg-paper py-24 sm:py-32">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-8">
            {g.sections.map((s, i) => (
              <Reveal key={s.heading}>
                <section aria-labelledby={`g-${i}`}>
                  <Eyebrow index={`0${i + 1}`} className="text-royal">
                    {g.eyebrow}
                  </Eyebrow>
                  <h2 id={`g-${i}`} className="mt-6 text-title font-semibold text-ink">
                    {s.heading}
                  </h2>
                  {s.body && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/75">{s.body}</p>}
                  {s.points && (
                    <ul className="mt-8 grid gap-px overflow-hidden rounded-[24px] bg-ink/10 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p.title} className="bg-white p-6 sm:p-7">
                          <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                          <p className="mt-2 leading-relaxed text-ink/70">{p.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="field-royal rounded-[28px] p-7 text-white">
                <p className="eyebrow text-sun">Recommended programme</p>
                <p className="mt-3 text-2xl font-semibold">{g.programme.name}</p>
                <p className="mt-1 text-white/75">{g.programme.line}</p>
                <div className="mt-6">
                  <Button href={g.programme.href} variant="sun">
                    Explore
                  </Button>
                </div>
              </div>
              <div className="rounded-[28px] bg-white p-7 ring-1 ring-ink/5">
                <p className="eyebrow text-royal">Read next</p>
                <ul className="mt-4 space-y-3">
                  {g.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="group flex items-start gap-2 font-medium text-ink hover:text-royal">
                        <Arrow className="mt-1.5 h-3 w-3 shrink-0 transition-transform group-hover:translate-x-1" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] bg-sun p-7 text-ink">
                <p className="text-lg font-semibold">Talk to a mentor</p>
                <p className="mt-1 text-ink/75">Free first consultation on WhatsApp.</p>
                <a href={`${site.whatsapp}?text=${encodeURIComponent(`Hello Brillianton, I read your guide on ${g.eyebrow.toLowerCase()} and would like a free consultation.`)}`} target="_blank" rel="noopener noreferrer" data-cta="guide-whatsapp" className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white">
                  Message on WhatsApp <Arrow className="h-3 w-3" diagonal />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <FAQ items={g.faqs} title="Common questions, answered." id="guide-faq" />
      <FinalCTA />
    </>
  );
}
