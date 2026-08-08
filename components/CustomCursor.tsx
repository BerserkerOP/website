"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverNavbar, setIsOverNavbar] = useState(false);

  // Raw mouse position (true cursor tip)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Lagging outer ring — slow ease, follows the mouse tail
  const outerSpringConfig = { damping: 28, stiffness: 120, mass: 0.8 };
  const springX = useSpring(cursorX, outerSpringConfig);
  const springY = useSpring(cursorY, outerSpringConfig);

  // Slightly less laggy inner dot — still has ease but snappier
  const innerSpringConfig = { damping: 22, stiffness: 220, mass: 0.5 };
  const dotX = useSpring(cursorX, innerSpringConfig);
  const dotY = useSpring(cursorY, innerSpringConfig);

  useEffect(() => {
    // Only run on desktop / pointer fine devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Hide cursor when over navbar
      if (target.closest('[data-hide-cursor]')) {
        setIsOverNavbar(true);
        setIsHovered(false);
        return;
      }
      setIsOverNavbar(false);

      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive-hover")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
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
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Outer fluid follower ring — lags behind at mouse tail with ease */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[1px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 52 : 30,
          height: isHovered ? 52 : 30,
          backgroundColor: isHovered ? "rgba(0, 122, 255, 0.15)" : "rgba(0, 122, 255, 0.05)",
          borderColor: isHovered ? "rgba(0, 122, 255, 0.8)" : "rgba(0, 122, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />

      {/* Inner dot — also eased, slightly faster than ring */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-apple-blue shadow-[0_0_10px_#007AFF]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
