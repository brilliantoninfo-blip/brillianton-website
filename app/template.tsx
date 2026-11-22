"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/components/ui/primitives";

/** Route transition: a navy curtain lifts off each new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] bg-royal"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}
