"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Experiment } from "../data/playground";

export function ExperimentCard({ item }: { item: Experiment }) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    void ref.current?.play().catch(() => {});
  };

  const stop = () => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group flex flex-col border border-border bg-card hover:border-[#ab8bff] transition-colors"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-background">
        {item.video ? (
          <video
            ref={ref}
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

        <span className="absolute top-3 right-3 flex items-center gap-2 px-3 h-8 border border-white/25 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.25em]">
          Try it <ArrowUpRight size={12} />
        </span>
      </div>

      <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
        <h3 className="text-lg font-bold uppercase tracking-[-0.02em] group-hover:text-[#ab8bff] transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {item.blurb}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-auto pt-2 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
