"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Check, Copy, GripHorizontal } from "lucide-react";
import { Magnetic } from "./Magnetic";

const ACCENT = "#ab8bff";
const SPRING = { type: "spring" as const, stiffness: 400, damping: 26 };

function Tile({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border border-border bg-card p-6 flex flex-col gap-6"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary">
        {label}
      </span>
      <div className="flex-1 min-h-[120px] flex items-center justify-center">
        {children}
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{note}</p>
    </motion.div>
  );
}

function MagneticDemo() {
  return (
    <Magnetic>
      <button className="px-8 h-14 border border-border uppercase text-xs tracking-widest font-bold hover:bg-[#ab8bff] hover:border-[#ab8bff] hover:text-white transition-colors cursor-pointer">
        Pull me
      </button>
    </Magnetic>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%$&@";

function ScrambleDemo() {
  const word = "RESOLVE";
  const [display, setDisplay] = useState(word);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };

  const run = () => {
    stop();
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 3);
      if (settled >= word.length) {
        stop();
        setDisplay(word);
        return;
      }
      setDisplay(
        word
          .split("")
          .map((char, i) =>
            i < settled
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
    }, 45);
  };

  useEffect(() => stop, []);

  return (
    <button
      onMouseEnter={run}
      onFocus={run}
      onClick={run}
      className="font-mono text-2xl md:text-3xl tracking-[0.15em] cursor-pointer hover:text-[#ab8bff] transition-colors"
    >
      {display}
    </button>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn((value) => !value)}
      aria-pressed={on}
      aria-label="Toggle"
      className={`w-24 h-12 p-1 flex cursor-pointer border transition-colors duration-300 ${
        on ? "justify-end border-[#ab8bff]" : "justify-start border-border"
      }`}
      style={{ backgroundColor: on ? `${ACCENT}22` : "transparent" }}
    >
      <motion.span
        layout
        transition={SPRING}
        className="block h-full aspect-square"
        style={{ backgroundColor: on ? ACCENT : "var(--foreground)" }}
      />
    </button>
  );
}

function TiltDemo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), SPRING);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), SPRING);

  return (
    <div
      style={{ perspective: 700 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="p-6"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-44 h-24 border border-border bg-background flex items-center justify-center"
      >
        <span
          style={{ transform: "translateZ(35px)" }}
          className="text-[10px] uppercase tracking-[0.3em] text-text-secondary"
        >
          Tilt
        </span>
      </motion.div>
    </div>
  );
}

function CopyDemo() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("ugbeadie.com");
        } catch {}
        setCopied(true);
      }}
      className="relative w-48 h-12 border border-border overflow-hidden cursor-pointer hover:border-[#ab8bff] transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em]"
          style={{ color: copied ? ACCENT : undefined }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function DragDemo() {
  return (
    <div className="w-full max-w-[220px] h-24 border border-dashed border-border flex items-center justify-center">
      <motion.div
        drag
        dragConstraints={{ left: -70, right: 70, top: -24, bottom: 24 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 22 }}
        whileDrag={{ scale: 1.1 }}
        className="h-12 w-12 bg-foreground text-background flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <GripHorizontal size={16} />
      </motion.div>
    </div>
  );
}

function StaggerDemo() {
  const [run, setRun] = useState(0);
  const word = "REPLAY";

  return (
    <button
      onClick={() => setRun((value) => value + 1)}
      className="flex gap-1 overflow-hidden py-1 cursor-pointer"
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={`${run}-${i}`}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING, delay: i * 0.06 }}
          className="text-2xl md:text-3xl font-bold tracking-[-0.03em]"
        >
          {char}
        </motion.span>
      ))}
    </button>
  );
}

export function PlaygroundDemos({ limit }: { limit?: number }) {
  const demos = [
    {
      label: "Magnetic pull",
      note: "Cursor proximity moves the button.",
      node: <MagneticDemo />,
    },
    {
      label: "Text resolve",
      note: "Characters settle left to right.",
      node: <ScrambleDemo />,
    },
    {
      label: "Spring toggle",
      note: "Layout animation, no keyframes.",
      node: <ToggleDemo />,
    },
    {
      label: "Pointer tilt",
      note: "Rotation tracks the pointer in 3D.",
      node: <TiltDemo />,
    },
    {
      label: "State morph",
      note: "One slot, two states, no layout shift.",
      node: <CopyDemo />,
    },
    {
      label: "Elastic drag",
      note: "Constrained, with an overshoot back.",
      node: <DragDemo />,
    },
    {
      label: "Staggered entrance",
      note: "Click to replay the choreography.",
      node: <StaggerDemo />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(limit ? demos.slice(0, limit) : demos).map((demo) => (
        <Tile key={demo.label} label={demo.label} note={demo.note}>
          {demo.node}
        </Tile>
      ))}
    </div>
  );
}
