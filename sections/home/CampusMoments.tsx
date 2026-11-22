"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, LineLink, Reveal, SplitWords } from "@/components/ui/primitives";

export const campusPhotos = [
  { src: "/brand/campus-2.jpg", alt: "A Brillianton mentor speaking to students with a microphone" },
  { src: "/brand/campus-5.jpg", alt: "School students listening during a Global Futures session" },
  { src: "/brand/campus-1.jpg", alt: "A memento being presented at a Global Futures session" },
  { src: "/brand/campus-4.jpg", alt: "A Brillianton speaker addressing a classroom of school students" },
  { src: "/brand/campus-3.jpg", alt: "A mentor in a one-to-one conversation with a student after a session" },
];

function Column({ items, speed, offset = "" }: { items: typeof campusPhotos; speed: number; offset?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={`flex flex-col gap-4 ${offset}`}>
      {items.map((p) => (
        <div key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-navy">
          <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover transition-transform duration-[1.4s] ease-expo hover:scale-105" />
        </div>
      ))}
    </motion.div>
  );
}

/** Real photographs from Global Futures sessions on partner campuses. */
export default function CampusMoments() {
  return (
    <section className="relative overflow-hidden bg-paper py-28 sm:py-36" aria-labelledby="campus-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Eyebrow className="text-royal">On campus</Eyebrow>
          <h2 id="campus-title" className="mt-8 text-display font-semibold text-ink">
            <SplitWords text="Where ambition" />
            <br />
            <SplitWords text="meets its mentors." delay={0.1} wordClassName={(_, i) => (i === 2 ? "italic-serif text-royal" : undefined)} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
              Global Futures sessions bring Fulbright, Erasmus Mundus and doctoral scholars into classrooms — hosted at Escola International, The Global Public School and Shaziya International Campus.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-6">
            <LineLink href="/insights#sessions" className="text-royal">
              See every session
            </LineLink>
            <LineLink href="/programmes#institutions" className="text-ink">
              Host Global Futures
            </LineLink>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:grid-cols-3">
          <Column items={campusPhotos.slice(0, 2)} speed={30} />
          <Column items={campusPhotos.slice(2, 4)} speed={-30} offset="pt-16" />
          <div className="hidden lg:block">
            <Column items={campusPhotos.slice(4, 5)} speed={45} offset="pt-28" />
          </div>
        </div>
      </div>
    </section>
  );
}
