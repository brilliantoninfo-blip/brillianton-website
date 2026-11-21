"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button, LineLink, SplitWords } from "@/components/ui/primitives";
import { photos, site } from "@/lib/site";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const clip = useTransform(scrollYProgress, [0, 0.7], ["inset(18% 14% 18% 14% round 48px)", "inset(0% 0% 0% 0% round 0px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section ref={ref} className="relative bg-paper" aria-labelledby="cta-title">
      <motion.div style={reduce ? undefined : { clipPath: clip }} className="duotone relative isolate flex min-h-[100svh] items-center overflow-hidden text-white">
        <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale }}>
          <Image src={photos.capToss} alt="Graduates throwing their caps into the sky" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(10,48,196,0.9)_0%,rgba(10,48,196,0.6)_50%,rgba(10,48,196,0.2)_100%)]" />
        <div className="frame relative z-10 py-32">
          <h2 id="cta-title" className="display-wide max-w-6xl text-huge font-extrabold uppercase">
            <SplitWords text="The world is full of possibilities." />
            <br />
            <SplitWords text="Start your journey." delay={0.25} wordClassName={() => "text-sun"} />
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button href="/contact" variant="sun">
              Connect with Brillianton
            </Button>
            <LineLink href={site.whatsapp} external className="text-white">
              WhatsApp {site.phone}
            </LineLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
