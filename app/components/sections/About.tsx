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
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiSass,
  SiShadcnui,
  SiFramer,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiNetlify,
} from "react-icons/si";

import { Smartphone, Code2, Box, CloudLightning } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { FaFilePdf } from "react-icons/fa6";
import { RESUME_URL } from "../layout/SocialSidebar";

type Tech = {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  glow: string;
};

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

const MONO = "var(--foreground)";

const techStacks: Record<string, Tech[]> = {
  Frontend: [
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
      name: "React.js",
      icon: SiReact,
      color: "#61DAFB",
      glow: "rgba(97,218,251,0.35)",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: MONO,
      glow: "rgba(120,120,120,0.3)",
    },

    {
      name: "Vue.js",
      icon: SiVuedotjs,
      color: "#42B883",
      glow: "rgba(66,184,131,0.35)",
    },

    {
      name: "Nuxt.js",
      icon: Box,
      color: "#00DC82",
      glow: "rgba(0,220,130,0.35)",
    },
    {
      name: "React Native",
      icon: Smartphone,
      color: "#61DAFB",
      glow: "rgba(97,218,251,0.35)",
    },
    {
      name: "Flutter",
      icon: SiFlutter,
      color: "#02569B",
      glow: "rgba(2,86,155,0.35)",
    },
  ],

  Backend: [
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#339933",
      glow: "rgba(51,153,51,0.35)",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: MONO,
      glow: "rgba(120,120,120,0.3)",
    },
    {
      name: "Python",
      icon: PythonIcon,
      color: "#3776AB",
      glow: "rgba(55,118,171,0.35)",
    },
    {
      name: "FastAPI",
      icon: SiFastapi,
      color: "#009688",
      glow: "rgba(0,150,136,0.35)",
    },
  ],

  "Styling & UI": [
    {
      name: "TailwindCSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
      glow: "rgba(6,182,212,0.35)",
    },
    {
      name: "shadcn/ui",
      icon: SiShadcnui,
      color: MONO,
      glow: "rgba(120,120,120,0.3)",
    },
    {
      name: "SASS",
      icon: SiSass,
      color: "#CC6699",
      glow: "rgba(204,102,153,0.35)",
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
      color: MONO,
      glow: "rgba(45,55,72,0.35)",
    },
    {
      name: "Drizzle",
      icon: SiDrizzle,
      color: "#C5F74F",
      glow: "rgba(197,247,79,0.35)",
    },
  ],

  Hosting: [
    {
      name: "Neon",
      icon: CloudLightning,
      color: "#00E599",
      glow: "rgba(0,229,153,0.35)",
    },

    {
      name: "Supabase",
      icon: SiSupabase,
      color: "#3ECF8E",
      glow: "rgba(62,207,142,0.35)",
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      color: "#FFCA28",
      glow: "rgba(255,202,40,0.35)",
    },
    {
      name: "Vercel",
      icon: SiVercel,
      color: MONO,
      glow: "rgba(120,120,120,0.3)",
    },
    {
      name: "Netlify",
      icon: SiNetlify,
      color: "#00C7B7",
      glow: "rgba(0,199,183,0.35)",
    },
  ],
};
export function About() {
  return (
    <section
      id="about"
      className="pt-32  px-6 md:px-12 bg-background relative overflow-hidden scroll-mt-32"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-6">
                About
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl text-text leading-[1.05] tracking-[-0.06em]">
                The short{" "}
                <span className="text-primary italic block">version</span>
              </h2>
            </motion.div>

            <div className="font-sans text-text-secondary space-y-6 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-text leading-relaxed"
              >
                My journey into software development started with curiosity and
                grew into a real passion for building intuitive,
                high-performance applications. I enjoy turning ideas into
                polished digital experiences while constantly sharpening my
                problem-solving and development skills.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base"
              >
                I started on the frontend, but a good deal of my time since has
                gone into the backend, and most of what I build now, I build end
                to end. What I'm looking into next is DevOps — how a thing gets
                built, deployed, and kept running once the code is written. I've
                stepped back from Python for the moment, though I fully intend
                to come back to it for data science and AI engineering.
                Alongside that, I keep refining my mobile development skills and
                picking up whatever the next project asks for. Getting my hands
                on something I haven't used before is the part of this work I
                enjoy most.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-base"
              >
                Away from the editor, I'm at the gym daily, and there's almost
                always music playing while I code. When I want to properly
                unwind, it's anime, and I read up on tech trends on daily.dev
                most days. I'm also chipping away at French, pushing toward
                fluency, (<span className="italic">petit à petit !</span>)
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-14 border-t border-border pt-10"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-5">
                Currently Exploring
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Backend Systems",
                  "DevOps",
                  "Data Science",
                  "AI Engineering",
                ].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    className="border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-primary"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="pt-10 inline-block">
                <Magnetic>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 h-14 border
                    border-border hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white
                    transition-all uppercase text-xs tracking-widest font-bold text-text"
                  >
                    View Resume
                    <FaFilePdf className="text-lg" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full lg:sticky lg:top-28"
          >
            <div className="border border-border bg-card">
              <div className="border-b border-border px-6 py-5 md:px-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
                  Tech Stack
                </p>
              </div>

              {Object.entries(techStacks).map(([section, items]) => (
                <div
                  key={section}
                  className="px-6 md:px-8 py-7 border-b border-border last:border-b-0"
                >
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-5">
                    {section}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {items.map((tech, index) => {
                      const Icon = tech.icon;

                      return (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.03, duration: 0.4 }}
                          whileHover={{ y: -3 }}
                          style={
                            { "--tech-glow": tech.glow } as React.CSSProperties
                          }
                          className="flex items-center gap-2 border border-border bg-background px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-300 hover:border-foreground/30 hover:bg-(--tech-glow) hover:text-text"
                        >
                          <Icon
                            style={{ color: tech.color }}
                            className="text-[14px] shrink-0"
                          />
                          <span className="whitespace-nowrap">{tech.name}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
