"use client";

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';
import GlareHover from './GlareHover';

interface TiltButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function TiltButton({ children, href, className = "" }: TiltButtonProps) {
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);
  
  const xSpring = useSpring(xPct, { stiffness: 400, damping: 30 });
  const ySpring = useSpring(yPct, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(ySpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [0, 1], ["-10deg", "10deg"]);
  
  const glareX = useTransform(xSpring, [0, 1], ["100%", "0%"]);
  const glareY = useTransform(ySpring, [0, 1], ["100%", "0%"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    xPct.set((clientX - left) / width);
    yPct.set((clientY - top) / height);
  }

  function handleMouseLeave() {
    xPct.set(0.5);
    yPct.set(0.5);
  }

  return (
    <div className="relative [perspective:1000px] w-full sm:w-auto group">
      <motion.a
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden flex items-center justify-center transition-all duration-200 active:scale-[0.98] ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Glare Layer (ReactBits) */}
        <GlareHover className="absolute inset-0 z-20 mix-blend-overlay rounded-inherit" transitionDuration={400} glareOpacity={0.6} />
      </motion.a>
    </div>
  );
}
