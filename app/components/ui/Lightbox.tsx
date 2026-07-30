"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Shot } from "../../data/projects";

/**
 * Portalled to the body: figures sit inside an animating motion.div, and a
 * transformed ancestor would make `fixed` position against it, not the viewport.
 * z-150 puts it over the navbar and under the page-transition curtain.
 */
export function Lightbox({
  shot,
  onClose,
}: {
  shot: Shot;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      onClick={onClose}
      className="fixed inset-0 z-150 flex flex-col items-center justify-center gap-6 bg-black/92 backdrop-blur-sm p-4 sm:p-8 md:p-14"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 md:top-8 md:right-8 flex items-center gap-3 px-4 h-11 border border-white/20 text-white cursor-pointer hover:bg-white hover:text-black transition-colors text-[10px] uppercase tracking-[0.25em]"
      >
        Close <X size={16} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        // Or scrubbing the video would reach the backdrop and close it.
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col items-center gap-5 max-w-full"
      >
        {shot.video ? (
          <video
            src={shot.video}
            poster={shot.image}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] max-w-full border border-white/10"
          />
        ) : shot.images?.length ? (
          <div className="flex gap-3 md:gap-6 justify-center max-w-full">
            {shot.images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="min-w-0 max-h-[78vh] object-contain border border-white/10"
              />
            ))}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.image}
            alt={shot.caption}
            className="max-h-[78vh] max-w-full object-contain border border-white/10"
          />
        )}

        <figcaption className="flex flex-col items-center gap-3 text-sm text-white/60 italic leading-relaxed text-center max-w-2xl">
          {shot.caption}
          {shot.speed && (
            <span className="not-italic border border-white/20 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/50">
              {shot.speed}× speed
            </span>
          )}
        </figcaption>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
