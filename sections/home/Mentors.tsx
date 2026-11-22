"use client";

import Image from "next/image";
import { Eyebrow, LineLink, Reveal, SplitWords } from "@/components/ui/primitives";
import { mentors, webinars } from "@/lib/site";

const initials = (n: string) =>
  n
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

export function MentorGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
      {mentors.map((m, i) => (
        <Reveal as="li" key={m.name} delay={i * 0.05} className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-royal hover:text-white sm:p-9">
          <div className="flex items-start justify-between">
            <span className="display-wide grid h-14 w-14 place-items-center rounded-full bg-ink text-lg font-extrabold text-white transition-colors duration-500 group-hover:bg-white group-hover:text-royal">
              {initials(m.name)}
            </span>
            <span className="text-xs tabular-nums text-ink/40 group-hover:text-white/50">0{i + 1}</span>
          </div>
          <h3 className="mt-10 text-xl font-semibold">{m.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65 group-hover:text-white/80">{m.role}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-royal group-hover:text-sun">{m.focus}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export default function Mentors() {
  const latest = webinars[0];
  return (
    <section id="mentors" className="relative bg-paper py-28 sm:py-40" aria-labelledby="mentors-title">
      <div className="frame">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="07" className="text-royal">
              Global mentor network
            </Eyebrow>
            <h2 id="mentors-title" className="mt-8 text-display font-semibold text-ink">
              <SplitWords text="Mentored by people" />
              <br />
              <SplitWords text="who have walked the path." delay={0.1} wordClassName={(_, i) => (i >= 3 ? "italic-serif text-royal" : undefined)} />
            </h2>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg leading-relaxed text-ink/65">Fulbright Scholars, an Erasmus Mundus Scholar, a Stanford researcher and international professionals — offering direct, one-to-one mentorship.</p>
          </Reveal>
        </div>

        <div className="mt-16">
          <MentorGrid />
        </div>

        {/* Achievers' Dialogue — real webinar series */}
        <Reveal className="mt-8">
          <div className="grid overflow-hidden rounded-[28px] bg-ink text-white lg:grid-cols-12">
            <div className="relative aspect-[16/10] bg-[#0b1650] lg:col-span-5 lg:aspect-auto lg:min-h-[320px]">
              <Image src={latest.poster} alt={`${latest.series} poster`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-contain" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
              <p className="eyebrow text-sun">{latest.series} · {latest.date}</p>
              <h3 className="mt-4 text-title font-semibold">{latest.title}</h3>
              <ul className="mt-6 space-y-2 text-white/75">
                {latest.speakers.map((s) => (
                  <li key={s.name}>
                    <span className="font-semibold text-white">{s.name}</span> — {s.credential}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-6">
                <LineLink href={latest.recordings[0].url} external className="text-sun">
                  Watch the recording
                </LineLink>
                <LineLink href="/insights#webinars" className="text-white">
                  All webinars
                </LineLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
