"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Use springs for ultra-smooth follow
  const springConfigDot = { damping: 25, stiffness: 700, mass: 0.5 };
  const springConfigCircle = { damping: 30, stiffness: 300, mass: 0.8 };

  const dotX = useSpring(0, springConfigDot);
  const dotY = useSpring(0, springConfigDot);
  const circleX = useSpring(0, springConfigCircle);
  const circleY = useSpring(0, springConfigCircle);

  useEffect(() => {
    dotX.set(mousePosition.x - 4);
    dotY.set(mousePosition.y - 4);
    circleX.set(mousePosition.x - 16);
    circleY.set(mousePosition.y - 16);
  }, [mousePosition, dotX, dotY, circleX, circleY]);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#20c997] rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#20c997] rounded-full pointer-events-none z-[9998]"
        style={{
          x: circleX,
          y: circleY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? "rgba(32, 201, 151, 0.1)"
            : "rgba(32, 201, 151, 0)",
          borderColor: isHovering
            ? "rgba(32, 201, 151, 0.5)"
            : "rgba(32, 201, 151, 1)",
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      />
    </div>
  );
}
