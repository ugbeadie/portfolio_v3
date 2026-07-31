"use client";

import { useEffect } from "react";

/**
 * Full-screen playground pieces own the whole viewport, and the social rail
 * sits mid-right straight through it. Dimming it from the root for the life of
 * the route keeps layout.tsx free of per-route conditionals — the rail reads
 * these vars itself and fades back when the piece unmounts.
 */
export function useDimmedChrome() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--chrome-dim", "0.12");
    root.style.setProperty("--chrome-events", "none");

    return () => {
      root.style.removeProperty("--chrome-dim");
      root.style.removeProperty("--chrome-events");
    };
  }, []);
}
