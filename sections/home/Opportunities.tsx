"use client";

import { Eyebrow, Reveal, SplitWords } from "@/components/ui/primitives";
import OpportunityFinder from "@/components/OpportunityFinder";

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
              <SplitWords text="searchable." delay={0.1} wordClassName={() => "italic-serif text-royal"} />
            </h2>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg leading-relaxed text-ink/65">
              Scholarships, fellowships, internships and summer programmes across the world. Search by country, level or field — and walk the campus before you apply.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <OpportunityFinder limit={6} />
        </div>
      </div>
    </section>
  );
}
