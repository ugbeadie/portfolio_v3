"use client";

import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";

export function Hero() {
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
          <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-8 md:mb-12">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a87ffb]" />
            OPEN TO OPPORTUNITIES
          </div>

          <motion.h1
            className="mb-8"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-5xl sm:text-7xl lg:text-[110px] leading-[1.05] tracking-tight">
              Building bridges
            </span>

            <span className="block text-5xl sm:text-7xl lg:text-[110px] leading-[1.05] tracking-tight">
              between <span className="text-[#a87ffb]">developers</span>
            </span>

            <span className="block text-5xl sm:text-7xl lg:text-[110px] leading-[1.05] tracking-tight">
              & technology
            </span>
          </motion.h1>

          <motion.div
            className="mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-base sm:text-lg md:text-xl leading-relaxed text-white font-medium flex flex-col items-start gap-2">
              <span className="bg-[#a87ffb] px-2 py">
                Software developer specializing in crafting responsive,
              </span>

              <span className="bg-[#a87ffb] px-2 py-1">
                high-quality user interfaces for web and cross-platform
              </span>

              <span className="bg-[#a87ffb] px-2 py-1">
                mobile applications and eager to continuously improve my
              </span>

              <span className="bg-[#a87ffb] px-2 py-1">
                skills and learn more about new frameworks and technologies.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
