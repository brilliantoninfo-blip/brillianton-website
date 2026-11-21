"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { Arrow, ease } from "@/components/ui/primitives";

type Msg = { from: "brill" | "you"; text: string; link?: { href: string; label: string } };

const faq: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "Which programme fits me?",
    a: "If you're in Grades 8–12 and dream of Oxford, Cambridge, the Ivy League or a QS Top 100 university, Mission QS100 is your pathway. If you're an undergraduate, postgraduate or young professional aiming for Fulbright, Chevening, DAAD, Erasmus Mundus or Commonwealth, look at Future Fellows.",
    link: { href: "/programmes", label: "Compare programmes" },
  },
  {
    q: "Is Brillianton a study-abroad agency?",
    a: "No. We're a mentorship organisation. Instead of one-off counselling at application time, we guide students over months and years — building the profile, research, leadership and story that strong applications are made of.",
    link: { href: "/about", label: "Our philosophy" },
  },
  {
    q: "When should I start?",
    a: "Earlier than you think. For school students, Grade 8 or 9 gives time for real depth. For fellowships, start a full application cycle ahead — many requirements, like work experience or research, take time to build.",
    link: { href: "/insights/mentorship-before-the-application", label: "Why start early" },
  },
  {
    q: "Who are the mentors?",
    a: "Fellowship alumni and researchers — Fulbright Scholars, an Erasmus Mundus Scholar, a Stanford PhD researcher and more. People who have walked the path themselves.",
    link: { href: "/about#mentors", label: "Meet the mentors" },
  },
  {
    q: "Do you guarantee admission?",
    a: "No one honestly can. What we promise is structured, expert mentorship that makes you the strongest version of your candidacy. Decisions always rest with universities and funding bodies.",
  },
  {
    q: "How do I talk to the team?",
    a: `You can message us on WhatsApp at ${site.phone}, email ${site.email}, or send a note through the contact page.`,
    link: { href: "/contact", label: "Contact the team" },
  },
];

export function BrillAvatar({ size = 56, ring = true }: { size?: number; ring?: boolean }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      {ring && <span aria-hidden className="absolute inset-0 animate-pulseRing rounded-full bg-sun/50" />}
      <span className="relative block h-full w-full overflow-hidden rounded-full bg-royal ring-2 ring-sun">
        <Image src="/brand/brill-avatar.jpg" alt="" fill sizes={`${size * 2}px`} className="object-cover object-[50%_45%]" />
      </span>
      <span aria-hidden className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-[#3ee07f] ring-2 ring-ink" />
    </span>
  );
}

export default function BrillGuide() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "brill", text: "Hi, I'm Brill — your guide at Brillianton. Ask me anything about our mentorship programmes." },
  ]);
  const [asked, setAsked] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Other parts of the site can open Brill with a custom event
  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("brill:open", on);
    return () => window.removeEventListener("brill:open", on);
  }, []);

  const ask = (item: (typeof faq)[number]) => {
    if (typing) return;
    setAsked((a) => [...a, item.q]);
    setMsgs((m) => [...m, { from: "you", text: item.q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "brill", text: item.a, link: item.link }]);
    }, 900);
  };

  const remaining = faq.filter((f) => !asked.includes(f.q));

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Ask Brill, your Brillianton guide"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            className="absolute bottom-[76px] right-0 flex h-[min(620px,calc(100dvh-120px))] w-[min(390px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[28px] bg-ink text-white shadow-[0_30px_80px_-20px_rgba(3,8,32,0.8)] ring-1 ring-white/10"
          >
            <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-royal to-navy px-5 py-4">
              <BrillAvatar size={48} ring={false} />
              <div className="min-w-0">
                <p className="font-semibold leading-tight">Brill</p>
                <p className="text-xs text-white/70">Your Brillianton guide · replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Brill"
                className="ml-auto grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white/10"
              >
                <span className="absolute h-[1.5px] w-4 rotate-45 bg-white" />
                <span className="absolute h-[1.5px] w-4 -rotate-45 bg-white" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5" data-lenis-prevent aria-live="polite">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.92rem] leading-relaxed ${
                    m.from === "brill" ? "rounded-tl-sm bg-white/[0.07] text-white/90" : "ml-auto rounded-tr-sm bg-sun text-ink"
                  }`}
                >
                  {m.text}
                  {m.link && (
                    <Link
                      href={m.link.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sun hover:text-white"
                    >
                      {m.link.label} <Arrow className="h-3 w-3" />
                    </Link>
                  )}
                </motion.div>
              ))}
              {typing && (
                <div className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-tl-sm bg-white/[0.07] py-4" aria-label="Brill is typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-white/70"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-4">
              {remaining.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {remaining.slice(0, 4).map((f) => (
                    <button
                      key={f.q}
                      type="button"
                      onClick={() => ask(f)}
                      disabled={typing}
                      className="min-h-[40px] rounded-full px-3.5 py-2 text-left text-[0.8rem] text-white/85 ring-1 ring-white/20 transition hover:bg-white hover:text-ink disabled:opacity-50"
                    >
                      {f.q}
                    </button>
                  ))}
                </div>
              ) : (
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sun text-sm font-semibold text-ink"
                >
                  Continue on WhatsApp <Arrow className="h-3 w-3" diagonal />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close Brill" : "Ask Brill, your Brillianton guide"}
        className="group flex items-center gap-3 rounded-full bg-ink p-1.5 pr-1.5 text-white shadow-[0_20px_50px_-12px_rgba(3,8,32,0.7)] ring-1 ring-white/15 transition-[padding] duration-500 hover:pl-5"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8, ease }}
      >
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-500 group-hover:max-w-[120px] sm:block">
          Ask Brill
        </span>
        <BrillAvatar size={52} ring={!open} />
      </motion.button>
    </div>
  );
}
