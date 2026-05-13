"use client";

import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { motion, useScroll, useSpring } from "motion/react";
import { ThemeProvider } from "next-themes";
import { SocialSidebar } from "./components/SocialSidebar";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative">
      <DarkModeToggle />
      <Cursor />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#a87ffb] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="relative z-10">
        <Navbar />
        <Hero />
        <SocialSidebar />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 px-6 border-t border-border bg-background text-foreground">
        <div className="max-w-6xl mx-auto text-center opacity-60 text-sm font-medium">
          <p>&copy; 2026 Ugbe. Built with React & TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}
