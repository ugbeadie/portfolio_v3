"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Experiment } from "../../data/playground";
import { useTransitionRouter } from "../layout/PageTransition";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function ExperimentCard({
  item,
  index,
}: {
  item: Experiment;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLAnchorElement>(null);
  const warmed = useRef(false);
  const { navigate } = useTransitionRouter();

  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(false);

  const hasHover = !useMediaQuery("(hover: none)");
  const calm = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Pieces that live on this site route through the curtain; anything hosted
  // elsewhere still opens in its own tab.
  const isInternal = item.url.startsWith("/");

  // Being on screen is enough to play. Anyone who asked for less motion has to
  // reach for it instead — no loop starts on its own.
  const playing = calm ? active : inView;

  // Nothing to hover with, so the copy rides the card into view instead.
  const revealed = active || (!hasHover && inView);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Buffer once the card is on screen rather than on hover. Fetching only at
  // hover puts the whole download between the pointer arriving and the first
  // frame; by the time anyone reaches this card, it's already ready.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView || warmed.current) return;

    warmed.current = true;
    video.preload = "auto";
    video.load();
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [playing]);

  return (
    <a
      ref={rootRef}
      href={item.url}
      {...(isInternal
        ? {
            onClick: (event: React.MouseEvent) => {
              event.preventDefault();
              navigate(item.url, item.title);
            },
          }
        : { target: "_blank", rel: "noopener noreferrer" })}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group relative block border border-border bg-card transition-colors hover:border-[#ab8bff] focus-visible:border-[#ab8bff]"
    >
      {/* Bare white behind a clip with no still of its own, so the frames it
          hasn't painted yet match the piece's own background. */}
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden ${
          item.poster ? "bg-background" : "bg-white"
        }`}
      >
        {item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.poster})` }}
          />
        )}

        <motion.span
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 h-8 border border-white/25 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.25em] pointer-events-none"
        >
          {isInternal ? "Open" : "Try it"} <ArrowUpRight size={12} />
        </motion.span>

        {/* Kept in the DOM at rest so assistive tech still reads it. */}
        <motion.div
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 bg-linear-to-t from-black/90 via-black/60 to-transparent p-5 pt-14 text-white pointer-events-none"
        >
          <p className="text-sm text-white/85 leading-relaxed">{item.blurb}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/25 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Numbered outside the image, so the grid stays readable without a
          pointer. The blurb is still the hover's job. */}
      <div className="flex items-baseline gap-4 border-t border-border px-5 py-4">
        <span className="text-[10px] tracking-[0.25em] text-text-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-base md:text-lg font-bold uppercase tracking-[-0.02em] group-hover:text-[#ab8bff] transition-colors duration-300">
          {item.title}
        </h3>
      </div>
    </a>
  );
}
