"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const COLUMNS = 5;
const COLUMN_DURATION = 0.6;
const COLUMN_STAGGER = 0.07;
/** When the last column has finished covering the screen. */
const COVER_MS = (COLUMN_DURATION + COLUMN_STAGGER * (COLUMNS - 1)) * 1000;
/** If a route never arrives (failed RSC fetch, dead network), don't sit on a
 *  covered screen forever — drop the curtain and let the page show through. */
const FAILSAFE_MS = 6000;

type TransitionContextValue = {
  /** Wipes a curtain across the screen, then routes to `href`. */
  navigate: (href: string, label?: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export const useTransitionRouter = () => useContext(TransitionContext);

function CurtainLabel({ label }: { label: string }) {
  const letters = Array.from(label);

  return (
    // The whole group fades on exit — anything static left behind here would
    // hang over the new page while the columns finish wiping away.
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
      className="relative flex flex-col items-center gap-8 px-6"
    >
      <h2 className="flex overflow-hidden text-white text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[-0.04em] text-center">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block whitespace-pre"
          >
            {letter}
          </motion.span>
        ))}
      </h2>

      {/* Indeterminate progress line — keeps moving if the route is slow. */}
      <div className="relative h-0.5 w-40 sm:w-56 overflow-hidden bg-white/25">
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 1,
            delay: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [curtain, setCurtain] = useState<{ label: string } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Once the new route is rendered, pull the curtain back off the screen.
  useEffect(() => {
    clearTimers();
    setCurtain(null);
  }, [pathname, clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const navigate = useCallback(
    (href: string, label?: string) => {
      const [target] = href.split("#");
      // Same route (or a bare hash on the current route): let the browser
      // handle it, no curtain needed.
      if (target === pathname || target === "") {
        router.push(href);
        return;
      }

      clearTimers();
      setCurtain({ label: label ?? "Loading" });
      timers.current.push(
        setTimeout(() => router.push(href), COVER_MS),
        setTimeout(() => setCurtain(null), COVER_MS + FAILSAFE_MS),
      );
    },
    [pathname, router, clearTimers],
  );

  return (
    <TransitionContext.Provider
      value={{ navigate, isTransitioning: curtain !== null }}
    >
      {children}

      <AnimatePresence>
        {curtain && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-200 pointer-events-auto"
            aria-hidden
          >
            {/* Sliced wipe — columns rise to cover, then keep going to reveal. */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: COLUMNS }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-full bg-[#ab8bff]"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{
                    duration: COLUMN_DURATION,
                    delay: i * COLUMN_STAGGER,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <CurtainLabel label={curtain.label} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
