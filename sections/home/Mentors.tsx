"use client";

import Image from "next/image";
import { Eyebrow, LineLink, Reveal, SplitWords } from "@/components/ui/primitives";
import { mentors, webinars } from "@/lib/site";
import ReelCard from "@/components/ReelCard";

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
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {mentors.map((m, i) => (
        <Reveal as="li" key={m.name} delay={(i % 4) * 0.06} className="group">
          <article className="h-full overflow-hidden rounded-[24px] bg-white ring-1 ring-ink/5 transition-all duration-700 ease-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,18,54,0.45)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-deep">
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
                />
              ) : (
                <div className="field-royal absolute inset-0 grid place-items-center">
                  <span className="display-wide text-7xl font-extrabold tracking-tight text-white/90">{initials(m.name)}</span>
                </div>
              )}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-sun px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">{m.focus}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-ink">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.role}</p>
            </div>
          </article>
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
          <Reveal className="flex items-end gap-6 lg:col-span-5" delay={0.15}>
            <p className="flex-1 text-lg leading-relaxed text-ink/65">Fulbright Scholars, an Erasmus Mundus Scholar, a Stanford researcher and international professionals — offering direct, one-to-one mentorship.</p>
            <ReelCard compact className="w-[140px] shrink-0 sm:w-[170px]" />
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
