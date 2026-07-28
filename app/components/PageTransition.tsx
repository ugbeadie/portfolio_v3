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

const COVER_DURATION = 0.65;

type TransitionContextValue = {
  /** Wipes a curtain across the screen, then routes to `href`. */
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export const useTransitionRouter = () => useContext(TransitionContext);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [covered, setCovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Once the new route is rendered, pull the curtain back off the screen.
  useEffect(() => {
    setCovered(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const [target] = href.split("#");
      // Same route (or a plain hash on the current route): just let the browser
      // handle it, no curtain needed.
      if (target === pathname || target === "") {
        router.push(href);
        return;
      }

      if (timer.current) clearTimeout(timer.current);
      setCovered(true);
      timer.current = setTimeout(() => {
        router.push(href);
      }, COVER_DURATION * 1000);
    },
    [pathname, router],
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning: covered }}>
      {children}

      <AnimatePresence>
        {covered && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[200] bg-[#ab8bff] flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: COVER_DURATION, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="text-white text-xs uppercase tracking-[0.4em]"
            >
              Loading
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
