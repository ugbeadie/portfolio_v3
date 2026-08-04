"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { useTransitionRouter } from "../layout/PageTransition";
import { experiments } from "../../data/playground";

export function PieceNav({
  slug,
  tone = "theme",
}: {
  slug: string;
  /** Pieces on a fixed black stage can't use the border token — it vanishes. */
  tone?: "theme" | "dark";
}) {
  const { navigate } = useTransitionRouter();

  const index = experiments.findIndex((item) => item.slug === slug);
  const next =
    index === -1 ? undefined : experiments[(index + 1) % experiments.length];

  const skin =
    tone === "dark"
      ? "border-white/20 bg-white/5 text-white hover:border-[#ab8bff] hover:bg-[#ab8bff]"
      : "border-border bg-background/70 hover:border-[#ab8bff] hover:bg-[#ab8bff] hover:text-white";

  const button = `group flex h-12 cursor-pointer items-center gap-3 border px-5 backdrop-blur-md transition-colors ${skin}`;

  return (
    // Right padding clears the theme toggle parked in that corner.
    <div className="fixed inset-x-0 bottom-6 z-30 flex items-end justify-between gap-4 px-6 pr-20 md:bottom-10 md:px-12 md:pr-28">
      <Magnetic>
        <button
          onClick={() => navigate("/playground", "Playground")}
          className={button}
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="text-xs uppercase tracking-widest">Playground</span>
        </button>
      </Magnetic>

      {next && next.slug !== slug && (
        <Magnetic>
          <button onClick={() => navigate(next.url, next.title)} className={button}>
            <span className="text-xs uppercase tracking-widest">
              {next.title}
            </span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Magnetic>
      )}
    </div>
  );
}
