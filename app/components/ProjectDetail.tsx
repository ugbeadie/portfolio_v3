"use client";

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, ArrowUpRight, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Magnetic } from "./Magnetic";
import { FoldingImage } from "./FoldingImage";
import { useTransitionRouter } from "./PageTransition";
import type { Project, Section, Shot } from "../data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-t border-border py-12 md:py-16">
      <h2 className="lg:col-span-4 text-xl md:text-2xl font-bold tracking-[-0.03em]">
        {section.label}
      </h2>
      <div className="lg:col-span-8 space-y-6">
        {section.body.map((paragraph, i) => (
          <p
            key={i}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

/**
 * Demo and Code at the top for people who want to skip straight there; the
 * write-up at the bottom, for people already convinced.
 */
function LinkRow({
  project,
  withWriteup = false,
}: {
  project: Project;
  withWriteup?: boolean;
}) {
  const writeup = withWriteup ? project.writeup : undefined;

  if (!project.repo && !project.live && !writeup) {
    return (
      <span className="inline-flex items-center px-6 h-12 rounded-full border border-dashed border-border text-[10px] uppercase tracking-[0.25em] text-text-secondary">
        Links coming soon
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {project.live && (
        <Magnetic>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 h-14 rounded-full border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all uppercase text-xs tracking-widest font-bold"
          >
            Live demo <ExternalLink size={18} />
          </a>
        </Magnetic>
      )}
      {project.repo && (
        <Magnetic>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 h-14 rounded-full border border-border hover:bg-foreground hover:text-background transition-all uppercase text-xs tracking-widest font-bold"
          >
            <SiGithub size={18} /> Code
          </a>
        </Magnetic>
      )}
      {writeup && (
        <Magnetic>
          <a
            href={writeup.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 h-14 rounded-full border border-border hover:bg-foreground hover:text-background transition-all text-xs tracking-widest font-bold"
          >
            <FileText size={18} className="shrink-0" />
            <span className="uppercase">{writeup.label}</span>
          </a>
        </Magnetic>
      )}
    </div>
  );
}

function Figure({
  shot,
  slices = 7,
  delay = 0,
  priority = false,
}: {
  shot: Shot;
  slices?: number;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <figure className="w-full">
      <div className="w-full aspect-video overflow-hidden rounded-lg bg-card border border-border">
        {priority ? (
          <FoldingImage src={shot.image} slices={slices} delay={delay} />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${shot.image})` }}
          />
        )}
      </div>
      <figcaption className="mt-4 text-sm text-text-secondary leading-relaxed italic">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { navigate } = useTransitionRouter();

  return (
    <main className="min-h-screen bg-background text-text transition-colors duration-300 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* HEADER */}
        <header className="pt-24">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            onClick={() => navigate("/#projects", "Selected works")}
            className="mb-14 px-5 h-12 cursor-pointer rounded-full border border-border hover:bg-foreground hover:text-background transition-all flex items-center gap-3 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-xs uppercase tracking-widest">
              Back to works
            </span>
          </motion.button>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.3em] text-text-secondary"
            >
              {project.meta}
            </motion.p>
            {project.draft && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="px-3 py-1 rounded-full border border-dashed border-border text-[9px] uppercase tracking-[0.25em] text-text-secondary"
              >
                Copy in progress
              </motion.span>
            )}
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-[-0.05em]"
            >
              {project.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-10 text-xl md:text-3xl leading-snug tracking-[-0.02em] max-w-3xl"
          >
            {project.hook}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-10"
          >
            <LinkRow project={project} />

            {project.demoLogin && (
              <p className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-border bg-card px-5 py-3 text-xs md:text-sm text-text-secondary">
                <span className="uppercase tracking-[0.2em] text-[10px]">
                  Demo login
                </span>
                <code className="font-mono text-text">
                  {project.demoLogin.email}
                </code>
                <span aria-hidden>·</span>
                <code className="font-mono text-text">
                  {project.demoLogin.password}
                </code>
              </p>
            )}
          </motion.div>
        </header>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 md:mt-24"
        >
          <Figure shot={project.hero} delay={0.6} priority />
        </motion.div>

        {/* STACK */}
        <Reveal className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-t border-border pt-10">
          <h2 className="lg:col-span-4 text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Stack
          </h2>
          <div className="lg:col-span-8 flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span
                key={item}
                className="border border-border px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-text-secondary bg-card"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        {/* SECTIONS — what it does, the hard part, the decision */}
        <div className="mt-8">
          {project.sections.map((section) => (
            <SectionBlock key={section.label} section={section} />
          ))}
        </div>

        {/* SELECTED IMAGES — stacked, never a carousel */}
        {project.gallery.length > 0 && (
          <section className="border-t border-border pt-12 md:pt-16 pb-4">
            <Reveal>
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em] mb-10">
                Selected images
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {project.gallery.map((shot, i) => (
                <Reveal key={i} delay={(i % 2) * 0.1}>
                  <Figure shot={shot} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* CLOSING SECTIONS — where it stands, what's still missing */}
        <div className="mt-12 md:mt-16">
          {project.closingSections.map((section) => (
            <SectionBlock key={section.label} section={section} />
          ))}
        </div>

        {/* CLOSER */}
        {project.closer && project.closer.length > 0 && (
          <Reveal className="border-t border-border pt-12">
            <div className="max-w-2xl space-y-6">
              {project.closer.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg md:text-xl leading-relaxed tracking-[-0.01em]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <LinkRow project={project} withWriteup />
            </div>
          </Reveal>
        )}

        {/* NEXT PROJECT */}
        <Reveal className="mt-24 md:mt-32 border-t border-border pt-12">
          <button
            onClick={() => navigate(`/projects/${next.slug}`, next.title)}
            className="group w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 cursor-pointer text-left"
          >
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-3">
                Next project
              </span>
              <span className="block text-4xl md:text-6xl font-bold uppercase tracking-[-0.04em] group-hover:text-[#ab8bff] transition-colors duration-300">
                {next.title}
              </span>
            </div>
            <ArrowUpRight
              size={40}
              className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 shrink-0"
            />
          </button>
        </Reveal>
      </div>
    </main>
  );
}
