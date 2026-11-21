import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Eyebrow, LineLink, Reveal } from "@/components/ui/primitives";
import InsightsBrowser from "./InsightsBrowser";
import InstagramFeed from "./InstagramFeed";
import SessionsGallery from "@/components/SessionsGallery";
import { sessions } from "@/lib/sessions";
import { photos, site, webinars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights & Resources",
  description: "Scholarship updates, fellowship opportunities, university spotlights, application advice and webinar recordings from Brillianton Global Education.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & resources"
        title="Notes from"
        accent="the journey."
        intro="Scholarship updates, fellowship opportunities, university spotlights, application advice and student development — written by the Brillianton team."
        image={photos.curvedLibrary}
        imageAlt="Curved shelves of a grand library"
      />

      <InsightsBrowser />

      {/* Sessions archive from Instagram */}
      <section id="sessions" className="bg-sand py-28 sm:py-36" aria-labelledby="sessions-title">
        <div className="frame">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-royal">Sessions</Eyebrow>
              <h2 id="sessions-title" className="mt-8 text-display font-semibold text-ink">
                Every session, <span className="italic-serif text-royal">in one place.</span>
              </h2>
            </div>
            <p className="text-lg text-ink/65 lg:col-span-5">
              {sessions.length} posters and clips from Global Fellowship Orientation, Global Futures, Achievers&apos; Dialogue and guest sessions — straight from {site.instagramHandle}.
            </p>
          </div>
          <div className="mt-12">
            <SessionsGallery />
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section id="webinars" className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div className="frame relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-sun">Webinars</Eyebrow>
              <h2 className="mt-8 text-display font-semibold">
                Achievers&apos; <span className="italic-serif text-sun">Dialogue.</span>
              </h2>
            </div>
            <p className="text-lg text-white/70 lg:col-span-5">Free sessions with scholars who made it — Chevening, Harvard, Erasmus Mundus. Every recording is free to watch.</p>
          </div>

          <div className="mt-16 space-y-6">
            {webinars.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <article className="grid overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10 lg:grid-cols-12">
                  <div className="relative aspect-[4/3] bg-[#0b1650] lg:col-span-4 lg:aspect-auto lg:min-h-[300px]">
                    <Image src={w.poster} alt={`${w.series} poster`} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-contain" />
                  </div>
                  <div className="p-8 sm:p-10 lg:col-span-8">
                    <p className="eyebrow text-sun">
                      {w.series} · {w.date}
                    </p>
                    <h3 className="mt-4 text-title font-semibold">{w.title}</h3>
                    <ul className="mt-6 space-y-2 text-white/75">
                      {w.speakers.map((s) => (
                        <li key={s.name}>
                          <span className="font-semibold text-white">{s.name}</span> — {s.credential}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                      {w.recordings.map((r) => (
                        <LineLink key={r.url} href={r.url} external className="text-sun">
                          {r.title}
                        </LineLink>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-paper py-28 sm:py-36">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="text-royal">On Instagram</Eyebrow>
              <h2 className="mt-8 text-display font-semibold text-ink">{site.instagramHandle}</h2>
            </div>
            <LineLink href={site.instagram} external className="text-royal">
              Follow us
            </LineLink>
          </div>
          <div className="mt-12">
            <InstagramFeed />
          </div>
        </div>
      </section>
    </>
  );
}
