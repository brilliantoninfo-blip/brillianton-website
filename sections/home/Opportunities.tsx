"use client";

import Link from "next/link";
import { Arrow, Eyebrow, LineLink, Reveal, SplitWords } from "@/components/ui/primitives";
import GlobeExplorer from "@/components/GlobeExplorer";
import { type Opportunity } from "@/lib/site";

export function OpportunityCard({ o, i }: { o: Opportunity; i: number }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs tabular-nums text-ink/40">{String(i + 1).padStart(2, "0")}</span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
          {o.level}
        </span>
      </div>
      <div className="mt-16 sm:mt-24">
        <p className="eyebrow text-royal transition-colors duration-500 group-hover:text-sun">{o.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{o.name}</h3>
        <p className="mt-1 text-sm text-ink/55 transition-colors duration-500 group-hover:text-white/60">{o.where}</p>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-white/80">{o.summary}</p>
      </div>
      <span className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
        {o.cta}
        <Arrow className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" diagonal={o.external} />
        {o.external && <span className="sr-only">(opens official website in a new tab)</span>}
      </span>
    </>
  );
  const cls =
    "group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-white p-7 text-ink ring-1 ring-ink/5 transition-all duration-700 ease-expo hover:-translate-y-2 hover:bg-royal hover:text-white hover:shadow-[0_40px_80px_-30px_rgba(26,60,240,0.6)]";
  return o.external ? (
    <a href={o.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={o.href} className={cls}>
      {inner}
    </Link>
  );
}

export default function Opportunities() {
  return (
    <section className="relative overflow-hidden bg-sand py-28 sm:py-40" aria-labelledby="opps-title">
      <div aria-hidden className="grid-lines-dark absolute inset-0" />
      <div className="frame relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="04" className="text-royal">
              Global opportunities
            </Eyebrow>
            <h2 id="opps-title" className="mt-8 text-huge font-semibold text-ink">
              <SplitWords text="The world," />
              <br />
              <SplitWords text="mapped." delay={0.1} wordClassName={() => "italic-serif text-royal"} />
            </h2>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg leading-relaxed text-ink/65">
              Every journey starts in India. Spin the globe to follow our mentees&apos; pathways to fellowships, scholarships and universities — each links to its official source for eligibility and deadlines.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <GlobeExplorer />
        </div>

        <div className="mt-12">
          <LineLink href="/opportunities" className="text-royal">
            All global opportunities
          </LineLink>
        </div>
      </div>
    </section>
  );
}
