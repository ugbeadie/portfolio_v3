import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference text-white pointer-events-none"
    >
      <div className="font-['Playfair_Display'] text-2xl font-bold tracking-tight pointer-events-auto cursor-pointer">
        A<span className="text-[#ab8bff]">.</span>U
      </div>

      <div className="hidden md:flex items-center gap-12 font-['Inter'] text-sm font-medium tracking-wide pointer-events-auto">
        <Magnetic>
          <a href="#about" className="hover:text-[#ab8bff] transition-colors">
            About
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#projects"
            className="hover:text-[#ab8bff] transition-colors"
          >
            Work
          </a>
        </Magnetic>
        <Magnetic>
          <a href="#contact" className="hover:text-[#ab8bff] transition-colors">
            Contact
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
