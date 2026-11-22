"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Eyebrow, Reveal, SplitWords, Tilt, ease } from "@/components/ui/primitives";
import { programmes, type Programme } from "@/lib/site";

export function FocusList({ items, tone }: { items: Programme["focus"]; tone: "blue" | "sun" }) {
  const [active, setActive] = useState(0);
  const light = tone === "sun";
  const line = light ? "border-ink/20" : "border-white/25";
  const c = light
    ? { numOn: "text-royal", numOff: "text-ink/45", on: "text-ink", off: "text-ink/70", detail: "text-ink/75" }
    : { numOn: "text-sun", numOff: "text-white/45", on: "text-white", off: "text-white/70", detail: "text-white/75" };
  return (
    <ul className={`border-t ${line}`}>
      {items.map((f, i) => {
        const on = active === i;
        return (
          <li key={f.title} className={`border-b ${line}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={on}
              className="flex w-full items-center gap-5 py-4 text-left"
            >
              <span className={`w-7 text-xs tabular-nums transition-colors ${on ? c.numOn : c.numOff}`}>0{i + 1}</span>
              <span className={`flex-1 text-lg font-medium transition-all duration-500 sm:text-xl ${on ? `translate-x-1 ${c.on}` : c.off}`}>{f.title}</span>
              <span aria-hidden className={`relative h-3 w-3 transition-transform duration-500 ${on ? "rotate-45" : ""}`}>
                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className={`overflow-hidden pl-12 pr-6 ${c.detail}`}
                >
                  <span className="block pb-5">{f.detail}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function QS100() {
  const p = programmes[0];
  return (
    <article id={p.slug} className="field-royal relative overflow-hidden rounded-[32px] text-white sm:rounded-[44px]">
      <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-azure/50 blur-[120px]" />
      <div className="relative grid gap-12 p-6 pb-10 sm:p-12 lg:grid-cols-12 lg:p-16">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-royal">{p.audience}</span>
            <span className="text-sm text-white/75">{p.duration}</span>
          </div>
          <h3 className="display-wide mt-8 text-huge font-extrabold uppercase">
            <span className="block">Mission</span>
            <span className="block text-sun">QS100</span>
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{p.summary}</p>
          <div className="mt-10">
            <FocusList items={p.focus} tone="blue" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <Tilt className="mx-auto w-full max-w-sm" max={8}>
            <div className="arch relative aspect-[1/1.45] overflow-hidden bg-[#062ac6] shadow-[0_40px_80px_-30px_rgba(11,18,54,0.7)] ring-4 ring-sun">
              <Image src={p.image} alt="Mission QS-100 2026–2027 cohort badge" fill sizes="(min-width:1024px) 30vw, 80vw" className="object-cover object-top" />
            </div>
          </Tilt>
          <div>
            <p className="eyebrow text-white/60">Aspiring towards</p>
            <p className="mt-3 text-2xl font-semibold leading-snug">{p.targets.join(" · ")}</p>
            <div className="mt-8">
              <Button href="/programmes#mission-qs100" variant="sun">
                Explore Mission QS100
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FutureFellows() {
  const p = programmes[1];
  return (
    <article id={p.slug} className="relative overflow-hidden rounded-[32px] bg-sun text-ink sm:rounded-[44px]">
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/50 blur-[120px]" />
      <div className="relative grid gap-12 p-6 pb-10 sm:p-12 lg:grid-cols-12 lg:p-16">
        <div className="order-2 flex flex-col justify-between gap-10 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm">
            <Tilt max={7}>
              <div className="arch relative aspect-[1/1.35] overflow-hidden bg-[#042bc7] shadow-[0_40px_80px_-30px_rgba(11,18,54,0.6)]">
                <Image src="/brand/future-fellows.jpg" alt="Illustration of a young graduate in cap and cape reaching upward" fill sizes="(min-width:1024px) 30vw, 80vw" className="object-cover object-[60%_20%]" />
              </div>
            </Tilt>
            <ul className="absolute -right-2 top-10 space-y-2 sm:-right-8" aria-label="Target fellowships">
              {p.targets.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease }}
                  className="w-fit rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-lg"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ink/60">Mentored by</p>
            <p className="mt-3 text-xl leading-snug text-ink/85">Fellowship alumni and researchers who have earned these awards themselves.</p>
            <div className="mt-8">
              <Button href="/programmes#future-fellows" variant="solid">
                Explore Future Fellows
              </Button>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sun">UG · PG · Professionals</span>
            <span className="text-sm text-ink/70">{p.duration}</span>
          </div>
          <h3 className="display-wide mt-8 text-huge font-extrabold uppercase">
            <span className="block">Future</span>
            <span className="block text-royal">Fellows</span>
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{p.summary}</p>
          <div className="mt-10">
            <FocusList items={p.focus} tone="sun" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Programmes() {
  return (
    <section className="relative bg-paper pb-28 sm:pb-40" aria-labelledby="programmes-title">
      <div className="frame">
        <div className="grid gap-8 border-t border-ink/10 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="02" className="text-royal">
              Flagship programmes
            </Eyebrow>
          </div>
          <div className="lg:col-span-7">
            <h2 id="programmes-title" className="text-display font-semibold text-ink">
              <SplitWords text="Two pathways." />
              <br />
              <SplitWords text="One long-term mentor." delay={0.15} wordClassName={(_, i) => (i === 3 ? "italic-serif text-royal" : undefined)} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-ink/65">
                Whether the goal is a leading university after school or a prestigious fellowship after graduation, each mentee follows a structured, individual roadmap.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-8 sm:mt-24">
          <Reveal y={60}>
            <QS100 />
          </Reveal>
          <Reveal y={60}>
            <FutureFellows />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
