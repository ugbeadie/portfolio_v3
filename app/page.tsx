"use client";

import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { ThemeProvider } from "next-themes";
import { SocialSidebar } from "./components/SocialSidebar";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
} from "motion/react";

export default function App() {
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.01,
  });

  const skewY = useTransform(smoothVelocity, [-4000, 0, 4000], [8, 0, -8]);

  return (
    <div className="relative overflow-hidden">
      <DarkModeToggle />
      <Cursor />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#a87ffb] origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <SocialSidebar />

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
        <Contact />
        <Footer />
      </motion.main>
    </div>
  );
}
