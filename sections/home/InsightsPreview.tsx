"use client";

import Link from "next/link";
import { Eyebrow, LineLink, Photo, Reveal, SplitWords } from "@/components/ui/primitives";
import { insights, type Insight } from "@/lib/insights";

export function InsightCard({ post, large = false }: { post: Insight; large?: boolean }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-[24px] ${large ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[16/10]"}`}>
        <Photo src={post.image} alt="" className="h-full w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-105" sizes={large ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 100vw"} />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">{post.category}</span>
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/45">{post.readTime}</p>
        <h3 className={`mt-2 font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-royal ${large ? "text-3xl" : "text-xl"}`}>{post.title}</h3>
        {large && <p className="mt-3 max-w-lg leading-relaxed text-ink/65">{post.excerpt}</p>}
      </div>
    </Link>
  );
}

export default function InsightsPreview() {
  const [feature, ...rest] = insights;
  return (
    <section className="relative bg-white py-28 sm:py-40" aria-labelledby="insights-title">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow index="08" className="text-royal">
              Insights & resources
            </Eyebrow>
            <h2 id="insights-title" className="mt-8 text-display font-semibold text-ink">
              <SplitWords text="Notes from the" /> <SplitWords text="journey." delay={0.1} wordClassName={() => "italic-serif text-royal"} />
            </h2>
          </div>
          <LineLink href="/insights" className="text-royal">
            All insights
          </LineLink>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <InsightCard post={feature} large />
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            {rest.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <InsightCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
