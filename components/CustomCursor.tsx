"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Offset from the true cursor tip → places the dot near the arrow tail
const TAIL_OFFSET_X = 12;
const TAIL_OFFSET_Y = 18;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverNavbar, setIsOverNavbar] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Lagging spring so the dot trails the actual pointer with ease
  const springConfig = { damping: 26, stiffness: 160, mass: 0.6 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // Apply tail offset so dot sits near the bottom of the arrow shaft
      cursorX.set(e.clientX + TAIL_OFFSET_X);
      cursorY.set(e.clientY + TAIL_OFFSET_Y);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-hide-cursor]")) {
        setIsOverNavbar(true);
      } else {
        setIsOverNavbar(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible || isOverNavbar) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Single solid dot at cursor tail — no ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-black dark:bg-white"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}
