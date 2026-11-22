"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, ease } from "@/components/ui/primitives";
import { faqs, type FaqItem } from "@/lib/faq";

/** Accordion FAQ with FAQPage structured data for search engines. */
export default function FAQ({ items = faqs, title = "Questions, answered.", id = "faq" }: { items?: FaqItem[]; title?: string; id?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id={id} className="bg-white py-24 sm:py-32" aria-labelledby={`${id}-title`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className="text-royal">FAQ</Eyebrow>
          <h2 id={`${id}-title`} className="mt-8 text-display font-semibold text-ink">
            {title.split(" ").slice(0, -1).join(" ")} <span className="italic-serif text-royal">{title.split(" ").slice(-1)}</span>
          </h2>
        </div>
        <ul className="border-t border-ink/10 lg:col-span-8">
          {items.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={`${id}-a-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink transition-colors hover:text-royal sm:text-xl"
                  >
                    {f.q}
                    <span aria-hidden className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-sun" : "bg-ink/5"}`}>
                      <span className="absolute h-[1.5px] w-3.5 bg-ink" />
                      <span className={`absolute h-3.5 w-[1.5px] bg-ink transition-transform duration-300 ${on ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`${id}-a-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 leading-relaxed text-ink/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
