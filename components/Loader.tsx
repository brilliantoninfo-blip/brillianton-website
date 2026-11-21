"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mark, ease } from "@/components/ui/primitives";

/** Other components wait for this before playing their entrance. */
export function useSiteReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ((window as unknown as { __brillReady?: boolean }).__brillReady) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("brill:ready", on);
    return () => window.removeEventListener("brill:ready", on);
  }, []);
  return ready;
}

export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("brill-loaded") === "1";
    const total = reduce || seen ? 350 : 1900;
    const start = performance.now();
    let raf = 0;
    document.documentElement.style.overflow = "hidden";
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        try {
          sessionStorage.setItem("brill-loaded", "1");
        } catch {}
      }
    };
    raf = requestAnimationFrame(tick);
    // Safety net: never let the loader hold the page (e.g. rAF throttled in a background tab)
    const fallback = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, total + 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        (window as unknown as { __brillReady?: boolean }).__brillReady = true;
        window.dispatchEvent(new Event("brill:ready"));
      }}
    >
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading Brillianton Global Education"
          className="field-royal fixed inset-0 z-[100] flex flex-col justify-between bg-deep p-6 text-white sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease }}
        >
          <div className="eyebrow flex justify-between text-white/70">
            <span>Brillianton</span>
            <span>Global Education</span>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative h-24 w-28 text-white sm:h-28 sm:w-32">
              <svg viewBox="0 0 140 118" className="h-full w-full" aria-hidden>
                <motion.path d="M38 9 70 0l32 9-32 9z" fill="#FFD43B" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.75, duration: 0.8, ease }} />
                {["M0 118V62C0 50 7 43 18 42l8-1v77z", "M33 118V37c3-8 14-13 30-15v96z", "M77 118V22c16 2 27 7 30 15v81z", "M114 118V41l8 1c11 1 18 8 18 20v56z"].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill="currentColor"
                    style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease }}
                  />
                ))}
              </svg>
            </div>
            <p className="text-center text-sm text-white/60">
              An imagined city of <span className="italic-serif text-lg text-white">brilliance</span>
            </p>
          </div>

          <div className="flex items-end justify-between">
            <Mark className="h-5 w-auto text-white/40" />
            <span className="display-wide text-6xl font-extrabold tabular-nums tracking-tighter sm:text-8xl">
              {count}
              <span className="text-sun">%</span>
            </span>
          </div>
          <div className="absolute bottom-0 left-0 h-[3px] bg-sun" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
