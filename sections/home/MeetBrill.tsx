"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Eyebrow, Reveal, Tilt, ease } from "@/components/ui/primitives";

const lines = [
  "Your ambition is the starting point — not the application.",
  "Grade 8 is not too early to think about Oxford.",
  "Fulbright, Chevening, DAAD — let's find the one that fits you.",
  "Great statements are lived first, then written.",
];

/**
 * Brill — the face of Brillianton — as a layered depth portrait: frames, photo and notes
 * sit on separate 3D planes that tilt with the pointer, while a speech bubble cycles his advice.
 */
export default function MeetBrill() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setLine((l) => (l + 1) % lines.length), 4200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section className="field-royal relative overflow-hidden bg-deep py-28 text-white sm:py-40" aria-labelledby="brill-title">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_55%_at_28%_50%,rgba(255,212,59,0.22),transparent_70%)]" />
      <div className="frame relative grid items-center gap-16 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-6">
          {/* Layered depth stage: arch frames, portrait and notes sit on different planes and tilt with the pointer */}
          <Tilt max={9} className="relative aspect-[3/4]">
            <div aria-hidden className="arch absolute inset-[-5%] border border-sun/50" style={{ transform: "translateZ(-70px)" }} />
            <div aria-hidden className="arch absolute inset-x-[4%] bottom-[-3%] top-[5%] bg-gradient-to-b from-[#2e5bff] to-[#0a2aa8]" style={{ transform: "translateZ(-40px)" }} />
            <div className="arch absolute inset-0 overflow-hidden bg-navy shadow-[0_50px_100px_-30px_rgba(11,18,54,0.8)] ring-4 ring-sun" style={{ transform: "translateZ(0px)" }}>
              <div className="absolute inset-0 animate-breathe">
                <Image src="/brand/brill.jpg" alt="Brill, the face of Brillianton Global Education, smiling in a university library" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-top" />
              </div>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
              <p className="absolute bottom-6 left-0 right-0 text-center">
                <span className="display-wide block text-4xl font-extrabold uppercase tracking-tight">Brill</span>
                <span className="eyebrow mt-1 block text-sun">Your Brillianton guide</span>
              </p>
            </div>
            <motion.div
              className="absolute -left-3 top-[18%] sm:-left-12"
              style={{ z: 80 }}
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm backdrop-blur-xl ring-1 ring-white/25">
                <p className="text-white/75">With you from</p>
                <p className="font-semibold">first ambition to admission</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-3 top-[50%] sm:-right-12"
              style={{ z: 110 }}
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl bg-sun px-4 py-3 text-sm text-ink shadow-xl">
                <p className="font-semibold">Grades 8–12 → PG</p>
                <p className="opacity-70">one continuous journey</p>
              </div>
            </motion.div>
          </Tilt>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Eyebrow index="03" className="text-sun">
            Meet Brill
          </Eyebrow>
          <Reveal>
            <h2 id="brill-title" className="mt-8 text-display font-semibold">
              The face of <span className="italic-serif text-sun">Brillianton.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Brill represents every mentee&apos;s guide: patient, ambitious on your behalf, and always one step ahead of the next deadline. Ask Brill anything — about programmes, timelines or where to begin.
            </p>
          </Reveal>

          <div className="relative mt-10 min-h-[120px] rounded-3xl rounded-tl-md bg-white/[0.06] p-6 ring-1 ring-white/10" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease }}
                className="text-xl leading-snug sm:text-2xl"
              >
                &ldquo;{lines[line]}&rdquo;
              </motion.p>
            </AnimatePresence>
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {lines.map((_, i) => (
                <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === line ? "w-8 bg-sun" : "w-2 bg-white/25"}`} />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Button variant="sun" onClick={() => window.dispatchEvent(new Event("brill:open"))}>
              Ask Brill a question
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
