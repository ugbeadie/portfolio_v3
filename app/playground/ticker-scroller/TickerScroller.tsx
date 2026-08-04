"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  wrap,
  type MotionValue,
} from "motion/react";
import { PieceNav } from "../../components/ui/PieceNav";
import { useDimmedChrome } from "../../components/layout/useDimmedChrome";

const IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/playground/ticker/${String(i + 1).padStart(2, "0")}.jpg`,
);

// Three copies of the set, so wrapping never exposes an edge mid-column.
const SETS = 3;
const SCROLL_SPEED = 1.2;
// How hard the columns chase the wheel. Lower trails further behind it.
const LERP = 0.08;

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

function Column({
  y,
  innerRef,
  className = "",
}: {
  y: MotionValue<number>;
  innerRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <motion.div
      ref={innerRef}
      style={{ y }}
      className={`flex w-[38vw] max-w-[240px] shrink-0 flex-col gap-10 will-change-transform md:gap-16 ${className}`}
    >
      {Array.from({ length: SETS }).flatMap((_, set) =>
        IMAGES.map((src, i) => (
          <div
            key={`${set}-${i}`}
            className="relative h-[42vh] w-full shrink-0 overflow-hidden bg-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        )),
      )}
    </motion.div>
  );
}

export function TickerScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const calm = useMediaQuery("(prefers-reduced-motion: reduce)");

  const target = useRef(0);
  const current = useRef(0);
  const setHeight = useRef(0);

  const y1 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const y3 = useMotionValue(0);
  const y4 = useMotionValue(0);

  useDimmedChrome();

  // One set's height is the wrap distance, and cards are sized in vh.
  useEffect(() => {
    const column = measureRef.current;
    if (!column) return;

    const measure = () => {
      const cards = column.children;
      if (cards.length <= IMAGES.length) return;

      const first = cards[0] as HTMLElement;
      const nextSet = cards[IMAGES.length] as HTMLElement;
      setHeight.current = nextSet.offsetTop - first.offsetTop;
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(column);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastTouchY = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      target.current -= event.deltaY * SCROLL_SPEED;
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touchY = event.touches[0].clientY;
      target.current -= (lastTouchY - touchY) * SCROLL_SPEED;
      lastTouchY = touchY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useAnimationFrame(() => {
    const height = setHeight.current;
    if (!height) return;

    // Reduced motion snaps to position instead of easing.
    current.current += (target.current - current.current) * (calm ? 1 : LERP);

    const forward = wrap(-height, 0, current.current - height);
    const backward = wrap(-height, 0, -current.current - height);

    y1.set(forward);
    y3.set(forward);
    y2.set(backward);
    y4.set(backward);
  });

  return (
    <main
      ref={containerRef}
      className="relative isolate flex h-svh w-full touch-none justify-center overflow-hidden bg-background p-4 text-text transition-colors duration-300 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center">
        <h1 className="whitespace-nowrap text-[14vw] font-bold uppercase leading-none tracking-[-0.05em] text-text/80">
          Ticker Scroller
        </h1>
      </div>

      <div className="z-10 flex min-h-[300vh] w-full max-w-[1400px] justify-center gap-6 md:gap-12">
        <Column innerRef={measureRef} y={y1} />
        <Column y={y2} />
        <Column y={y3} className="hidden md:flex" />
        <Column y={y4} className="hidden lg:flex" />
      </div>

      <PieceNav slug="ticker-scroller" />
    </main>
  );
}
