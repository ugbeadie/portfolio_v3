"use client";

import { motion } from "motion/react";
import { FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const socials = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "#",
    hoverColor: "#0077B5",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "#",
    hoverColor: "#24292f",
  },
  {
    name: "Resume",
    icon: FileText,
    href: "#",
    hoverColor: "#4F585F",
  },
  {
    name: "Email",
    icon: Mail,
    href: "#",
    hoverColor: "#72C8AB",
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full hover:brightness-110 transition-all"
              style={{
                backgroundColor: social.hoverColor,
                color: "#fff",
              }}
              aria-label={social.name}
            >
              <Icon className="w-5 h-5" />
              {/* <span className="font-medium text-sm">{social.name}</span> */}
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
              style={{ backgroundColor: social.hoverColor }}
              className="group flex items-center justify-end h-16 cursor-pointer overflow-hidden"
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
              <div className="w-16 h-16 flex items-center justify-center text-white shrink-0">
                <Icon className="w-6 h-6" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
