"use client";

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Magnetic } from "./Magnetic";
import { FoldingImage } from "./FoldingImage";
import { useTransitionRouter } from "./PageTransition";
import type { Project } from "../data/projects";

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { navigate } = useTransitionRouter();

  return (
    <main className="min-h-screen bg-background text-text flex flex-col md:flex-row md:h-screen md:overflow-hidden transition-colors duration-300">
      {/* INFO PANEL */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="w-full md:w-[45%] md:h-full bg-background border-b md:border-b-0 md:border-r border-border px-6 sm:px-10 md:px-16 pt-28 md:pt-24 pb-16 flex flex-col justify-center relative z-20"
      >
        <button
          onClick={() => navigate("/#projects")}
          className="self-start mb-10 px-5 h-12 cursor-pointer rounded-full border border-border hover:bg-foreground hover:text-background transition-all flex items-center gap-3 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="text-xs uppercase tracking-widest">
            Back to works
          </span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-[-0.05em] border-b border-border pb-6">
            {project.title}
          </h1>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
            {project.about}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="border border-border px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-text-secondary bg-card"
              >
                {tool}
              </span>
            ))}
          </div>

          {project.repo || project.live ? (
            <div className="flex items-center gap-6 pt-4">
              {project.repo && (
                <Magnetic>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository`}
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
                  >
                    <SiGithub size={24} />
                  </a>
                </Magnetic>
              )}
              {project.live && (
                <Magnetic>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 h-14 rounded-full border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all uppercase text-xs tracking-widest font-bold"
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>
                </Magnetic>
              )}
            </div>
          ) : (
            <div className="pt-4">
              <span className="inline-flex items-center px-6 h-12 rounded-full border border-dashed border-border text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Links coming soon
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* VISUAL PANEL */}
      <div className="w-full md:w-[55%] md:h-full bg-background flex flex-col justify-center gap-10 px-6 py-16 md:py-24 md:pl-12 md:pr-16">
        <div className="w-full aspect-video relative overflow-hidden rounded-lg">
          <FoldingImage src={project.image} slices={7} delay={0.25} />
        </div>

        {/* NEXT PROJECT */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onClick={() => navigate(`/projects/${next.slug}`)}
          className="group self-end flex items-center gap-4 cursor-pointer text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Next
          </span>
          <span className="text-lg md:text-2xl font-bold uppercase tracking-[-0.03em] group-hover:text-[#ab8bff] transition-colors duration-300">
            {next.title}
          </span>
          <ArrowUpRight
            size={22}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
          />
        </motion.button>
      </div>
    </main>
  );
}
