"use client";

import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Magnetic } from "../components/ui/Magnetic";
import { useTransitionRouter } from "../components/layout/PageTransition";
import { projects, FEATURED_COUNT, type Project } from "../data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

const STACK_SHOWN = 3;

function IndexRow({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  const { navigate } = useTransitionRouter();
  const href = `/projects/${project.slug}`;
  const hidden = project.stack.length - STACK_SHOWN;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: EASE }}
      onClick={() => navigate(href, project.title)}
      onMouseEnter={() => router.prefetch(href)}
      className="group w-full grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center border-t border-border py-8 md:py-10 text-left cursor-pointer"
    >
      <span className="md:col-span-1 text-[10px] tracking-[0.25em] text-text-secondary">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="md:col-span-3 w-full aspect-[1365/630] grayscale group-hover:grayscale-0 transition-all duration-500 border border-border">
        {project.coverImages ? (
          <div className="w-full h-full flex items-center justify-center gap-1.5 bg-card p-2">
            {project.coverImages.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="h-full w-auto" />
            ))}
          </div>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
      </div>

      <div className="md:col-span-5">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-2">
          {project.category}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[-0.03em] group-hover:text-[#ab8bff] transition-colors duration-300">
          {project.title}
        </h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-md">
          {project.tagline}
        </p>
      </div>

      <div className="md:col-span-3 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, STACK_SHOWN).map((tool) => (
            <span
              key={tool}
              className="border border-border px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-text-secondary"
            >
              {tool}
            </span>
          ))}
          {hidden > 0 && (
            <span
              title={project.stack.join(" · ")}
              className="border border-dashed border-border px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-text-secondary"
            >
              +{hidden}
            </span>
          )}
        </div>
        <ArrowUpRight
          size={24}
          className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        />
      </div>
    </motion.button>
  );
}

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

export function ProjectsIndex() {
  const { navigate } = useTransitionRouter();
  const selected = projects.slice(0, FEATURED_COUNT);
  const archive = projects.slice(FEATURED_COUNT);

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
              Projects
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-8 text-lg md:text-2xl leading-snug tracking-[-0.02em] max-w-3xl"
          >
            Everything worth reading about, in one list. Each one has a write-up
            of what it does, the part that was hard, and a decision I would
            defend.
          </motion.p>
        </header>

        <div className="mt-16 md:mt-20">
          <GroupHeading
            title="Selected work"
            note="The four worth reading closely."
          />
          {selected.map((project, i) => (
            <IndexRow key={project.slug} project={project} index={i} />
          ))}
          <div className="border-t border-border" />

          {archive.length > 0 && (
            <div className="mt-20 md:mt-24">
              <GroupHeading
                title="Archive"
                note="Older work, shown as it was built."
              />
              {archive.map((project, i) => (
                <IndexRow
                  key={project.slug}
                  project={project}
                  index={FEATURED_COUNT + i}
                />
              ))}
              <div className="border-t border-border" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
