"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ease } from "@/components/ui/primitives";
import { whatsappLink } from "@/components/MobileActionBar";
import type { Scholarship } from "@/lib/scholarships";

const W = 1080;
const H = 1350;

/** Draws the shareable pass (1080×1350, Instagram portrait). Runs only in the browser; nothing is uploaded. */
function drawPass(c: HTMLCanvasElement, s: Scholarship, name: string, font: string) {
  const x = c.getContext("2d")!;
  c.width = W;
  c.height = H;
  const g = x.createRadialGradient(W * 0.75, H * 0.2, 50, W * 0.5, H * 0.5, H);
  g.addColorStop(0, "#2e5bff");
  g.addColorStop(0.45, "#1240e0");
  g.addColorStop(1, "#06229a");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  // ticket
  const tx = 70, ty = 150, tw = W - 140, th = 1020, r = 44;
  x.fillStyle = "#FAF8F3";
  x.beginPath();
  x.roundRect(tx, ty, tw, th, r);
  x.fill();
  // perforation + stub
  const sy = ty + 760;
  x.fillStyle = "#FFD43B";
  x.beginPath();
  x.roundRect(tx, sy, tw, th - 760, [0, 0, r, r]);
  x.fill();
  x.fillStyle = "#1240e0";
  for (let i = tx + 30; i < tx + tw - 20; i += 34) x.fillRect(i, sy - 2, 16, 4);

  // text(txt, x, y, size, weight, colour, align, letter-spacing); shrinks to fit maxW when given
  const t = (txt: string, X: number, Y: number, px: number, weight: number, color: string, align: CanvasTextAlign = "left", spacing = 0, maxW = 0) => {
    x.letterSpacing = `${spacing}px`;
    x.font = `${weight} ${px}px ${font}`;
    while (maxW && x.measureText(txt).width > maxW && px > 22) x.font = `${weight} ${(px -= 2)}px ${font}`;
    x.fillStyle = color;
    x.textAlign = align;
    x.fillText(txt, X, Y);
  };
  const L = tx + 60, R = tx + tw - 60, grey = "#6b7280", ink = "#0B1236", royal = "#1240e0";

  t("BRILLIANTON  ·  GLOBAL EDUCATION", W / 2, 95, 30, 700, "#ffffff", "center", 6);
  t("BOARDING PASS", L, ty + 95, 40, 800, royal, "left", 8);
  t("PASSENGER", L, ty + 175, 24, 600, grey, "left", 4);
  const n = (name.trim() || "Future Scholar").toUpperCase();
  t(n, L, ty + 235, 56, 800, ink, "left", 0, tw - 120);

  t("FROM", L, ty + 330, 24, 600, grey, "left", 4);
  t("INDIA", L, ty + 420, 84, 800, ink);
  t("TO", R, ty + 330, 24, 600, grey, "right", 4);
  const to = (s.campus?.label.split(",").pop()?.trim() || s.country).toUpperCase();
  t(to, R, ty + 420, 84, 800, royal, "right", 0, 400);
  x.strokeStyle = "#FFD43B";
  x.lineWidth = 6;
  x.setLineDash([14, 12]);
  x.beginPath();
  x.moveTo(L + 290, ty + 392);
  x.lineTo(R - 420, ty + 392);
  x.stroke();
  x.setLineDash([]);

  const row = (label: string, value: string, X: number, Y: number, maxW: number) => {
    t(label, X, Y, 24, 600, grey, "left", 4);
    t(value, X, Y + 52, 38, 700, ink, "left", 0, maxW);
  };
  row("FLIGHT", s.name, L, ty + 510, tw - 120);
  row("CLASS", s.levels[0].toUpperCase(), L, ty + 640, 360);
  row("GATE", "BRILLIANTON", L + 360, ty + 640, 230);
  row("BOARDING", "NOW", R - 140, ty + 640, 140);

  t("YOUR JOURNEY STARTS WITH THE RIGHT MENTOR", L, sy + 95, 34, 800, ink, "left", 0, R - 300 - L);
  t("brilliantonedu.com  ·  +91 97781 17553", L, sy + 160, 28, 600, ink);
  x.fillStyle = ink;
  let bx = R - 230;
  for (let i = 0; bx < R; i++) {
    const w = [4, 2, 6, 3][(i * 7 + n.length) % 4];
    x.fillRect(bx, sy + 60, w, 150);
    bx += w + 5;
  }

  t("Find yours at brilliantonedu.com/opportunities", W / 2, H - 70, 30, 600, "#ffffff", "center");
}

/** Personal, shareable boarding pass for one opportunity, plus a WhatsApp hand-off. */
export default function BoardingPass({ s, onClose }: { s: Scholarship; onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      if (!live || !canvas.current) return;
      drawPass(canvas.current, s, name, getComputedStyle(document.body).fontFamily);
      setImg(canvas.current.toDataURL("image/png"));
    });
    return () => {
      live = false;
    };
  }, [s, name]);

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
      trigger?.focus();
    };
    // once per open: re-running would steal focus from the name field
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const file = `brillianton-boarding-pass-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  const share = async () => {
    const blob = await (await fetch(img)).blob();
    const f = new File([blob], file, { type: "image/png" });
    if (navigator.canShare?.({ files: [f] })) await navigator.share({ files: [f], title: "My Brillianton boarding pass", text: `Next stop: ${s.name}. Find yours at https://www.brilliantonedu.com/opportunities` }).catch(() => {});
    else window.open(whatsappLink(`My next stop: ${s.name}! Find your pathway at https://www.brilliantonedu.com/opportunities`), "_blank", "noopener");
  };

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Boarding pass for ${s.name}`}
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-ink/95 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} className="my-auto grid w-full max-w-4xl gap-6 text-white md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
        <canvas ref={canvas} className="hidden" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img ? <img src={img} alt={`Boarding pass to ${s.name} for ${name || "Future Scholar"}`} className="mx-auto w-full max-w-[420px] rounded-2xl shadow-2xl" /> : <div className="mx-auto aspect-[4/5] w-full max-w-[420px] animate-pulse rounded-2xl bg-white/10" />}
        <div>
          <p className="eyebrow text-sun">Your boarding pass</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">{s.name}</h3>
          <label htmlFor="pass-name" className="mt-6 block text-sm font-semibold">Passenger name</label>
          <input id="pass-name" value={name} onChange={(e) => setName(e.target.value.slice(0, 28))} placeholder="Type your name" autoComplete="given-name" className="mt-2 min-h-[48px] w-full rounded-full bg-white/10 px-5 text-white ring-1 ring-white/25 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sun" />
          <p className="mt-2 text-xs text-white/50">Made on your device. We don&apos;t store your name.</p>
          <div className="mt-6 grid gap-3">
            <a href={img || undefined} download={file} data-cta="pass-download" className="flex min-h-[48px] items-center justify-center rounded-full bg-sun px-6 text-sm font-semibold text-ink">Download pass</a>
            <button type="button" onClick={share} disabled={!img} data-cta="pass-share" className="min-h-[48px] rounded-full px-6 text-sm font-semibold ring-1 ring-white/30 hover:bg-white hover:text-ink">Share it</button>
            <a href={whatsappLink(`Hello Brillianton, I'm ${name || "a student"} and I want to go for ${s.name}. Can a mentor help me get there?`)} target="_blank" rel="noopener noreferrer" data-cta="pass-whatsapp" className="flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-6 text-sm font-semibold text-ink">Book my free mentor call</a>
          </div>
        </div>
      </motion.div>
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close boarding pass" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 hover:bg-white hover:text-ink sm:right-8 sm:top-8">
        <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
        <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
      </button>
    </motion.div>,
    document.body
  );
}
