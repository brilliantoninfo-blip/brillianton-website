"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, LineLink, ease } from "@/components/ui/primitives";
import { whatsappLink } from "@/components/MobileActionBar";
import { countries, kinds, levels, scholarships, type Scholarship } from "@/lib/scholarships";

// shortcut: keyless Street View embed; switch to the Maps Embed API (streetview mode) once a key exists.
const streetView = (c: NonNullable<Scholarship["campus"]>) => `https://maps.google.com/maps?layer=c&cbll=${c.lat},${c.lng}&cbp=12,0,0,0,0&output=svembed`;
const mapsPano = (c: NonNullable<Scholarship["campus"]>) => `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${c.lat},${c.lng}`;

/** Searchable, filterable list of scholarships, fellowships and programmes, with first-person campus walks. */
export default function OpportunityFinder({ limit }: { limit?: number }) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [kind, setKind] = useState("");
  const [walk, setWalk] = useState<Scholarship | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return scholarships.filter(
      (s) =>
        (!country || s.country === country) &&
        (!level || s.levels.includes(level as Scholarship["levels"][number])) &&
        (!kind || s.kind === kind) &&
        (!t || `${s.name} ${s.country} ${s.summary} ${s.kind} ${s.funding ?? ""} ${s.levels.join(" ")}`.toLowerCase().includes(t))
    );
  }, [q, country, level, kind]);
  const shown = limit ? results.slice(0, limit) : results;
  const filtered = q || country || level || kind;

  useEffect(() => {
    if (!walk) return;
    const trigger = document.activeElement as HTMLElement | null;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWalk(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
      trigger?.focus();
    };
  }, [walk]);

  const field = "min-h-[48px] rounded-full bg-white px-5 text-sm text-ink ring-1 ring-ink/10 focus:outline-none focus:ring-2 focus:ring-royal";

  return (
    <div>
      {/* Search and filters */}
      <div className="rounded-[28px] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(11,18,54,0.35)] ring-1 ring-ink/5 sm:p-5">
        <label htmlFor="opp-search" className="sr-only">
          Search scholarships, fellowships and programmes
        </label>
        <div className="relative">
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="opp-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try “Japan”, “PhD”, “fully funded”, “AI”, “internship”…"
            className="min-h-[56px] w-full rounded-full bg-paper pl-14 pr-5 text-base text-ink ring-1 ring-ink/10 placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-royal"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} className={field}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)} className={field}>
            <option value="">All levels</option>
            {levels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select aria-label="Type" value={kind} onChange={(e) => setKind(e.target.value)} className={field}>
            <option value="">All types</option>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60" aria-live="polite">
          {results.length} {results.length === 1 ? "opportunity" : "opportunities"}
          {filtered ? " match" : ""} · deadlines change each cycle, so always check the official site
        </p>
        {filtered && (
          <button type="button" onClick={() => { setQ(""); setCountry(""); setLevel(""); setKind(""); }} className="min-h-[44px] text-sm font-semibold text-royal underline-offset-4 hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => (
            <motion.li key={s.name} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease }}>
              <article className="flex h-full flex-col rounded-[24px] bg-white p-6 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(11,18,54,0.4)]">
                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
                  <span className="rounded-full bg-royal/10 px-3 py-1 text-royal">{s.kind}</span>
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-ink/70">{s.country}</span>
                  {s.funding && <span className="rounded-full bg-sun px-3 py-1 text-ink">{s.funding}</span>}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-ink">{s.name}</h3>
                <p className="mt-1 text-xs text-ink/50">{s.levels.join(" · ")}</p>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/70">{s.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  {s.href.startsWith("/") ? (
                    <LineLink href={s.href} className="text-royal">Details</LineLink>
                  ) : (
                    <LineLink href={s.href} external className="text-royal">Official site</LineLink>
                  )}
                  {s.campus && (
                    <button type="button" onClick={() => setWalk(s)} className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-royal">
                      <span aria-hidden>360°</span> Walk the campus
                    </button>
                  )}
                </div>
                <a href={whatsappLink(`Hello Brillianton, I'm interested in ${s.name}. Can a mentor help me prepare?`)} target="_blank" rel="noopener noreferrer" data-cta="finder-whatsapp" className="mt-4 text-sm font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline">
                  Ask a mentor about this →
                </a>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <div className="mt-6 rounded-[24px] bg-white p-8 text-center ring-1 ring-ink/5">
          <p className="text-lg font-semibold text-ink">Nothing here yet for that search.</p>
          <p className="mt-2 text-ink/65">Tell us what you're looking for and a mentor will point you to the right opportunities.</p>
          <a href={whatsappLink(`Hello Brillianton, I'm looking for opportunities: ${q || [country, level, kind].filter(Boolean).join(", ")}`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-ink">
            Ask on WhatsApp
          </a>
        </div>
      )}

      {limit && results.length > limit && (
        <div className="mt-10">
          <Link href="/opportunities" className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-royal px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2446ff]">
            See all {results.length} opportunities <Arrow className="h-3 w-3" />
          </Link>
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {walk?.campus && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`Walk the campus: ${walk.campus.label}`}
                className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.target === e.currentTarget && setWalk(null)}
                data-lenis-prevent
              >
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease }} className="flex h-[min(760px,88vh)] w-[min(1200px,94vw)] flex-col overflow-hidden rounded-[24px] bg-ink ring-1 ring-white/15">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-white">
                    <div>
                      <p className="eyebrow text-sun">360° campus walk</p>
                      <p className="mt-1 font-semibold">{walk.campus.label}</p>
                    </div>
                    <p className="text-sm text-white/60">Drag to look around · click the arrows on the ground to walk</p>
                  </div>
                  <iframe src={streetView(walk.campus)} title={`Street View of ${walk.campus.label}`} className="w-full flex-1" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  <a href={mapsPano(walk.campus)} target="_blank" rel="noopener noreferrer" className="block py-3 text-center text-sm font-semibold text-white hover:text-sun">
                    Open full screen in Google Maps ↗
                  </a>
                </motion.div>
                <button ref={closeRef} type="button" onClick={() => setWalk(null)} aria-label="Close campus walk" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-ink sm:right-8 sm:top-8">
                  <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
