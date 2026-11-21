"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow, Reveal } from "@/components/ui/primitives";
import { approach } from "@/lib/site";

function Step({ s, i, progress }: { s: (typeof approach)[number]; i: number; progress: MotionValue<number> }) {
  const n = approach.length;
  const start = i / n;
  const lit = useTransform(progress, [start - 0.08, start + 0.04], [0.25, 1]);
  return (
    <motion.article style={{ opacity: lit }} className="relative flex w-[78vw] shrink-0 flex-col justify-between border-l border-ink/15 pl-8 pr-10 sm:w-[46vw] lg:w-[36vw] xl:w-[32vw] max-w-[540px]">
      <div>
        <span className="eyebrow text-royal">Stage 0{i + 1}</span>
        <h3 className="display-wide mt-6 text-[clamp(2.4rem,4.1vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-ink">{s.step}</h3>
      </div>
      <div className="mt-16">
        <p className="text-2xl font-semibold text-ink">{s.line}</p>
        <p className="mt-3 max-w-sm leading-relaxed text-ink/65">{s.detail}</p>
      </div>
    </motion.article>
  );
}

/** Pinned horizontal journey on desktop; a vertical timeline on small screens. */
export default function Approach() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 96));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <section ref={ref} className="relative hidden bg-paper lg:block" style={{ height: reduce ? "auto" : "360vh" }} aria-labelledby="approach-title">
        <div className={`${reduce ? "" : "sticky top-0 h-screen"} flex flex-col justify-center overflow-hidden py-24`}>
          <div className="frame flex items-end justify-between gap-10">
            <div>
              <Eyebrow index="06" className="text-royal">
                Our approach
              </Eyebrow>
              <h2 id="approach-title" className="mt-6 text-display font-semibold text-ink">
                Five stages. <span className="italic-serif text-royal">One journey.</span>
              </h2>
            </div>
            <p className="display-wide hidden text-sm font-semibold uppercase tracking-[0.3em] text-ink/40 xl:block">
              Discover → Develop → Prepare → Apply → Progress
            </p>
          </div>

          <div className="frame mt-10">
            <div className="relative h-[2px] w-full bg-ink/10">
              <motion.div className="absolute inset-y-0 left-0 bg-royal" style={{ width: bar }} />
            </div>
          </div>

          <motion.div ref={track} style={reduce ? undefined : { x }} className="mt-14 flex h-[50vh] min-h-[360px] pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
            {approach.map((s, i) => (
              <Step key={s.step} s={s} i={i} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile & tablet: vertical timeline */}
      <section className="relative bg-paper py-28 lg:hidden" aria-labelledby="approach-title-m">
        <div className="frame">
          <Eyebrow index="06" className="text-royal">
            Our approach
          </Eyebrow>
          <h2 id="approach-title-m" className="mt-6 text-display font-semibold text-ink">
            Five stages. <span className="italic-serif text-royal">One journey.</span>
          </h2>
          <ol className="relative mt-14 space-y-12 border-l-2 border-royal/20 pl-8">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.step} className="relative">
                <span aria-hidden className="absolute -left-[41px] top-2 h-4 w-4 rounded-full bg-royal ring-4 ring-paper" />
                <span className="eyebrow text-royal">Stage 0{i + 1}</span>
                <h3 className="display-wide mt-2 text-5xl font-extrabold uppercase tracking-tight text-ink">{s.step}</h3>
                <p className="mt-3 text-xl font-semibold text-ink">{s.line}</p>
                <p className="mt-2 text-ink/65">{s.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
