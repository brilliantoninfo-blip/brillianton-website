"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/components/ui/primitives";

export const featuredReel = {
  code: "DcYbkGzi6Zb",
  cover: "/brand/reel-choosing-university.jpg",
  title: "Choosing the right university can shape your entire future",
  href: "https://www.instagram.com/reel/DcYbkGzi6Zb/",
};

/**
 * A tap-to-play reel: shows a cover until the visitor asks for it, then opens
 * Instagram's official embedded player in a lightbox (nothing loads from Instagram before that).
 */
export default function ReelCard({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        data-cta="reel-play"
        aria-label={`Play reel: ${featuredReel.title}`}
        className={`group relative block overflow-hidden rounded-[22px] bg-ink text-left shadow-[0_30px_60px_-25px_rgba(3,8,40,0.7)] ring-1 ring-white/20 ${className}`}
      >
        <div className="relative aspect-[9/16]">
          <Image src={featuredReel.cover} alt="" fill sizes={compact ? "200px" : "320px"} className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform duration-500 group-hover:scale-110">
            <span className="absolute inset-0 animate-pulseRing rounded-full bg-white/50" />
            <svg viewBox="0 0 24 24" className="relative ml-1 h-6 w-6" fill="currentColor">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
          <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink">Watch</span>
          <p className={`absolute inset-x-0 bottom-0 p-4 font-semibold leading-snug text-white ${compact ? "text-xs" : "text-sm"}`}>{featuredReel.title}</p>
        </div>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={featuredReel.title}
                className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.target === e.currentTarget && setOpen(false)}
                data-lenis-prevent
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex h-[min(820px,92vh)] w-[min(420px,92vw)] flex-col overflow-hidden rounded-[24px] bg-white"
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${featuredReel.code}/embed`}
                    title={featuredReel.title}
                    className="h-full w-full flex-1"
                    allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                    allowFullScreen
                  />
                  <a href={featuredReel.href} target="_blank" rel="noopener noreferrer" className="block bg-ink py-3 text-center text-sm font-semibold text-white hover:text-sun">
                    Open on Instagram ↗
                  </a>
                </motion.div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-ink sm:right-8 sm:top-8"
                >
                  <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
