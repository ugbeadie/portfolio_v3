"use client";

import { motion } from "motion/react";

export function FoldingImage({
  src,
  slices = 6,
  delay = 0,
}: {
  src: string;
  slices?: number;
  delay?: number;
}) {
  return (
    <div
      className="w-full h-full flex overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {Array.from({ length: slices }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ rotateY: 90, opacity: 0, z: -300 }}
          animate={{ rotateY: 0, opacity: 1, z: 0 }}
          exit={{ rotateY: -90, opacity: 0, z: -300 }}
          transition={{
            duration: 0.85,
            delay: delay + i * 0.07,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            flex: 1,
            height: "100%",
            backgroundImage: `url(${src})`,
            backgroundSize: `${slices * 100}% 100%`,
            backgroundPosition: `${(i / (slices - 1)) * 100}% center`,
            backgroundRepeat: "no-repeat",
            transformOrigin: i % 2 === 0 ? "left" : "right",
          }}
        />
      ))}
    </div>
  );
}
