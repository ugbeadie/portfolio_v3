"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  ArrowUpRight,
  FileText,
  Maximize2,
  Play,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Magnetic } from "./Magnetic";
import { FoldingImage } from "./FoldingImage";
import { Lightbox } from "./Lightbox";
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

/** The write-up leads the closer; the header only ever gets demo and code. */
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
      <span className="inline-flex items-center px-6 h-12 border border-dashed border-border text-[10px] uppercase tracking-[0.25em] text-text-secondary">
        Links coming soon
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {writeup &&
        (writeup.url ? (
          <Magnetic>
            <a
              href={writeup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 h-14 border border-border bg-card hover:bg-foreground hover:text-background transition-all text-xs tracking-widest font-bold"
            >
              <FileText size={18} className="shrink-0" />
              <span className="uppercase">{writeup.label}</span>
            </a>
          </Magnetic>
        ) : (
          <span className="flex items-center gap-3 px-8 h-14 border border-dashed border-border text-xs tracking-widest font-bold text-text-secondary">
            <FileText size={18} className="shrink-0" />
            <span className="uppercase">{writeup.label}</span>
            <span className="text-[9px] tracking-[0.25em] border border-border px-2 py-1">
              Soon
            </span>
          </span>
        ))}
      {project.live && (
        <Magnetic>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 h-14 border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all uppercase text-xs tracking-widest font-bold"
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
            className="flex items-center gap-3 px-8 h-14 border border-border hover:bg-foreground hover:text-background transition-all uppercase text-xs tracking-widest font-bold"
          >
            <SiGithub size={18} /> Code
          </a>
        </Magnetic>
      )}
    </div>
  );
}

/** Ambient only — controls and sound live in the lightbox. */
function ShotVideo({ shot, paused = false }: { shot: Shot; paused?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // autoPlay has already fired by now, so this pauses after the fact.
    if (reduced || paused) video.pause();
    else void video.play().catch(() => {});
  }, [reduced, paused]);

  return (
    <video
      ref={ref}
      src={shot.video}
      poster={shot.image}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="w-full h-full object-cover"
    />
  );
}

export function isPortrait(aspect?: string) {
  if (!aspect) return false;
  const [width, height] = aspect.split("/").map((part) => Number(part.trim()));
  return Boolean(width && height && width < height);
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
  const [expanded, setExpanded] = useState(false);
  const group = shot.images?.length ? shot.images : null;
  const portrait = isPortrait(shot.aspect);
  const label = shot.video
    ? `Play video: ${shot.caption}`
    : `View full size: ${shot.caption}`;

  return (
    <figure className="w-full">
      {shot.video && (
        <p
          className={`mb-4 text-[10px] uppercase tracking-[0.3em] text-text-secondary ${
            portrait ? "text-center" : ""
          }`}
        >
          Click to preview
          {shot.speed ? ` · ${shot.speed}× speed` : ""}
        </p>
      )}
      <div
        className={`relative overflow-hidden bg-card border border-border shadow-shot group ${
          portrait
            ? "w-full max-w-[340px] mx-auto"
            : group
              ? "w-full max-w-3xl mx-auto"
              : "w-full"
        }`}
        // A group is sized by the images it holds, not by a set ratio.
        style={{ aspectRatio: group ? undefined : (shot.aspect ?? "16 / 9") }}
      >
        {group ? (
          <div className="flex gap-2 sm:gap-3 p-2 sm:p-3">
            {group.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="min-w-0 flex-1 object-contain"
              />
            ))}
          </div>
        ) : shot.video ? (
          <ShotVideo shot={shot} paused={expanded} />
        ) : priority ? (
          <FoldingImage src={shot.image} slices={slices} delay={delay} />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${shot.image})` }}
          />
        )}

        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={label}
          className="absolute inset-0 flex items-end justify-end p-4 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#ab8bff]"
        >
          <span className="flex items-center gap-2 px-4 h-10 border border-white/25 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.25em] opacity-100 md:opacity-0 md:group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
            {shot.video ? <Play size={14} /> : <Maximize2 size={14} />}
            {shot.video ? "Play" : "Expand"}
          </span>
        </button>
      </div>
      <figcaption
        className={`mt-4 text-sm text-text-secondary leading-relaxed italic ${
          portrait ? "text-center" : ""
        }`}
      >
        {shot.caption}
      </figcaption>

      <AnimatePresence>
        {expanded && (
          <Lightbox shot={shot} onClose={() => setExpanded(false)} />
        )}
      </AnimatePresence>
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
        <header className="pt-24">
          <div className="mb-14 flex">
            <Magnetic>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                onClick={() => navigate("/#projects", "Selected works")}
                className="px-5 h-12 cursor-pointer border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all flex items-center gap-3 group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                />
                <span className="text-xs uppercase tracking-widest">
                  Back to works
                </span>
              </motion.button>
            </Magnetic>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-[10px] uppercase tracking-[0.3em] text-text-secondary"
          >
            {project.category}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-[-0.05em]"
            >
              {project.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-8 text-lg md:text-2xl leading-snug tracking-[-0.02em] max-w-3xl"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 md:mt-24"
        >
          <Figure shot={project.hero} delay={0.6} priority />
        </motion.div>

        <Reveal className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-t border-border pt-10">
          <h2 className="lg:col-span-4 text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Stack/Tools
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

        <div className="mt-8">
          {project.sections.map((section) => (
            <SectionBlock key={section.label} section={section} />
          ))}
        </div>

        {project.gallery.length > 0 && (
          <section className="border-t border-border pt-12 md:pt-16 pb-4">
            <Reveal>
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em] mb-10">
                Selected screens
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {project.gallery.map((shot, i) => (
                <Reveal
                  key={i}
                  delay={(i % 2) * 0.1}
                  // Only a set of screens claims the row; the rest sit in the grid.
                  className={shot.images?.length ? "md:col-span-2" : undefined}
                >
                  <Figure shot={shot} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 md:mt-16">
          {project.closingSections.map((section) => (
            <SectionBlock key={section.label} section={section} />
          ))}
        </div>

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
