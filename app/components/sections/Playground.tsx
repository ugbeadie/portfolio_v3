"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { ExperimentCard } from "../ui/ExperimentCard";
import { PlaygroundDemos } from "../ui/PlaygroundDemos";
import { useTransitionRouter } from "../layout/PageTransition";
import { experiments, HOME_EXPERIMENT_COUNT } from "../../data/playground";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Playground() {
  const { navigate } = useTransitionRouter();
  const featured = experiments.slice(0, HOME_EXPERIMENT_COUNT);

  return (
    <section
      id="playground"
      className="bg-background text-text px-6 md:px-12 pt-32 relative overflow-hidden transition-colors duration-300 scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-7xl mx-auto mb-16 md:mb-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.06em]"
            >
              The <br />
              <span className="italic text-[#ab8bff] inline-block">
                Playground
              </span>
            </motion.h2>
          </div>
          <p className="text-text-secondary text-base md:text-lg max-w-md leading-relaxed">
            Small things built for the pleasure of building them. Every one is
            live, so you can open it and try it yourself.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item) => (
              <ExperimentCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <PlaygroundDemos limit={3} />
        )}

        <div className="mt-16 flex justify-center">
          <Magnetic>
            <button
              onClick={() => navigate("/playground", "Playground")}
              className="group flex items-center gap-4 px-8 h-14 border border-border cursor-pointer uppercase text-xs tracking-[0.25em] font-bold hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-colors duration-500"
            >
              See everything
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
