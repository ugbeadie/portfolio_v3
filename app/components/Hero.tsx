"use client";

import { motion, Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { socials } from "./SocialSidebar";
import { projects } from "../data/projects";
import { useTransitionRouter } from "./PageTransition";

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.35,
    },
  },
};

const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    y: 15,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(-20% 0% -20% 0%)",
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const letterContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 1.4,
    },
  },
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
};

const headingLine =
  "text-3xl sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] font-semibold uppercase leading-[1.05] tracking-[-0.04em]";

export function Hero() {
  const description = "SOFTWARE DEVELOPER";
  const recent = projects.slice(0, 3);
  const { navigate } = useTransitionRouter();

  return (
    <section id="hero" className="relative overflow-hidden px-6 pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-15%] h-[560px] w-[560px] rounded-full bg-[#a87ffb]/20 blur-[130px]"
      />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="mb-4 md:mb-5">
            <div className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] text-text-secondary uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a87ffb] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#a87ffb]" />
              </span>
              OPEN TO OPPORTUNITIES
            </div>
          </div>

          <motion.h1
            className="mb-8 flex flex-col items-start text-left"
            style={{ fontFamily: "var(--font-display)" }}
            variants={headingContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={lineReveal} className={headingLine}>
              Building thoughtful,
            </motion.span>
            <motion.span variants={lineReveal} className={headingLine}>
              scalable <span className="text-[#a87ffb]">digital products</span>
            </motion.span>
            <motion.span variants={lineReveal} className={headingLine}>
              for real users.
            </motion.span>
          </motion.h1>

          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
            <motion.div
              className="flex shrink-0"
              variants={letterContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="text-base sm:text-lg md:text-xl leading-relaxed text-text font-medium flex flex-wrap tracking-[0.02em]">
                {description.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariant}
                    className={char === " " ? "mr-2" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="max-w-md text-base leading-relaxed text-text-secondary md:border-l md:border-border md:pl-10"
            >
              I build products end to end — the interface, the data model
              underneath it, and the deployment that puts it in front of people.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            <div className="w-full sm:w-auto">
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative flex items-center justify-center gap-2 text-sm bg-foreground text-background px-8 py-4 overflow-hidden w-full"
                >
                  <span className="uppercase relative z-10 flex items-center gap-2">
                    Get in Touch
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-[#a87ffb] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </a>
              </Magnetic>
            </div>

            <div className="w-full sm:w-auto">
              <Magnetic>
                <a
                  href="#projects"
                  className="uppercase px-8 py-4 text-sm border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center w-full"
                >
                  View Projects
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="md:hidden flex justify-center items-center flex-wrap gap-4 mt-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
          >
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 hover:brightness-110 transition-all w-12 h-12"
                  style={{
                    backgroundColor: social.hoverColor,
                    color: "#fff",
                  }}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.8 }}
            className="mt-16 md:mt-20 w-full"
          >
            <div className="flex items-center justify-between gap-6 mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
                Recent work
              </p>
              <a
                href="#projects"
                className="text-[10px] uppercase tracking-[0.3em] text-text-secondary hover:text-text transition-colors"
              >
                All projects
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border">
              {recent.map((project, i) => (
                <button
                  key={project.slug}
                  onClick={() =>
                    navigate(`/projects/${project.slug}`, project.title)
                  }
                  className="group flex items-start gap-4 py-5 sm:py-6 px-0 sm:px-6 sm:first:pl-0 border-b sm:border-b-0 border-border sm:border-l sm:first:border-l-0 text-left cursor-pointer"
                >
                  <span className="text-[10px] tracking-[0.2em] text-text-secondary pt-1">
                    0{i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2 font-semibold uppercase tracking-[-0.02em] text-lg group-hover:text-[#a87ffb] transition-colors">
                      {project.title}
                      <ArrowUpRight
                        size={16}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </span>
                    <span className="block text-sm text-text-secondary leading-relaxed line-clamp-2 mt-1">
                      {project.tagline}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
