"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingContactWidget() {
  const [hovered, setHovered] = useState(false);

  const handleOpenModal = () => {
    window.location.hash = '#inquiry';
  };

  return (
    <>
      {/* Smooth Feathered Bottom Blur Overlay */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 z-40 h-[100px] sm:h-[130px] bg-gradient-to-t from-apple-bg via-apple-bg/75 to-transparent backdrop-blur-md"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Outer Floating Wrapper — Captures hover over the entire liquid glass area */}
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleOpenModal}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto cursor-pointer select-none"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26, delay: 0.5 }}
          className="relative rounded-full overflow-hidden border border-white/80 dark:border-white/15 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-xl p-1"
          style={{ width: '210px' }}
        >
          {/* Specular Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 rounded-t-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/10 to-transparent z-0" />

          {/* Inner layout: text label absolutely positioned, black button width transitions */}
          <div className="relative flex items-center h-[38px]">

            {/* Left Text Label — fades in/out with CSS, no AnimatePresence jank */}
            <div 
              className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-3.5 pr-2 z-10 pointer-events-none"
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered ? 'translateX(-12px)' : 'translateX(0)',
                transition: 'opacity 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <span className="text-[13px] font-extrabold text-black dark:text-white tracking-tight leading-tight whitespace-nowrap">
                Get in touch
              </span>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-tight whitespace-nowrap">
                Email or book a call
              </span>
            </div>

            {/* Black Contact Button — morphs from right-aligned compact to full-width */}
            <div 
              className="absolute right-0 top-0 bottom-0 flex items-center justify-center gap-2 rounded-full z-20 overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950 text-white shadow-md border border-white/10"
              style={{
                width: hovered ? '100%' : 'auto',
                left: hovered ? '0' : 'auto',
                transition: 'width 0.32s cubic-bezier(0.16,1,0.3,1), left 0.32s cubic-bezier(0.16,1,0.3,1)',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
              
              {/* Envelope Icon */}
              <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>

              {/* "Contact" Text */}
              <span className="whitespace-nowrap font-extrabold text-xs text-white tracking-tight relative z-10">
                Contact
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
