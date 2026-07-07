"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { MouseEvent, useRef } from "react";

interface SpotlightButtonProps {
  href?: string;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function SpotlightButton({ href, text, className = "", type = "button", onClick, disabled = false }: SpotlightButtonProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const innerContent = (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.15em] text-xs font-bold text-white/90 group-hover:text-white transition-colors">
        {text}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </>
  );

  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-white/10 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:border-white/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${className}`;

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <motion.a
          ref={buttonRef as any}
          onMouseMove={handleMouseMove}
          className={baseClasses}
        >
          {innerContent}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      ref={buttonRef as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      className={baseClasses}
    >
      {innerContent}
    </motion.button>
  );
}
