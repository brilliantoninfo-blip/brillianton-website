"use client";

import { motion } from "framer-motion";
import { useSiteReady } from "@/components/Loader";
import { Photo, ease } from "@/components/ui/primitives";

/** Shared inner-page opening: oversized title, intro, and an arch-framed photograph. */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt = "",
  illustration = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  illustration?: boolean;
}) {
  const ready = useSiteReady();
  const anim = (d: number) => ({ initial: { y: "105%" }, animate: ready ? { y: "0%" } : {}, transition: { duration: 1.2, ease, delay: d } });
  return (
    <section className="grain relative isolate overflow-hidden bg-deep pb-20 pt-40 text-white sm:pb-28 sm:pt-48">
      <div aria-hidden className="field-royal absolute inset-0 -z-10" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="frame grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className={image ? "lg:col-span-8" : "lg:col-span-12"}>
          <motion.p className="eyebrow flex items-center gap-3 text-sun" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, ease }}>
            <span className="h-px w-10 bg-sun" />
            {eyebrow}
          </motion.p>
          <h1 className="display-wide mt-8 text-huge font-extrabold uppercase">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" {...anim(0.1)}>
                {title}
              </motion.span>
            </span>
            {accent && (
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="italic-serif block normal-case text-sun [font-stretch:100%]" {...anim(0.2)}>
                  {accent}
                </motion.span>
              </span>
            )}
          </h1>
          <motion.p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease, delay: 0.45 }}>
            {intro}
          </motion.p>
        </div>
        {image && (
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease, delay: 0.35 }}>
            <Photo src={image} alt={imageAlt} className="arch mx-auto aspect-[3/4] w-full max-w-sm bg-[#062ac6] ring-4 ring-sun/90" parallax={illustration ? 3 : 8} duotone={!illustration} priority sizes="(min-width:1024px) 30vw, 80vw" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
