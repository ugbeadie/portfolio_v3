"use client";

import { motion } from "motion/react";

const techStacks = {
  languages: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Dart",
    "Python",
    "React.js",
    "Vue.js",
    "Next.js",
    "Nuxt.js",
    "React Native",
    "Flutter",
    "Expo",
  ],

  styling: [
    "TailwindCSS",
    "SASS",
    "Material UI",
    "Styled Components",
    "Bootstrap",
    "Framer Motion",
  ],

  database: ["PostgreSQL", "MongoDB", "Drizzle", "Prisma"],

  hosting: ["Firebase", "Supabase", "Neon", "Vercel", "Netlify", "Git/GitHub"],
};

export function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-12 bg-background relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* LEFT SIDE */}
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
              viewport={{ once: true, margin: "-100px" }}
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
              viewport={{ once: true, margin: "-100px" }}
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
                    whileHover={{ y: -3 }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 transition-colors duration-300">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-8">
              Tech Stack
            </p>

            <div className="space-y-8">
              {/* LANGUAGES */}
              <StackSection
                title="Languages & Frameworks"
                items={techStacks.languages}
              />

              {/* STYLING */}
              <StackSection title="Styling" items={techStacks.styling} />

              {/* DATABASE */}
              <StackSection
                title="Database & ORM"
                items={techStacks.database}
              />

              {/* HOSTING */}
              <StackSection
                title="Hosting & Tools"
                items={techStacks.hosting}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StackSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-text font-semibold mb-4 text-lg">{title}</h3>

      <div className="flex flex-wrap gap-3">
        {items.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -3 }}
            className="px-4 py-2 rounded-full border border-border bg-background text-sm text-text-secondary shadow-sm transition-colors duration-300"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
