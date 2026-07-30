"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Magnetic } from "../components/ui/Magnetic";
import { ExperimentCard } from "../components/ui/ExperimentCard";
import { PlaygroundDemos } from "../components/ui/PlaygroundDemos";
import { useTransitionRouter } from "../components/layout/PageTransition";
import { experiments } from "../data/playground";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PlaygroundPage() {
  const { navigate } = useTransitionRouter();

  return (
    <main className="min-h-screen bg-background text-text transition-colors duration-300 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="pt-24">
          <div className="mb-14 flex">
            <Magnetic>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                onClick={() => navigate("/", "Home")}
                className="px-5 h-12 cursor-pointer border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-colors flex items-center gap-3 group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                />
                <span className="text-xs uppercase tracking-widest">
                  Back home
                </span>
              </motion.button>
            </Magnetic>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="text-xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-[-0.05em]"
            >
              Playground
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-8 text-lg md:text-2xl leading-snug tracking-[-0.02em] max-w-3xl"
          >
            Things built for the pleasure of building them, kept live so they
            can be opened and tried rather than described.
          </motion.p>
        </header>

        {experiments.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiments.map((item) => (
                <ExperimentCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 md:mt-28 border-t border-border pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[-0.04em]">
              Micro-interactions
            </h2>
            <p className="text-text-secondary text-base max-w-md leading-relaxed">
              Pieces pulled out of the work and left here on their own. Hover
              them, drag them, click them.
            </p>
          </motion.div>

          <PlaygroundDemos />
        </section>
      </div>
    </main>
  );
}
