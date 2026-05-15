"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaFilePdf } from "react-icons/fa6";

const socials = [
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
      {/* Mobile */}
      <motion.div
        className="md:hidden flex justify-center items-center flex-wrap gap-4 mb-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full hover:brightness-110 transition-all"
              style={{
                backgroundColor: social.hoverColor,
                color: "#fff",
              }}
              aria-label={social.name}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.div>

      {/* Desktop */}
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
