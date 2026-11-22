"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, site } from "@/lib/site";
import { Button, Mark, ease } from "@/components/ui/primitives";
import { InstagramGlyph } from "@/sections/home/InstagramWall";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Mark className="h-8 w-auto" capClassName="text-sun" />
      <span className="flex flex-col leading-none">
        <span className="display-wide text-[1.05rem] font-extrabold tracking-[0.02em]">BRILLIANTON</span>
        <span className="mt-1 text-[0.52rem] font-semibold tracking-[0.42em] opacity-80">GLOBAL EDUCATION</span>
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease }}
      >
        <div
          className={`mx-auto flex max-w-frame items-center justify-between rounded-full px-4 py-2.5 text-white transition-all duration-500 sm:px-6 ${
            scrolled || open ? "bg-ink/75 shadow-[0_10px_40px_-10px_rgba(3,8,32,0.6)] ring-1 ring-white/10 backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <Link href="/" aria-label="Brillianton Global Education — home" className="rounded-full">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${
                      isActive(item.href) ? "text-sun" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sun transition-transform duration-300 ${
                        isActive(item.href) ? "scale-100" : "scale-0 group-hover:scale-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Brillianton on Instagram (opens in a new tab)"
              className="hidden h-11 w-11 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-ink md:grid"
            >
              <InstagramGlyph />
            </a>
            <div className="hidden sm:block">
              <Button href="/programmes" variant="sun" className="!min-h-[44px] !px-5 !py-3 !text-[0.7rem]">
                Explore Programmes
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white/10 xl:hidden"
            >
              <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ease-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ease-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-28 text-white xl:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease }}>
                      <Link
                        href={item.href}
                        className={`flex items-baseline gap-4 py-2 text-[2.4rem] font-bold leading-none tracking-tight sm:text-6xl ${isActive(item.href) ? "text-sun" : ""}`}
                      >
                        <span className="text-xs font-medium tabular-nums text-white/40">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 space-y-2 pr-20 text-sm text-white/60">
              <a className="block hover:text-white" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="block hover:text-white" href={site.phoneHref}>{site.phone}</a>
              <a className="block hover:text-white" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram {site.instagramHandle}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
