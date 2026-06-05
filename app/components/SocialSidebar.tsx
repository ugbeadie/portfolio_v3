"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaFilePdf } from "react-icons/fa6";

// Explicitly export the socials array so Hero.tsx can use it
export const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/ugbeadie",
    hoverColor: "#24292f",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/ugbe-adie/",
    hoverColor: "#0077B5",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    href: "https://x.com/atersam1",
    hoverColor: "#000000",
  },
  {
    name: "Resume",
    icon: FaFilePdf,
    href: "#",
    hoverColor: "#4F585F",
  },
];

export function SocialSidebar() {
  return (
    <>
      {/* Desktop (Mobile block has been moved to Hero.tsx) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col items-end z-50">
        {socials.map((social, index) => {
          const Icon = social.icon;

          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: social.hoverColor }}
              className="group flex items-center justify-end h-12 cursor-pointer overflow-hidden"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={{
                initial: { x: 100 },
                animate: {
                  x: 0,
                  transition: {
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  },
                },
              }}
              aria-label={social.name}
            >
              {/* Expanding Text Label */}
              <motion.div
                className="flex items-center whitespace-nowrap overflow-hidden text-white font-medium h-full"
                variants={{
                  initial: {
                    width: 0,
                    opacity: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                  animate: {
                    width: 0,
                    opacity: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                  hover: {
                    width: "auto",
                    opacity: 1,
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                  },
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {social.name}
              </motion.div>

              {/* Persistent Icon Block */}
              <div className="w-12 h-12 flex items-center justify-center text-white shrink-0">
                <Icon className="w-6 h-6" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
