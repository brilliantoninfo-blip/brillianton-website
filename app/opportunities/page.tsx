import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Button, Eyebrow, Photo, Reveal } from "@/components/ui/primitives";
import OpportunityExplorer from "./OpportunityExplorer";
import GlobeExplorer from "@/components/GlobeExplorer";
import FinalCTA from "@/sections/home/FinalCTA";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Global Opportunities — Fulbright, Chevening, DAAD, Erasmus Mundus & Commonwealth",
  description:
    "Explore fully funded fellowships and scholarships for Indian students — Fulbright-Nehru, Chevening, DAAD, Erasmus Mundus, Commonwealth — plus Leadership School Finland and pathways to top universities.",
  alternates: { canonical: "/opportunities" },
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Global opportunities"
        title="Where ambition"
        accent="can take you."
        intro="A curated map of the fellowships, scholarships and pathways Brillianton mentees prepare for. Each links to its official source — always confirm eligibility, funding and deadlines there."
      />

      {/* Interactive globe: every pathway starts in India */}
      <section className="field-navy relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="globe-title">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="globe-title" className="text-title font-semibold">
              Follow the pathways, <span className="italic-serif text-sun">from India to the world.</span>
            </h2>
            <p className="max-w-sm text-white/65">Drag the globe, tap a destination, or let it tour on its own.</p>
          </div>
          <div className="mt-12">
            <GlobeExplorer tone="dark" />
          </div>
        </div>
      </section>

      <OpportunityExplorer />

      {/* Featured: Finland */}
      <section className="bg-white py-28 sm:py-36">
        <div className="frame grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow className="text-royal">Featured opportunity</Eyebrow>
            <Reveal>
              <h2 className="display-wide mt-8 text-display font-extrabold uppercase text-ink">
                Leadership School <span className="text-royal">Finland 2026</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">With JAMK University of Applied Sciences — for eligible undergraduate students.</p>
            </Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-4">
              {[
                ["8", "days"],
                ["3", "courses"],
                ["3", "European credits"],
                ["3", "Finnish cities"],
              ].map(([n, l]) => (
                <div key={l} className="bg-paper p-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="display-wide block text-5xl font-extrabold text-royal">{n}</span>
                    <span className="mt-1 block text-sm text-ink/60">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-ink/70">AI · Entrepreneurship · Business Communication — across Jyväskylä, Helsinki and Porvoo.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/insights/leadership-school-finland-2026">Read details</Button>
              <Button href="/contact?interest=Leadership%20School%20Finland%202026" variant="ghost" className="text-ink">
                Enquire
              </Button>
            </div>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <Photo src={photos.glassLibrary} alt="Modern glass-walled university library" className="arch aspect-[4/5] w-full" parallax={8} sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
