"use client";

import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Playground } from "./components/sections/Playground";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

export default function App() {
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothVelocity = useSpring(useVelocity(scrollY), {
    stiffness: 120,
    damping: 35,
    restDelta: 0.01,
  });

  const lean = useReducedMotion() ? 0 : 8;
  const skewY = useTransform(
    smoothVelocity,
    [-4000, 0, 4000],
    [lean, 0, -lean],
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#a87ffb] origin-left z-50"
        style={{ scaleX }}
      />

      <motion.main
        className="relative z-10 origin-center"
        style={{
          skewY,
          willChange: "transform",
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Playground />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  );
}
