"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Magnetic } from "../components/ui/Magnetic";
import { ExperimentCard } from "../components/ui/ExperimentCard";
import { ComingSoonCard } from "../components/ui/ComingSoonCard";
import { useTransitionRouter } from "../components/layout/PageTransition";
import { experiments } from "../data/playground";

const EASE = [0.22, 1, 0.36, 1] as const;

function GroupHeading({ title, note }: { title: string; note: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3"
    >
      <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-text">
        {title}
      </h2>
      <p className="text-xs md:text-sm text-text-secondary max-w-sm sm:text-right">
        {note}
      </p>
    </motion.div>
  );
}

export function PlaygroundGallery() {
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
              className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-[-0.05em]"
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
          <section className="mt-16 md:mt-20">
            <GroupHeading
              title="Animations"
              note="Open one and move around in it."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiments.map((item, i) => (
                <ExperimentCard key={item.slug} item={item} index={i} />
              ))}
              <ComingSoonCard index={experiments.length} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
