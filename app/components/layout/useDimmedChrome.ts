"use client";

import { useEffect } from "react";

// Fades the social rail off a full-screen piece for the life of the route.
// Loading a piece with ?record instead strips every overlay — navbar, rail,
// cursor, theme toggle, piece nav — so a preview clip can be captured clean.
export function useDimmedChrome({ record = false } = {}) {
  useEffect(() => {
    const root = document.documentElement;
    const recording =
      record || new URLSearchParams(window.location.search).has("record");

    if (recording) {
      root.classList.add("recording");
    } else {
      root.style.setProperty("--chrome-dim", "0.12");
      root.style.setProperty("--chrome-events", "none");
    }

    return () => {
      root.classList.remove("recording");
      root.style.removeProperty("--chrome-dim");
      root.style.removeProperty("--chrome-events");
    };
  }, [record]);
}
