"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      id="about"
      className="py-32 px-6 md:px-12 bg-white relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative h-[600px] w-full rounded-2xl overflow-hidden bg-zinc-100 group">
          <motion.img
            style={{ y: y1 }}
            src="https://images.unsplash.com/photo-1752738372136-2602aaafdcb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsJTIwdGVjaCUyMGRldmVsb3BlcnxlbnwxfHx8fDE3Nzg0MDU2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Adie Ugbe"
            className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-['Playfair_Display'] text-5xl md:text-6xl text-zinc-900 mb-8 leading-tight"
          >
            Empowering the next generation of{" "}
            <span className="text-[#ab8bff] italic">creators</span>.
          </motion.h2>

          <div className="font-['Inter'] text-lg text-zinc-600 space-y-6 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              My journey started with a simple fascination for code, but evolved
              into a mission to democratize technical knowledge. I realized that
              the best tools are useless if developers don't know how to wield
              them.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              Over the years, I've had the privilege of building a community of
              over 400,000 developers. Through technical writing, video content,
              and open-source contributions, I strive to make complex concepts
              accessible and intuitive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="pt-6 grid grid-cols-2 gap-8 border-t border-zinc-200 mt-8"
            >
              <div>
                <div className="text-4xl font-['Playfair_Display'] text-zinc-900 mb-2">
                  400K+
                </div>
                <div className="text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Global Audience
                </div>
              </div>
              <div>
                <div className="text-4xl font-['Playfair_Display'] text-zinc-900 mb-2">
                  50+
                </div>
                <div className="text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Tech Talks
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
