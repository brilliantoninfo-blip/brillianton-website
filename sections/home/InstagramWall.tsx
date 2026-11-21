"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Eyebrow, SplitWords, ease } from "@/components/ui/primitives";
import { instagramPosts, site } from "@/lib/site";

export function InstagramGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Editorial wall of real @brilliantonglobal posters; every tile opens its Instagram post. */
export default function InstagramWall() {
  return (
    <section className="field-navy relative overflow-hidden bg-ink py-28 text-white sm:py-36" aria-labelledby="ig-title">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="text-sun">On Instagram</Eyebrow>
            <h2 id="ig-title" className="mt-8 text-display font-semibold">
              <SplitWords text="Inside the" /> <SplitWords text="city of brilliance." delay={0.1} wordClassName={() => "italic-serif text-sun"} />
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/70">Workshops, webinars, scholar sessions and mentee milestones — straight from {site.instagramHandle}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/insights#sessions" variant="sun">
              All sessions
            </Button>
            <Button href={site.instagram} external variant="ghost" className="text-white">
              Follow {site.instagramHandle}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable rail · Desktop: staggered editorial grid */}
      <ul className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:mx-auto lg:grid lg:max-w-frame lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden" data-lenis-prevent-horizontal>
        {instagramPosts.map((p, i) => (
          <motion.li
            key={p.src}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease, delay: (i % 4) * 0.08 }}
            className={`w-[72vw] shrink-0 snap-start sm:w-[320px] lg:w-auto ${i % 2 === 1 ? "lg:translate-y-14" : ""}`}
          >
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[22px] bg-navy ring-1 ring-white/10">
              <div className="relative aspect-[4/5]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 25vw, 72vw" className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]" />
              </div>
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <InstagramGlyph className="h-4 w-4" /> View on Instagram
                </span>
              </span>
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
