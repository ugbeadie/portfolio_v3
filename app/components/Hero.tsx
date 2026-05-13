"use client";

import { motion, Variants } from "motion/react";
import { Magnetic } from "./Magnetic";

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.5,
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
      staggerChildren: 0.05,
      delayChildren: 1.8,
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

export function Hero() {
  const description = "FRONTEND DEVELOPER";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 relative pt-20 lg:pt-0"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 md:mb-12">
            <div
              className="relative inline-flex rounded-full overflow-hidden"
              style={{ padding: "1.5px" }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-100%",
                  background:
                    "conic-gradient(from 0deg, transparent 0%, transparent 60%, #c4a4ff 72%, #a87ffb 78%, transparent 90%)",
                  animation: "badge-spin 2.8s linear infinite",
                  transformOrigin: "center",
                  willChange: "transform",
                }}
              />

              <div
                className="absolute rounded-full bg-background"
                style={{ inset: "1.5px" }}
              />

              <div className="relative flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase px-4 py-2 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-[#a87ffb]" />
                OPEN TO OPPORTUNITIES
              </div>
            </div>
          </div>

          <style>{`
            @keyframes badge-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
          `}</style>

          {/* Heading */}
          <motion.h1
            className="mb-8 flex flex-col"
            style={{ fontFamily: "var(--font-display)" }}
            variants={headingContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={lineReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[95px] 2xl:text-[105px] font-bold leading-[1.05] tracking-tight"
            >
              Building bridges
            </motion.span>
            <motion.span
              variants={lineReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[95px] 2xl:text-[105px] font-bold leading-[1.05] tracking-tight"
            >
              between <span className="text-[#a87ffb]">developers</span>
            </motion.span>
            <motion.span
              variants={lineReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[95px] 2xl:text-[105px] font-bold leading-[1.05] tracking-tight"
            >
              & technology
            </motion.span>
          </motion.h1>

          {/* Staggered Description */}
          <motion.div
            className="mb-12 max-w-2xl"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="text-base sm:text-lg md:text-xl leading-relaxed text-text-secondary font-medium flex flex-wrap">
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

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <Magnetic>
              <a
                href="#contact"
                className="group relative flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-[40px] font-medium overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <span className="group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </span>
                <div className="absolute inset-0 bg-[#a87ffb] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-[40px]" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#about"
                className="px-8 py-3.5 rounded-[40px] border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors flex items-center justify-center"
              >
                About Me
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
