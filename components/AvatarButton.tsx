"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AvatarButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function AvatarButton({ 
  text = "Start your project", 
  onClick, 
  className = "" 
}: AvatarButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-apple-blue text-white font-bold text-sm sm:text-base shadow-[0_8px_25px_-5px_rgba(0,122,255,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(0,122,255,0.7)] transition-all duration-300 border border-white/20 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Subtle glossy sheen sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Button Label Text */}
      <span className="tracking-tight text-white font-bold drop-shadow-sm">
        {text}
      </span>

      {/* Arrow Icon Indicator */}
      <svg 
        className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </motion.button>
  );
}
