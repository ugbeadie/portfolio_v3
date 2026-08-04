"use client";

import { useMemo, useRef } from "react";
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PieceNav } from "../../components/ui/PieceNav";
import { useDimmedChrome } from "../../components/layout/useDimmedChrome";

// A tall track with a sticky stage. Everything is bound to scrollYProgress, so
// scrolling up reverses the sequence exactly — there is no collapse phase.
//   0.00 -> 0.20  hero rises from below the fold to centre
//   0.20 -> 1.00  centre shrinks to 1x while the satellites bloom outward

const COLS = 5;
const ROWS = 3;
const TILE_W = 134;
const TILE_H = 180;
const GAP_X = 72;
const GAP_Y = 75;

const HERO_SCALE = 1.95;

// Start positions, measured off the recording rather than derived.
const START_X_MID = [-268, -160, 0, 160, 268];
const START_X_OUTER = [-252, -150, 0, 150, 252];
const START_FRAC_Y = 0.96;
const ROW_ARC = 88;
const COL_SCALE = [0.84, 0.93, 1, 0.93, 0.84];

const FADE_MIN = 0.3;
const DIM_LEVEL = 0.3;

const STAGE_W = COLS * TILE_W + (COLS - 1) * GAP_X;
const STAGE_H = ROWS * TILE_H + (ROWS - 1) * GAP_Y;
const CENTER_INDEX = Math.floor((ROWS * COLS) / 2);

const RISE_FROM = 0.5;
const RISE_END = 0.2;
// Butted against the rise and running to the very end of the track: any gap
// on either side is scroll that moves nothing.
const BLOOM_START = RISE_END;
const BLOOM_END = 1;

const landEase = cubicBezier(0.33, 1, 0.68, 1);
const bloomEase = cubicBezier(0.45, 0, 0.2, 1);
const shrinkEase = cubicBezier(0.3, 0.15, 0.25, 1);

// Two sizes: the hero displays at 261x351, a satellite never exceeds 134x180.
const heroSrc = (i: number) =>
  `/playground/grid/${String(i + 1).padStart(2, "0")}.jpg`;
const tileSrc = (i: number) =>
  `/playground/grid/sm/${String(i + 1).padStart(2, "0")}.jpg`;

const tileClass =
  "absolute overflow-hidden rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.9)]";
const TILE_BG = "#17181b";

type Tile = {
  i: number;
  left: number;
  top: number;
  inX: number;
  inY: number;
  finalR: number;
  src: string;
  fade1: number;
  scale0: number;
  z: number;
};

function TileFace({ src }: { src: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
    </>
  );
}

// Each tile owns its transforms because hooks can't run in a loop in the parent.
function Satellite({
  tile,
  bloom,
  bloomRaw,
}: {
  tile: Tile;
  bloom: MotionValue<number>;
  bloomRaw: MotionValue<number>;
}) {
  const range = [0, 1];

  const x = useTransform(bloom, range, [tile.inX, 0]);
  const y = useTransform(bloom, range, [tile.inY, 0]);
  const scale = useTransform(bloom, range, [tile.scale0, 1]);

  // Opacity tracks RAW progress, not the eased clock — the eased curve's
  // zero-slope start would delay the fade past the first pixels of scroll.
  const opacity = useTransform(
    bloomRaw,
    [0, 0.1, tile.fade1 * 0.72, tile.fade1],
    [0, DIM_LEVEL, DIM_LEVEL + 0.15, 1],
  );

  return (
    <motion.div
      className={tileClass}
      style={{
        left: tile.left,
        top: tile.top,
        width: TILE_W,
        height: TILE_H,
        backgroundColor: TILE_BG,
        x,
        y,
        scale,
        opacity,
        zIndex: tile.z,
        willChange: "transform, opacity",
      }}
    >
      <TileFace src={tile.src} />
    </motion.div>
  );
}

function Hero({
  tile,
  progress,
}: {
  tile: Tile;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, RISE_END], [STAGE_H * RISE_FROM, 0], {
    ease: landEase,
  });
  // Laid out at full hero size and scaled DOWN, never up: browsers rasterize
  // at layout size, so an upscaled element re-rasterizes mid-animation.
  const scale = useTransform(
    progress,
    [BLOOM_START, BLOOM_END],
    [1, 1 / HERO_SCALE],
    { ease: shrinkEase },
  );

  const heroW = TILE_W * HERO_SCALE;
  const heroH = TILE_H * HERO_SCALE;

  return (
    <motion.div
      className={tileClass}
      style={{
        // Centred on the tile's slot so the downscale lands exactly on it.
        left: tile.left - (heroW - TILE_W) / 2,
        top: tile.top - (heroH - TILE_H) / 2,
        width: heroW,
        height: heroH,
        backgroundColor: TILE_BG,
        y,
        scale,
        zIndex: 20,
        willChange: "transform",
      }}
    >
      <TileFace src={heroSrc(tile.i)} />
    </motion.div>
  );
}

export function GridScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useDimmedChrome();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Stiff on purpose: softer settings let the cards drift on after the wheel
  // stops, and that detachment is what reads as unsmooth.
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 36,
    restDelta: 0.0005,
  });

  const bloom = useTransform(progress, [BLOOM_START, BLOOM_END], [0, 1], {
    ease: bloomEase,
  });
  const bloomRaw = useTransform(progress, [BLOOM_START, BLOOM_END], [0, 1]);

  const tiles = useMemo(() => {
    const cCol = (COLS - 1) / 2;
    const cRow = (ROWS - 1) / 2;

    const list = Array.from({ length: ROWS * COLS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const dx = (col - cCol) * (TILE_W + GAP_X);
      const dy = (row - cRow) * (TILE_H + GAP_Y);
      const cn = (col - cCol) / cCol; // -1 .. 1 across the row
      const startX = (row === cRow ? START_X_MID : START_X_OUTER)[col];

      return {
        i,
        left: col * (TILE_W + GAP_X),
        top: row * (TILE_H + GAP_Y),
        inX: startX - dx,
        inY: dy * (START_FRAC_Y - 1) - Math.sign(dy) * ROW_ARC * cn * cn,
        finalR: Math.hypot(dx, dy) || 1,
        src: tileSrc(i),
      };
    });

    const maxR = Math.max(...list.map((t) => t.finalR));

    return list.map((t): Tile => {
      const norm = t.finalR / maxR; // 0 at the centre, 1 at the corners
      const col = t.i % COLS;

      return {
        ...t,
        // Radius-ordered surge to full brightness — this is the circular reveal.
        fade1: FADE_MIN + norm * (1 - FADE_MIN),
        scale0: COL_SCALE[col],
        z: Math.round(COL_SCALE[col] * 10),
      };
    });
  }, []);

  if (reduced) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-black p-8">
        <div
          className="relative shrink-0 origin-center scale-[0.34] sm:scale-[0.5] lg:scale-[0.75] xl:scale-100"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {tiles.map((t) => (
            <div
              key={t.i}
              className={tileClass}
              style={{
                left: t.left,
                top: t.top,
                width: TILE_W,
                height: TILE_H,
                backgroundColor: TILE_BG,
              }}
            >
              <TileFace src={t.src} />
            </div>
          ))}
        </div>
        <PieceNav slug="grid-scroll" tone="dark" />
      </main>
    );
  }

  return (
    <div className="bg-black">
      {/* Track height sets how much scrolling the sequence takes. svh to match
          the sticky stage — mixing units desyncs them on mobile. */}
      <section ref={trackRef} className="relative h-[400svh]">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <div
            className="relative shrink-0 origin-center scale-[0.34] sm:scale-[0.5] lg:scale-[0.75] xl:scale-100"
            style={{ width: STAGE_W, height: STAGE_H }}
          >
            {tiles.map((t) =>
              t.i === CENTER_INDEX ? (
                <Hero key={t.i} tile={t} progress={progress} />
              ) : (
                <Satellite
                  key={t.i}
                  tile={t}
                  bloom={bloom}
                  bloomRaw={bloomRaw}
                />
              ),
            )}
          </div>
        </div>
      </section>

      <PieceNav slug="grid-scroll" tone="dark" />
    </div>
  );
}
