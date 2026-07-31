"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Magnetic } from "../../components/ui/Magnetic";
import { useTransitionRouter } from "../../components/layout/PageTransition";

const IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/playground/trail/${String(i + 1).padStart(2, "0")}.jpg`,
);

const THRESHOLD = 58;
const MAX_TRAIL = 12;
const DURATION = 0.9;
const TILTS = [-7, 4, -3, 8, -5, 6, -8, 3];

type Drop = {
  id: number;
  x: number;
  y: number;
  src: string;
  tilt: number;
};
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

export function ImageTrail() {
  const { navigate } = useTransitionRouter();
  const stageRef = useRef<HTMLDivElement>(null);

  const [drops, setDrops] = useState<Drop[]>([]);
  const isTouch = useMediaQuery("(hover: none)");
  const calm = useMediaQuery("(prefers-reduced-motion: reduce)");

  const lastDrop = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const idCounter = useRef(0);

  // Warm the cache so the first pass doesn't drop empty frames.
  useEffect(() => {
    IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // The social rail sits mid-right, straight through the canvas. Dim it for the
  // life of this route instead of unmounting it, so layout.tsx stays untouched.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--chrome-dim", "0.12");
    root.style.setProperty("--chrome-events", "none");

    return () => {
      root.style.removeProperty("--chrome-dim");
      root.style.removeProperty("--chrome-events");
    };
  }, []);

  const push = useCallback((x: number, y: number) => {
    const i = imageIndex.current++;

    setDrops((prev) =>
      [
        ...prev,
        {
          id: idCounter.current++,
          x,
          y,
          src: IMAGES[i % IMAGES.length],
          tilt: TILTS[i % TILTS.length],
        },
      ].slice(-MAX_TRAIL),
    );
  }, []);

  const toStage = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = toStage(event.clientX, event.clientY);
    if (!point) return;

    // The first sample only calibrates — otherwise entering the stage anywhere
    // far from the origin would drop an image the pointer never travelled for.
    if (!lastDrop.current) {
      lastDrop.current = point;
      return;
    }

    const dx = point.x - lastDrop.current.x;
    const dy = point.y - lastDrop.current.y;
    if (Math.hypot(dx, dy) < THRESHOLD) return;

    lastDrop.current = point;
    push(point.x, point.y);
  };

  // Touch only reports movement mid-drag, so a plain tap gets its own drop.
  const handleDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = toStage(event.clientX, event.clientY);
    if (!point) return;
    lastDrop.current = point;
    push(point.x, point.y);
  };

  return (
    <main
      ref={stageRef}
      onPointerMove={handleMove}
      onPointerDown={handleDown}
      onPointerLeave={() => {
        lastDrop.current = null;
      }}
      className="relative isolate h-svh w-full overflow-hidden bg-background text-text transition-colors duration-300 touch-none"
    >
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-6 px-6 text-center pointer-events-none select-none">
        <span className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">
          Experiment
        </span>
        <h1 className="text-[15vw] md:text-[11vw] font-bold uppercase leading-[0.85] tracking-[-0.05em]">
          Image Trail
        </h1>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-text-secondary">
          {isTouch ? "Drag across the screen" : "Move your cursor"}
        </p>
      </div>

      <AnimatePresence>
        {drops.map((drop) => (
          <motion.img
            key={drop.id}
            src={drop.src}
            alt=""
            aria-hidden
            draggable={false}
            initial={calm ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={
              calm
                ? { opacity: [0, 1, 1, 0] }
                : { opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.86] }
            }
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{
              duration: DURATION,
              times: [0, 0.25, 0.5, 1],
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setDrops((prev) => prev.filter((item) => item.id !== drop.id));
            }}
            className="absolute z-10 w-[24vw] max-w-[160px] aspect-[4/5] object-cover pointer-events-none shadow-shot"
            style={{
              left: drop.x,
              top: drop.y,
              x: "-50%",
              y: "-50%",
              rotate: calm ? 0 : drop.tilt,
            }}
          />
        ))}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-20 flex">
        <Magnetic>
          <button
            onClick={() => navigate("/playground", "Playground")}
            className="group flex h-12 cursor-pointer items-center gap-3 border border-border bg-background/70 px-5 backdrop-blur-md transition-colors hover:border-[#ab8bff] hover:bg-[#ab8bff] hover:text-white"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="text-xs uppercase tracking-widest">
              Playground
            </span>
          </button>
        </Magnetic>
      </div>
    </main>
  );
}
