"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { socials } from "../layout/SocialSidebar";

const EMAIL = "ugbeadie3@gmail.com";
const EASE = [0.22, 1, 0.36, 1] as const;

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <Magnetic>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
          } catch {
            window.location.href = `mailto:${EMAIL}`;
          }
        }}
        aria-label={`Copy ${EMAIL} to clipboard`}
        className="relative w-full sm:w-44 h-14 border border-border overflow-hidden cursor-pointer hover:border-[#ab8bff] transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "idle"}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ duration: 0.28, ease: EASE }}
            className={`absolute inset-0 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold ${
              copied ? "text-[#ab8bff]" : ""
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy address"}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 bg-background text-text relative z-20 overflow-hidden transition-colors duration-300 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-16 lg:gap-24">
        <div className="lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.06em]"
          >
            Let&apos;s build <br />
            <span className="text-[#ab8bff] italic">together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="text-text-secondary text-lg max-w-md mt-8 leading-relaxed"
          >
            Work, questions, or a bug you found in one of these — it all reaches
            me at the same place, and I read everything.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="lg:col-span-7 flex flex-col justify-between gap-12"
        >
          <div className="border-t border-border pt-8">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-6">
              Email
            </span>

            <a
              href={`mailto:${EMAIL}`}
              className="group inline-block text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.03em] break-all hover:text-[#ab8bff] transition-colors"
            >
              {EMAIL}
              <span className="block h-[2px] w-0 group-hover:w-full bg-[#ab8bff] transition-all duration-500 ease-out" />
            </a>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CopyEmail />
              <Magnetic>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative flex items-center justify-center w-full sm:w-44 h-14 bg-foreground text-background overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 text-[10px] uppercase tracking-[0.25em] font-bold">
                    Open mail app
                  </span>
                  <span className="absolute inset-0 bg-[#ab8bff] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-6">
              Elsewhere
            </span>

            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Magnetic key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-5 h-12 border border-border hover:border-[#ab8bff] transition-colors"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold">
                        {social.name}
                      </span>
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
