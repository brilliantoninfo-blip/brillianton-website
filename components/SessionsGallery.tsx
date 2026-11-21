"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, ease } from "@/components/ui/primitives";
import { seriesInfo, sessionHref, sessions, sessionSrc, type SessionSeries } from "@/lib/sessions";

const tabs = ["All", ...(Object.keys(seriesInfo) as SessionSeries[])] as const;
type Tab = (typeof tabs)[number];

/** Every Brillianton session poster and clip, filterable by series, with a full-screen viewer. */
export default function SessionsGallery({ limit, tone = "light" }: { limit?: number; tone?: "light" | "dark" }) {
  const [tab, setTab] = useState<Tab>("All");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const list = useMemo(() => {
    const l = sessions.filter((s) => tab === "All" || s.series === tab);
    return limit ? l.slice(0, limit) : l;
  }, [tab, limit]);

  const show = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
    };
  }, [open, close, step]);

  const dark = tone === "dark";
  const current = open !== null ? list[open] : null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div role="tablist" aria-label="Filter sessions by series" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative min-h-[44px] rounded-full px-5 text-sm font-medium ring-1 transition-colors ${
                tab === t ? "text-ink ring-transparent" : dark ? "text-white/75 ring-white/20 hover:text-white" : "text-ink/70 ring-ink/10 hover:text-ink"
              }`}
            >
              {tab === t && <motion.span layoutId={`sess-pill-${tone}`} className="absolute inset-0 rounded-full bg-sun" transition={{ duration: 0.5, ease }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <p className={`text-sm ${dark ? "text-white/60" : "text-ink/55"}`} aria-live="polite">
          {list.length} {list.length === 1 ? "image" : "images"}
        </p>
      </div>
      {tab !== "All" && <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-white/75" : "text-ink/70"}`}>{seriesInfo[tab]}</p>}

      <motion.ul layout className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <motion.li
              key={s.code}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease, delay: Math.min(i, 12) * 0.025 }}
              className="mb-4 break-inside-avoid lg:mb-5"
            >
              <button
                type="button"
                onClick={() => show(i)}
                className={`group relative block w-full overflow-hidden rounded-[18px] text-left ring-1 ${dark ? "bg-navy ring-white/10" : "bg-white ring-ink/5"}`}
                aria-label={`${s.title} — ${s.series}. Open larger`}
              >
                <Image
                  src={sessionSrc(s)}
                  alt=""
                  width={s.w}
                  height={s.h}
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 31vw, 48vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-4 pt-10 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sun">{s.series}</span>
                  <span className="mt-1 block text-sm font-semibold leading-snug">{s.title}</span>
                </span>
                {s.kind === "From the session" && (
                  <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink">Clip</span>
                )}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
            data-lenis-prevent
          >
            <motion.div
              key={current.code}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease }}
              className="grid max-h-full w-full max-w-5xl gap-6 overflow-y-auto text-white lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center"
            >
              <div className="relative mx-auto w-full max-w-[560px]">
                <Image src={sessionSrc(current)} alt={`${current.title}${current.detail ? ` — ${current.detail}` : ""}`} width={current.w} height={current.h} sizes="(min-width:1024px) 560px, 92vw" className="h-auto max-h-[78vh] w-full rounded-2xl object-contain" />
              </div>
              <div>
                <p className="eyebrow text-sun">{current.series}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">{current.title}</h3>
                {current.detail && <p className="mt-3 text-white/70">{current.detail}</p>}
                <a
                  href={sessionHref(current)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sun px-6 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  View on Instagram <Arrow className="h-3 w-3" diagonal />
                </a>
                <div className="mt-8 flex items-center gap-2">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-ink">
                    <Arrow className="h-3.5 w-3.5 rotate-180" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-ink">
                    <Arrow className="h-3.5 w-3.5" />
                  </button>
                  <span className="ml-2 text-sm tabular-nums text-white/55">
                    {(open ?? 0) + 1} / {list.length}
                  </span>
                </div>
              </div>
            </motion.div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 transition hover:bg-white hover:text-ink sm:right-8 sm:top-8"
            >
              <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
              <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
