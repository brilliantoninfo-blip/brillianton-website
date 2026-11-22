"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteReady } from "@/components/Loader";
import { Button, Marquee, ease } from "@/components/ui/primitives";
import { fellowshipsTicker } from "@/lib/site";

const CityScene = dynamic(() => import("@/components/CityScene"), { ssr: false });

const lines = [
  { text: "Your ambition", cls: "text-white" },
  { text: "has no", cls: "text-white", serif: true },
  { text: "borders.", cls: "text-sun" },
];

export default function Hero() {
  const ready = useSiteReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const show = ready || reduce;

  return (
    <section ref={ref} className="grain relative isolate min-h-[100svh] overflow-hidden bg-deep text-white" aria-labelledby="hero-title">
      {/* Layered background: deep gradient + 3D city + vignette */}
      <div aria-hidden className="field-royal absolute inset-0 -z-10" />
      <motion.div aria-hidden className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 2, ease }}>
        <CityScene className="absolute inset-0 [&_canvas]:!h-full [&_canvas]:!w-full" />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,34,154,0.9)_0%,rgba(6,34,154,0.55)_45%,transparent_75%)] lg:bg-[linear-gradient(90deg,rgba(6,34,154,0.8)_0%,rgba(6,34,154,0.3)_45%,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#06229a] via-[#06229a]/50 to-transparent" />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />

      <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="frame relative flex min-h-[100svh] flex-col justify-end pb-28 pt-32 sm:pb-32">
        <motion.p
          className="eyebrow mb-8 flex items-center gap-3 text-sun"
          initial={{ opacity: 0, x: -20 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <span className="h-px w-10 bg-sun" />
          Brillianton Global Education · International academic mentorship
        </motion.p>

        <h1 id="hero-title" className="display-wide text-mega font-extrabold uppercase">
          {lines.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className={`block ${l.cls} ${l.serif ? "italic-serif normal-case !tracking-[-0.03em] [font-stretch:100%]" : ""}`}
                initial={{ y: "105%" }}
                animate={show ? { y: "0%" } : {}}
                transition={{ duration: 1.3, ease, delay: 0.25 + i * 0.1 }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:pr-20">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-white/75 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.85 }}
          >
            Discover the mentorship, opportunities and global pathways that can take your academic journey further.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 1 }}
          >
            <Button href="/programmes" variant="sun">
              Explore our programmes
            </Button>
            <Button href="/contact" variant="ghost" className="text-white">
              Connect with our team
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#061f8c]/60 backdrop-blur-sm">
        <div className="flex items-center">
          <p className="eyebrow hidden shrink-0 border-r border-white/10 px-8 py-5 text-white/50 md:block">Pathways our mentees prepare for</p>
          <Marquee items={fellowshipsTicker} className="display-wide py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80" separator="/" />
        </div>
      </div>
    </section>
  );
}
