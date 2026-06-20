"use client";

import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import GlareHover from './GlareHover';

interface TiltButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  innerClassName?: string;
  glow?: boolean;
}

export default function TiltButton({ children, href, className = "", innerClassName = "", glow = false }: TiltButtonProps) {
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);
  
  const xSpring = useSpring(xPct, { stiffness: 400, damping: 30 });
  const ySpring = useSpring(yPct, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(ySpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [0, 1], ["-10deg", "10deg"]);
  
  const glareX = useTransform(xSpring, [0, 1], ["100%", "0%"]);
  const glareY = useTransform(ySpring, [0, 1], ["100%", "0%"]);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHoverable, setIsHoverable] = useState(true);

  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (!glow || !isHoverable) return;
    const updateMousePos = (e: globalThis.MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, [glow, isHoverable, mouseX, mouseY]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (!isHoverable) return;
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
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden flex items-center justify-center transition-all duration-200 active:scale-[0.98] ${glow ? 'p-[2px]' : ''} ${className}`}
      >
        {glow && (
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none rounded-inherit"
            style={{
              background: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, var(--apple-blue), transparent 100%)`,
            }}
          />
        )}
        <span className={`relative z-10 flex items-center gap-2 transition-colors duration-150 group-active:bg-apple-blue group-active:text-white ${glow ? 'w-full h-full bg-apple-bg rounded-[inherit] justify-center' : ''} ${innerClassName}`}>
          {children}
        </span>
        
        {/* Glare Layer (ReactBits) */}
        {isHoverable && <GlareHover className="absolute inset-0 z-20 mix-blend-overlay rounded-inherit" transitionDuration={400} glareOpacity={0.6} />}
      </motion.a>
    </div>
  );
}
