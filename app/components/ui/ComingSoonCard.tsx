"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Holds the empty slot open so a short list reads as a run in progress rather
 * than a grid that ran out. `index` is the number the next real piece will
 * take, so the sequence stays unbroken.
 */
export function ComingSoonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col border border-dashed border-border"
    >
      <div className="flex w-full aspect-[16/10] items-center justify-center px-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary text-center">
          More coming soon
        </span>
      </div>
      <div className="flex items-baseline gap-4 border-t border-dashed border-border px-5 py-4">
        <span className="text-[10px] tracking-[0.25em] text-text-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-base md:text-lg font-bold uppercase tracking-[-0.02em] text-text-secondary">
          In progress
        </span>
      </div>
    </motion.div>
  );
}
