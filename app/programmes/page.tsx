import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Button, Eyebrow, Photo, Reveal } from "@/components/ui/primitives";
import { FutureFellows, QS100 } from "@/sections/home/Programmes";
import Approach from "@/sections/home/Approach";
import FinalCTA from "@/sections/home/FinalCTA";
import FAQ from "@/components/FAQ";
import { institutionServices, photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programmes — Mission QS100 (Grades 8–12) & Future Fellows Scholarships Mentorship",
  description:
    "Mission QS100 mentors Grades 8–12 students for Oxford, Cambridge, Ivy League and QS Top 100 admissions. Future Fellows prepares graduates for fully funded fellowships like Fulbright, Chevening and DAAD. Plus programmes for schools and colleges.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our programmes"
        title="Built for the"
        accent="long road."
        intro="Two flagship mentorship pathways for students, and a partnership model for institutions. No guaranteed outcomes — just structured, expert guidance that makes every candidate stronger."
        image="/brand/graduate-walking.jpg"
        imageAlt="Illustration of a graduate in academic robes walking forward"
        illustration
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="frame space-y-8">
          <nav aria-label="Programmes on this page" className="flex flex-wrap gap-2 pb-6">
            {[
              ["#mission-qs100", "Mission QS100"],
              ["#future-fellows", "Future Fellows"],
              ["#institutions", "For institutions"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="min-h-[44px] rounded-full px-5 py-3 text-sm font-medium text-ink ring-1 ring-ink/15 transition hover:bg-ink hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Reveal y={50}>
            <QS100 />
          </Reveal>
          <Reveal y={50}>
            <FutureFellows />
          </Reveal>
        </div>
      </section>

      <Approach />

      <section id="institutions" className="relative overflow-hidden bg-ink py-28 text-white sm:py-40">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div className="frame relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-sun">For institutions</Eyebrow>
              <h2 className="display-wide mt-8 text-huge font-extrabold uppercase">
                Go <span className="text-outline text-sun">global.</span>
              </h2>
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-white/70">
                Brillianton acts as the internationalisation partner for academic institutions — building structured global exposure into a school&apos;s calendar, and serving as the international relations desk for colleges that do not yet have one.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Photo src="/brand/campus-4.jpg" alt="A Brillianton speaker addressing a classroom of school students" className="arch-sm h-full min-h-[360px] w-full" parallax={6} duotone={false} sizes="(min-width:1024px) 30vw, 100vw" />
            </Reveal>
            {[institutionServices.schools, institutionServices.colleges].map((s, i) => (
              <Reveal key={s.title} delay={0.1 * (i + 1)} className="lg:col-span-4">
                <article className="flex h-full flex-col rounded-[28px] bg-white/[0.05] p-8 ring-1 ring-white/10">
                  <p className="eyebrow text-sun">{i === 0 ? "Schools" : "Colleges & universities"}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-white/65">{s.lead}</p>
                  <ul className="mt-8 space-y-4 border-t border-white/10 pt-6">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3 text-white/85">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/contact?interest=Institutional%20partnership" variant="sun">
              Discuss a partnership
            </Button>
          </div>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
