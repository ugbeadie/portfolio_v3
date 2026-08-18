"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects, FEATURED_COUNT, type Project } from "../../data/projects";
import { useTransitionRouter } from "../layout/PageTransition";
import { Magnetic } from "../ui/Magnetic";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 !== 0;
  const router = useRouter();
  const { navigate } = useTransitionRouter();
  const href = `/projects/${project.slug}`;

  const open = () => navigate(href, project.title);

  // Rows alternate sides, so pin the labels to whichever edge faces the
  // copy. Single column below lg, where there is no inner edge.
  const labelSide = isEven ? "left-6 lg:left-auto lg:right-6" : "left-6";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
          aspect-[1365/630]
        `}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
          style={
            project.coverImages
              ? undefined
              : { backgroundImage: `url(${project.image})` }
          }
        >
          {project.coverImages && (
            <div className="w-full h-full flex items-center justify-center gap-3 md:gap-4 bg-card p-4 md:p-6">
              {project.coverImages.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="h-full w-auto" />
              ))}
            </div>
          )}
        </motion.div>

        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-all duration-500" />

        <div className={`absolute top-6 hidden lg:block ${labelSide}`}>
          <div className="px-4 py-2 border border-border bg-background/80 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-text-secondary transition-opacity duration-500 group-hover:opacity-0">
            Hover me
          </div>
        </div>

        <div className={`absolute bottom-6 overflow-hidden ${labelSide}`}>
          <div
            className="px-5 py-2 border border-border bg-background/80 backdrop-blur-md
            text-[10px] tracking-[0.25em] uppercase text-text transition-all duration-500 ease-out
            lg:translate-y-[120%] lg:group-hover:translate-y-0 translate-y-0"
          >
            Click to view
          </div>
        </div>
      </motion.a>

      <div
        className={`order-2 ${
          isEven ? "lg:order-2 lg:col-span-5" : "lg:order-1 lg:col-span-5"
        }`}
      >
        <h3
          onClick={open}
          className="text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] font-bold uppercase leading-[0.9] tracking-[-0.05em] mb-5 cursor-pointer"
        >
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-md mb-8">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.stack.map((tool) => (
            <span
              key={tool}
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
  const { navigate } = useTransitionRouter();
  const featured = projects.slice(0, FEATURED_COUNT);
  const remaining = projects.length - FEATURED_COUNT;

  return (
    <section
      id="projects"
      className="min-h-screen bg-background text-text px-6 md:px-12 pt-32 relative overflow-hidden transition-colors duration-300 scroll-mt-32"
    >
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

      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        {featured.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="max-w-7xl mx-auto mt-20 flex justify-center relative z-10">
          <Magnetic>
            <button
              onClick={() => navigate("/projects", "Projects")}
              className="group flex items-center gap-4 px-8 h-14 border border-border cursor-pointer uppercase text-xs tracking-[0.25em] font-bold hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-all duration-500"
            >
              {`View all (${projects.length})`}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </button>
          </Magnetic>
        </div>
      )}
    </section>
  );
}
