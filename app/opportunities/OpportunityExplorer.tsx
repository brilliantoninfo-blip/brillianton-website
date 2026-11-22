"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/components/ui/primitives";
import { OpportunityCard } from "@/sections/home/Opportunities";
import { opportunities } from "@/lib/site";

const filters = ["All", "School", "Undergraduate", "Postgraduate"] as const;

export default function OpportunityExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = useMemo(() => opportunities.filter((o) => filter === "All" || o.level === filter), [filter]);

  return (
    <section className="bg-sand py-20 sm:py-28" aria-label="Opportunity explorer">
      <div className="frame">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div role="tablist" aria-label="Filter by stage" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative min-h-[44px] rounded-full px-5 text-sm font-medium transition-colors ${filter === f ? "text-white" : "text-ink/70 hover:text-ink"}`}
              >
                {filter === f && <motion.span layoutId="opp-pill-page" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-ink/55" aria-live="polite">
            {list.length} {list.length === 1 ? "opportunity" : "opportunities"}
          </p>
        </div>

        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((o, i) => (
              <motion.li key={o.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.55, ease, delay: i * 0.03 }}>
                <OpportunityCard o={o} i={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
