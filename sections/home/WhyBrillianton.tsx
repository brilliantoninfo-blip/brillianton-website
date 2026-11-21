"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow, Reveal, SplitWords } from "@/components/ui/primitives";
import { pillars } from "@/lib/site";

/**
 * Six reasons as oversized typographic rows. The active row is swept by a
 * sunlight-yellow panel (hover, keyboard focus or tap) — no floating imagery.
 */
export default function WhyBrillianton() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="field-navy relative bg-ink py-28 text-white sm:py-40" aria-labelledby="why-title">
      <div className="frame">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="05" className="text-sun">
              Why Brillianton
            </Eyebrow>
            <h2 id="why-title" className="mt-8 text-display font-semibold">
              <SplitWords text="Not an agency." />
              <br />
              <SplitWords text="A mentorship organisation." delay={0.12} wordClassName={(_, i) => (i === 1 ? "italic-serif text-sun" : undefined)} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                Seeing further than the next deadline is the difference between counselling and mentorship.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <div className="arch relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden bg-[#103fd3] ring-4 ring-sun">
              <Image
                src="/brand/why-brillianton.jpg"
                alt="Illustration of a young professional on a summit, looking ahead through a telescope"
                fill
                sizes="(min-width:1024px) 25vw, 70vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </Reveal>
        </div>

        <ol className="mt-20 border-t border-white/15" onMouseLeave={() => setActive(null)}>
          {pillars.map((p, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={p.title} className="relative border-b border-white/15">
                <div
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : i)}
                  className="group relative grid cursor-default gap-3 overflow-hidden px-4 py-8 outline-none sm:px-6 sm:py-10 lg:grid-cols-12 lg:items-center"
                >
                  {/* sunlight sweep */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 origin-left bg-sun transition-transform duration-700 ease-expo ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  <span className={`relative text-sm tabular-nums transition-colors duration-500 lg:col-span-1 ${on ? "text-ink" : "text-white/40"}`}>
                    0{i + 1}
                  </span>
                  <h3
                    className={`display-wide relative text-[clamp(1.9rem,4.6vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] transition-all duration-700 ease-expo lg:col-span-7 ${
                      on ? "translate-x-2 text-ink lg:translate-x-4" : dim ? "text-white/25" : "text-white"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className={`relative max-w-sm leading-relaxed transition-colors duration-500 lg:col-span-4 ${on ? "text-ink" : dim ? "text-white/35" : "text-white/65"}`}>
                    {p.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
