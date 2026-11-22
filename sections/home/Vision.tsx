"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow, LineLink, Photo, Reveal } from "@/components/ui/primitives";

const statement =
  "Global opportunities are not won through applications. They are earned through the right mentorship — and that journey begins long before anyone applies.";
const highlight = new Set(["applications.", "mentorship", "begins"]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = highlight.has(word.replace(/[—,]/g, ""));
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? "italic-serif text-royal" : ""}`}>
      {word}
    </motion.span>
  );
}

export default function Vision() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  return (
    <section className="relative overflow-hidden bg-paper py-28 sm:py-40" aria-labelledby="vision-title">
      <div aria-hidden className="grid-lines-dark absolute inset-0" />
      <div className="frame relative">
        <Eyebrow index="01" className="text-royal">
          Our vision
        </Eyebrow>
        <h2 id="vision-title" className="sr-only">
          Our vision
        </h2>
        <p ref={ref} className="mt-10 max-w-6xl text-display font-semibold text-ink" aria-label={statement}>
          <span aria-hidden>
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </span>
        </p>

        <div className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <Photo src="/brand/dream-globally.jpg" alt="A graduate in cap and gown looking up at a domed historic university building" className="arch aspect-[4/5] w-full bg-deep" parallax={6} duotone={false} imgClassName="object-[50%_40%]" sizes="(min-width:1024px) 40vw, 100vw" />
              <div className="absolute -bottom-6 -right-4 max-w-[15rem] rounded-2xl bg-sun p-5 text-ink shadow-2xl sm:-right-10">
                <p className="eyebrow text-royal">Brand philosophy</p>
                <p className="mt-2 text-lg leading-snug">
                  An imagined city of <span className="italic-serif">brilliance.</span>
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="text-title font-semibold text-ink">
                Before the application, there is the <span className="italic-serif text-royal">preparation.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">
                Leading universities and fellowship panels read for evidence — sustained curiosity, real responsibility, and growth over time. An application can only present what already exists. So Brillianton starts earlier: with students in Grades 8–12, and with graduates long before fellowship cycles open.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                We are not a study-abroad agency. We are mentors — fellowship alumni and researchers — who stay with a student from first ambition to final admission, and beyond.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="mt-10 border-l-2 border-royal pl-6">
                <blockquote lang="ml" className="text-xl leading-relaxed text-ink">
                  ലോകോത്തര അവസരങ്ങൾ നേടുന്നത് അപേക്ഷകളിലൂടെയല്ല... ശരിയായ Mentorship-ലൂടെയാണ്.
                </blockquote>
                <figcaption className="mt-2 text-sm text-ink/55">World-class opportunities are not won through applications, but through the right mentorship.</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <LineLink href="/about" className="text-royal">
                Our story & philosophy
              </LineLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
