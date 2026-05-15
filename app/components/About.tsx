"use client";

import { motion } from "motion/react";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiFlutter,
  SiExpo,
  SiTailwindcss,
  SiSass,
  SiMui,
  SiStyledcomponents,
  SiBootstrap,
  SiFramer,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiGithub,
} from "react-icons/si";

import { Smartphone, Code2, Box } from "lucide-react";

const PythonIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 255" fill="none">
    <path
      fill="#FFD43B"
      d="M126.916 0c-64.6 0-60.6 28.02-60.6 28.02l.07 29.02h61.67v8.72H41.06S0 60.6 0 125.2c0 64.6 35.8 62.35 35.8 62.35h21.36v-30.02s-1.15-35.8 34.7-35.8h61.8s33.6.54 33.6-32.5V32.5S189.9 0 126.916 0Z"
    />
    <path
      fill="#3776AB"
      d="M129.084 255c64.6 0 60.6-28.02 60.6-28.02l-.07-29.02h-61.67v-8.72h86.99s41.06-4.9 41.06-69.5c0-64.6-35.8-62.35-35.8-62.35h-21.36v30.02s1.15 35.8-34.7 35.8h-61.8s-33.6-.54-33.6 32.5v64.5s-5.94 35.8 57.75 35.8Z"
    />
  </svg>
);

const techStacks = {
  "Languages & Frameworks": [
    {
      name: "HTML",
      icon: SiHtml5,
      color: "#E34F26",
      glow: "rgba(227,79,38,0.35)",
    },
    {
      name: "CSS",
      icon: Code2,
      color: "#1572B6",
      glow: "rgba(21,114,182,0.35)",
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
      glow: "rgba(247,223,30,0.35)",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
      glow: "rgba(49,120,198,0.35)",
    },
    {
      name: "Dart",
      icon: SiDart,
      color: "#0175C2",
      glow: "rgba(1,117,194,0.35)",
    },
    {
      name: "Python",
      icon: PythonIcon,
      color: "#3776AB",
      glow: "rgba(55,118,171,0.35)",
    },
    {
      name: "React.js",
      icon: SiReact,
      color: "#61DAFB",
      glow: "rgba(97,218,251,0.35)",
    },
    {
      name: "React Native",
      icon: Smartphone,
      color: "#61DAFB",
      glow: "rgba(97,218,251,0.35)",
    },
    {
      name: "Vue.js",
      icon: SiVuedotjs,
      color: "#42B883",
      glow: "rgba(66,184,131,0.35)",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "#000000",
      glow: "rgba(120,120,120,0.3)",
    },
    {
      name: "Nuxt.js",
      icon: Box,
      color: "#00DC82",
      glow: "rgba(0,220,130,0.35)",
    },
    {
      name: "Flutter",
      icon: SiFlutter,
      color: "#02569B",
      glow: "rgba(2,86,155,0.35)",
    },
    {
      name: "Expo",
      icon: SiExpo,
      color: "#000020",
      glow: "rgba(120,120,255,0.25)",
    },
  ],

  Styling: [
    {
      name: "TailwindCSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
      glow: "rgba(6,182,212,0.35)",
    },
    {
      name: "SASS",
      icon: SiSass,
      color: "#CC6699",
      glow: "rgba(204,102,153,0.35)",
    },
    {
      name: "Material UI",
      icon: SiMui,
      color: "#007FFF",
      glow: "rgba(0,127,255,0.35)",
    },
    {
      name: "Styled Components",
      icon: SiStyledcomponents,
      color: "#DB7093",
      glow: "rgba(219,112,147,0.35)",
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      color: "#7952B3",
      glow: "rgba(121,82,179,0.35)",
    },
    {
      name: "Framer Motion",
      icon: SiFramer,
      color: "#0055FF",
      glow: "rgba(0,85,255,0.35)",
    },
  ],

  "Database & ORM": [
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "#336791",
      glow: "rgba(51,103,145,0.35)",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
      glow: "rgba(71,162,72,0.35)",
    },
    {
      name: "Prisma",
      icon: SiPrisma,
      color: "#2D3748",
      glow: "rgba(45,55,72,0.35)",
    },
  ],

  Hosting: [
    {
      name: "Firebase",
      icon: SiFirebase,
      color: "#FFCA28",
      glow: "rgba(255,202,40,0.35)",
    },
    {
      name: "Supabase",
      icon: SiSupabase,
      color: "#3ECF8E",
      glow: "rgba(62,207,142,0.35)",
    },
    {
      name: "Vercel",
      icon: SiVercel,
      color: "#000000",
      glow: "rgba(120,120,120,0.3)",
    },
    {
      name: "Netlify",
      icon: SiNetlify,
      color: "#00C7B7",
      glow: "rgba(0,199,183,0.35)",
    },
    {
      name: "GitHub",
      icon: SiGithub,
      color: "#181717",
      glow: "rgba(120,120,120,0.3)",
    },
  ],
};

export function About() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl w-full mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-6xl text-text mb-8 leading-tight"
          >
            Building modern{" "}
            <span className="text-primary italic">digital experiences</span>.
          </motion.h2>

          <div className="font-sans text-md text-text-secondary space-y-6 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              My journey into software development started with curiosity and
              quickly grew into a passion for building intuitive,
              high-performance applications. I enjoy turning ideas into polished
              digital experiences while constantly improving my problem-solving
              and development skills.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Beyond frontend development, I’ve been actively learning Python
              for backend development, data science, and AI engineering. I’m
              particularly interested in understanding how intelligent systems
              are built, which has also pushed me to explore data-focused
              workflows since data plays a major role in modern AI applications.
              Alongside this, I continue refining my mobile development skills
              and exploring new technologies that help me grow as a developer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8 border-t border-border"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-text-secondary mb-4">
                Currently Exploring
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Backend Systems",
                  "Data Science",
                  "AI Engineering",
                  "Machine Learning",
                ].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 backdrop-blur-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto w-full"
        >
          <div className="rounded-[2rem] border border-border bg-card/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-10">
              Tech Stack
            </p>

            <div className="space-y-10">
              {Object.entries(techStacks).map(([section, items]) => (
                <div key={section}>
                  <h3 className="text-text font-semibold mb-5 text-lg">
                    {section}
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {items.map((tech: any, index: number) => {
                      const Icon = tech.icon;

                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.04,
                            duration: 0.4,
                          }}
                          whileHover={{
                            y: -8,
                            scale: 1.05,
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="group relative"
                        >
                          {/* HOVER GLOW */}
                          <div
                            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300"
                            style={{
                              background: tech.glow,
                            }}
                          />

                          {/* CHIP */}
                          <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border border-border bg-background/80 backdrop-blur-md text-sm text-text-secondary shadow-sm transition-all duration-300 group-hover:border-white/10">
                            {/* ICON */}
                            <div className="flex items-center justify-center">
                              <Icon
                                style={{
                                  color: tech.color,
                                }}
                                className="text-[18px] shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                              />
                            </div>

                            <span className="whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
