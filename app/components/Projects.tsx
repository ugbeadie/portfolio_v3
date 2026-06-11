"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Magnetic } from "./Magnetic";
import { createPortal } from "react-dom";

const projects = [
  {
    id: 1,
    title: "TRACKR",
    image: "images/trackr.png",
    tools: [
      "Next.js",
      "Tailwind",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenRouter AI",
    ],
    about:
      "A full-stack job tracking platform with a drag-and-drop Kanban board, analytics dashboard, GitHub-style activity graph, and AI-powered job detail extraction from pasted job links.",
    repo: "https://github.com/ugbeadie/billr",
    live: "https://trackr.ugbeadie.com/",
  },
  {
    id: 2,
    title: "MONEYTRAIL",
    image: "images/moneytrail.png",
    tools: ["Next.js", "Tailwind", "PostgreSQL", "Drizzle ORM"],
    about:
      "An ecommerce store built with React focusing on clean UI. See repo README for full project description and walkthrough.",
    repo: "https://github.com/ugbeadie/moneytrail-rework",
    live: "https://moneytrail.ugbeadie.com/",
  },
  {
    id: 3,
    title: "GitBurn",
    image: "images/gitburn.png",
    tools: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Tailwind",
      "Framer Motion",
      "OpenRouter AI",
    ],
    about:
      "An AI-powered roast machine that aggregates a developer's public GitHub footprint, repository metrics, and commit history to generate a brutally personalized, cynical code review.",
    repo: "https://github.com/ugbeadie/GitBurn",
    live: "https://gitburn.ugbeadie.com",
  },
];

function FoldingImage({ src, slices = 6 }: { src: string; slices?: number }) {
  return (
    <div
      className="w-full h-full flex overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {Array.from({ length: slices }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ rotateY: 90, opacity: 0, z: -300 }}
          animate={{ rotateY: 0, opacity: 1, z: 0 }}
          exit={{ rotateY: -90, opacity: 0, z: -300 }}
          transition={{
            duration: 0.85,
            delay: i * 0.07,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            flex: 1,
            height: "100%",
            backgroundImage: `url(${src})`,
            backgroundSize: `${slices * 100}% 100%`,
            backgroundPosition: `${(i / (slices - 1)) * 100}% center`,
            backgroundRepeat: "no-repeat",
            transformOrigin: i % 2 === 0 ? "left" : "right",
          }}
        />
      ))}
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

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
              initial={{ y: "100%" }} // <-- Changed from 120 to "100%"
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
        {projects.map((project, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* INTERACTIVE IMAGE CONTAINER */}
              <motion.div
                onClick={() => setSelectedProject(project)}
                className={`
                  relative overflow-hidden cursor-pointer group order-1
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
              </motion.div>

              {/* PROJECT INFO */}
              <div
                className={`order-2 ${
                  isEven
                    ? "lg:order-2 lg:col-span-5"
                    : "lg:order-1 lg:col-span-5"
                }`}
              >
                <h3 className="text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] font-bold uppercase leading-[0.9] tracking-[-0.05em] mb-8">
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
        })}
      </div>

      {/* FULLSCREEN OVERLAY */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-[100] bg-background text-text flex flex-col md:flex-row h-screen overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0.45 } }}
              >
                {/* Modal Content */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="w-full md:w-[45%] h-auto md:h-full bg-background border-b border-border p-8 md:p-16 flex flex-col justify-center relative z-20"
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-8 left-8 p-3 cursor-pointer rounded-full border border-border hover:bg-foreground hover:text-background transition-all flex items-center gap-2 group"
                  >
                    <X
                      size={20}
                      className="group-hover:rotate-90 transition-transform duration-300"
                    />
                    <span className="text-xs uppercase tracking-widest">
                      Close
                    </span>
                  </button>

                  <div className="space-y-8 mt-12">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none border-b border-border pb-6">
                      {selectedProject.title}
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                      {selectedProject.about}
                    </p>

                    <div className="flex items-center gap-6 pt-6">
                      <Magnetic>
                        <a
                          href={selectedProject.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
                        >
                          <SiGithub size={24} />
                        </a>
                      </Magnetic>
                      <Magnetic>
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-8 h-14 rounded-full border border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all uppercase text-xs tracking-widest font-bold"
                        >
                          Live Demo <ExternalLink size={18} />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>

                {/* Modal Image (Folding Effect) */}
                <div className="w-full md:w-[55%] flex-1 h-[40vh] md:h-full bg-background flex items-center justify-center p-6 md:py-24 md:pl-12 md:pr-20">
                  <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                    <FoldingImage src={selectedProject.image} slices={7} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
