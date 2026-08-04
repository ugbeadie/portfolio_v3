"use client";

import { useEffect } from "react";

// Fades the social rail off a full-screen piece for the life of the route.
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
