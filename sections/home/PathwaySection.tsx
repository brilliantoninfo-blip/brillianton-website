"use client";

import { Eyebrow, Reveal, SplitWords } from "@/components/ui/primitives";
import PathwayFinder from "@/components/PathwayFinder";

export default function PathwaySection() {
  return (
    <section id="pathway-finder" className="field-navy relative overflow-hidden bg-ink py-28 text-white sm:py-36" aria-labelledby="pathway-title">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div className="frame relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <Eyebrow className="text-sun">Pathway finder</Eyebrow>
          <h2 id="pathway-title" className="mt-8 text-display font-semibold">
            <SplitWords text="Not sure where" />
            <br />
            <SplitWords text="to begin?" delay={0.1} wordClassName={() => "italic-serif text-sun"} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/70">Five quick questions. One recommended pathway — with what to explore first and a free consultation when you&apos;re ready.</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <PathwayFinder tone="dark" />
        </div>
      </div>
    </section>
  );
}
