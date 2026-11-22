"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, type ReactNode, type ComponentProps } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- Reveal: subtle entrance on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "article";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

/* ---------- SplitWords: masked word-by-word headline rise ---------- */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  // The observer sits on the (unclipped) wrapper; words inherit the state via variants.
  // Observing each masked word directly never fires, because the mask clips it out of view.
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show" };
  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial={reduce ? false : "hidden"}
      {...trigger}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName?.(w, i) ?? ""}`}
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.1, ease, delay: delay + i * stagger } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------- Arrow: one consistent, hand-drawn glyph instead of an icon set ---------- */
export function Arrow({ className = "h-3.5 w-3.5", diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`${className} ${diagonal ? "-rotate-45" : ""}`}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/* ---------- Magnetic button ---------- */
type Variant = "solid" | "ghost" | "light" | "sun";
const variants: Record<Variant, string> = {
  solid: "bg-royal text-white hover:bg-[#2446ff]",
  sun: "bg-sun text-ink hover:bg-white",
  light: "bg-white text-ink hover:bg-sun",
  ghost: "ring-1 ring-inset ring-current bg-transparent hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`group relative inline-flex min-h-[52px] items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full">
        <span aria-hidden className="absolute inset-0 rounded-full bg-current opacity-15" />
        <Arrow className="h-3 w-3 transition-transform duration-500 ease-expo group-hover:translate-x-[150%]" />
        <Arrow className="absolute h-3 w-3 -translate-x-[150%] transition-transform duration-500 ease-expo group-hover:translate-x-0" />
      </span>
    </motion.span>
  );

  if (!href)
    return (
      <button type={type ?? "button"} onClick={onClick} className="rounded-full">
        {inner}
      </button>
    );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full">
        {inner}
      </a>
    );
  return (
    <Link href={href} onClick={onClick} className="inline-block rounded-full">
      {inner}
    </Link>
  );
}

/* ---------- Text link with underline sweep ---------- */
export function LineLink({ href, children, className = "", external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const cls = `group inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] ${className}`;
  const body = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100" />
      </span>
      <Arrow className="h-3 w-3 transition-transform duration-500 ease-expo group-hover:translate-x-1" diagonal={external} />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}

/* ---------- Eyebrow label ---------- */
export function Eyebrow({ children, className = "", index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && <span className="tabular-nums opacity-60">{index}</span>}
      <span className="h-px w-8 bg-current opacity-50" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* ---------- Brand mark (vector redraw of the Brillianton pillars) ---------- */
export function Mark({ className = "h-8 w-auto", capClassName = "", pillarClassName = "" }: { className?: string; capClassName?: string; pillarClassName?: string }) {
  return (
    <svg viewBox="0 0 140 118" className={className} aria-hidden fill="currentColor">
      <path className={capClassName} d="M38 9 70 0l32 9-32 9z" />
      <g className={pillarClassName}>
        <path d="M0 118V62C0 50 7 43 18 42l8-1v77z" />
        <path d="M33 118V37c3-8 14-13 30-15v96z" />
        <path d="M77 118V22c16 2 27 7 30 15v81z" />
        <path d="M114 118V41l8 1c11 1 18 8 18 20v56z" />
      </g>
    </svg>
  );
}

/* ---------- Photo with brand duotone + optional scroll parallax ---------- */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority,
  parallax = 0,
  duotone = true,
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
  duotone?: boolean;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${duotone ? "duotone" : ""} ${className}`}>
      <motion.div className="absolute inset-[-12%]" style={reduce || !parallax ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items, className = "", separator = "·", speed = "40s" }: { items: string[]; className?: string; separator?: string; speed?: string }) {
  const row = (hidden?: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6">{t}</span>
          <span className="opacity-40">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap ${className}`}>
      <div className="flex animate-marquee" style={{ animationDuration: speed }}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------- Tilt: 3D perspective response to pointer ---------- */
export function Tilt({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number } & Omit<ComponentProps<"div">, "children">) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
