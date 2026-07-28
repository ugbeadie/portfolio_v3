"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects, FEATURED_COUNT, type Project } from "../data/projects";
import { useTransitionRouter } from "./PageTransition";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 !== 0;
  const router = useRouter();
  const { navigate } = useTransitionRouter();
  const href = `/projects/${project.slug}`;

  const open = () => navigate(href);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      {/* INTERACTIVE IMAGE CONTAINER */}
      <motion.a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        onMouseEnter={() => router.prefetch(href)}
        aria-label={`View ${project.title}`}
        className={`
          relative overflow-hidden cursor-pointer group order-1 block
          ${isEven ? "lg:order-1 lg:col-span-7" : "lg:order-2 lg:col-span-7"}
          h-[220px] sm:h-[260px] md:h-[300px] lg:h-[230px] xl:h-[260px]
        `}
      >
        {/* Image Scale Effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
          style={{ backgroundImage: `url(${project.image})` }}
        />

        {/* Overlay Darkener */}
        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-500" />

        <div className="absolute bottom-6 left-6 overflow-hidden">
          <div
            className="px-5 py-2 border border-border bg-background/80 backdrop-blur-md
            lg:border-0 lg:bg-transparent lg:backdrop-blur-none
            text-[10px] tracking-[0.25em] uppercase text-text lg:text-black transition-all duration-500 ease-out
            lg:translate-y-[120%] lg:group-hover:translate-y-0 translate-y-0"
          >
            Click to view
          </div>
        </div>
      </motion.a>

      {/* PROJECT INFO */}
      <div
        className={`order-2 ${
          isEven ? "lg:order-2 lg:col-span-5" : "lg:order-1 lg:col-span-5"
        }`}
      >
        <h3
          onClick={open}
          className="text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] font-bold uppercase leading-[0.9] tracking-[-0.05em] mb-8 cursor-pointer"
        >
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-3">
          {project.tools.map((tool, i) => (
            <span
              key={i}
              className="border border-border px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-text-secondary bg-card"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);

  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section
      id="projects"
      className="min-h-screen bg-background text-text px-6 md:px-12 py-24 relative overflow-hidden transition-colors duration-300 scroll-mt-32"
    >
      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.06em]"
            >
              Selected <br />
              <span className="italic text-[#ab8bff] inline-block">Works</span>
            </motion.h2>
          </div>
          <p className="text-text-secondary text-base md:text-lg max-w-md leading-relaxed">
            A curated selection of platforms, applications, and digital
            experiences crafted with modern technologies.
          </p>
        </div>
      </motion.div>

      {/* PROJECTS LIST */}
      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        {featured.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}

        <AnimatePresence initial={false}>
          {showAll &&
            rest.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 40,
                  transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
                }}
              >
                <ProjectRow
                  project={project}
                  index={FEATURED_COUNT + index}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* VIEW MORE / LESS */}
      {rest.length > 0 && (
        <div className="max-w-7xl mx-auto mt-20 flex justify-center relative z-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group flex items-center gap-4 px-8 h-14 rounded-full border border-border cursor-pointer uppercase text-xs tracking-[0.25em] font-bold hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all duration-500"
          >
            {showAll ? "View less" : `View more (${rest.length})`}
            <motion.span
              animate={{ y: showAll ? 0 : [0, 4, 0] }}
              transition={{
                duration: 1.4,
                repeat: showAll ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="flex"
            >
              {showAll ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </motion.span>
          </button>
        </div>
      )}
    </section>
  );
}
