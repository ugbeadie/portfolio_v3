"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { Magnetic } from "../ui/Magnetic";
import { useTransitionRouter } from "./PageTransition";

const navItems = [
  { name: "ABOUT", hash: "#about" },
  { name: "PROJECTS", hash: "#projects" },
  { name: "PLAYGROUND", hash: "#playground" },
  { name: "CONTACT", hash: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { navigate } = useTransitionRouter();

  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    setIsOpen(false);
    if (isHome) return;
    e.preventDefault();
    navigate(`/${hash}`);
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };

    if (mq.matches) setIsOpen(false);

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const scrollToTop = () => {
    setIsOpen(false);
    if (!isHome) {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lineVariants: Variants = {
    closed: { rotate: 0, y: 0, opacity: 1 },
    opened: (i: number) => {
      if (i === 0) return { rotate: 45, y: 8 };
      if (i === 1) return { opacity: 0 };
      return { rotate: -45, y: -8 };
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: 10,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-4 flex items-center justify-between pointer-events-none"
      >
        <motion.div
          animate={{
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(255, 255, 255, 0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none dark:hidden"
        />
        <motion.div
          animate={{
            backgroundColor: isScrolled
              ? "rgba(10, 10, 10, 0.15)"
              : "rgba(10, 10, 10, 0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none hidden dark:block"
        />
        <div
          onClick={scrollToTop}
          className="font-sans text-2xl font-bold tracking-tight pointer-events-auto cursor-pointer text-foreground relative z-10"
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            👨🏽‍💻
          </a>
        </div>

        <div className="hidden md:flex items-center gap-12 font-sans text-sm font-medium tracking-wide pointer-events-auto relative z-10">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <a
                href={hrefFor(item.hash)}
                onClick={(e) => handleNavClick(e, item.hash)}
                className="group relative block overflow-visible py-2 text-foreground"
              >
                <span className="invisible">{item.name}</span>
                <span
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-[1px] [clip-path:inset(0_0_50%_0)]"
                  aria-hidden="true"
                >
                  {item.name}
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-[1px] [clip-path:inset(50%_0_0_0)]"
                  aria-hidden="true"
                >
                  {item.name}
                </span>
              </a>
            </Magnetic>
          ))}
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-[6px] p-2 pointer-events-auto z-[111] relative"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={lineVariants}
              animate={isOpen ? "opened" : "closed"}
              className="w-8 h-[2px] bg-foreground"
            />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background z-[90] flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={hrefFor(item.hash)}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={(e) => handleNavClick(e, item.hash)}
                  className="group relative block text-4xl font-display font-bold text-foreground overflow-visible"
                >
                  <span className="invisible">{item.name}</span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-active:-translate-y-[2px] [clip-path:inset(0_0_50%_0)]">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-active:translate-y-[2px] [clip-path:inset(50%_0_0_0)]">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
