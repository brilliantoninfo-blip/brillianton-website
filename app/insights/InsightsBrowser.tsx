"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/components/ui/primitives";
import { InsightCard } from "@/sections/home/InsightsPreview";
import { categories, insights, type InsightCategory } from "@/lib/insights";

export default function InsightsBrowser() {
  const [cat, setCat] = useState<InsightCategory | "All">("All");
  const list = useMemo(() => insights.filter((i) => cat === "All" || i.category === cat), [cat]);
  const [feature, ...rest] = list;

  return (
    <section className="bg-white py-20 sm:py-28" aria-label="Articles">
      <div className="frame">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`relative min-h-[44px] rounded-full px-5 text-sm font-medium ring-1 transition-colors ${cat === c ? "text-white ring-transparent" : "text-ink/70 ring-ink/10 hover:text-ink"}`}
            >
              {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-royal" transition={{ duration: 0.5, ease }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="mt-14">
            {feature && (
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <InsightCard post={feature} large />
                </div>
                <div className="grid content-start gap-10 lg:col-span-5">
                  {rest.slice(0, 2).map((p) => (
                    <InsightCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            )}
            {rest.length > 2 && (
              <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(2).map((p) => (
                  <InsightCard key={p.slug} post={p} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
