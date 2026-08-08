"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContactWidget() {
  const [isWidgetHovered, setIsWidgetHovered] = useState(false);

  const openContactModal = () => {
    window.location.hash = '#contact';
  };

  const openApplyModal = () => {
    window.location.hash = '#inquiry';
  };

  return (
    <>
      {/* Feathered Progressive Bottom Blur Overlay */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 h-16 z-40"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          backdropFilter: 'blur(4px)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Floating Bottom Widget */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.5 }}
          onMouseEnter={() => setIsWidgetHovered(true)}
          onMouseLeave={() => setIsWidgetHovered(false)}
          className="relative flex items-center bg-white/50 dark:bg-zinc-950/50 backdrop-blur-3xl border border-white/70 dark:border-white/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-white/40 dark:ring-white/10 overflow-hidden cursor-pointer"
        >
          {/* Top gloss highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/60 to-transparent dark:from-white/15 dark:to-transparent rounded-t-full z-0" />

          {/* Inner content row — slides right-to-left on hover */}
          <div className="relative z-10 flex items-center">

            {/* "Get in touch" label — hides on hover, slides left out */}
            <AnimatePresence initial={false}>
              {!isWidgetHovered && (
                <motion.div
                  key="label"
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col pl-5 pr-3 overflow-hidden shrink-0"
                >
                  <span className="text-[13px] font-extrabold text-black dark:text-white tracking-tight leading-tight whitespace-nowrap">
                    Get in touch
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-tight whitespace-nowrap">
                    Email or book a call
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons row — always present, slides left on hover to reveal labels */}
            <div className="flex items-center gap-2 p-2">

              {/* Black Contact button */}
              <motion.button
                onClick={openContactModal}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                layout
                className="relative flex items-center gap-2 rounded-full bg-gradient-to-b from-zinc-800 to-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden"
                style={{ padding: isWidgetHovered ? '8px 16px' : '8px' }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
                <svg className="w-4 h-4 shrink-0 fill-current relative z-10" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <AnimatePresence initial={false}>
                  {isWidgetHovered && (
                    <motion.span
                      key="contact-label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.22 }}
                      className="whitespace-nowrap font-extrabold text-xs tracking-tight relative z-10 overflow-hidden"
                    >
                      Contact
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* White Book a Call button — only shown on hover */}
              <AnimatePresence initial={false}>
                {isWidgetHovered && (
                  <motion.button
                    key="book-btn"
                    initial={{ opacity: 0, x: 20, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: 20, width: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    onClick={openApplyModal}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-white via-zinc-50 to-zinc-100 text-black shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/15 overflow-hidden whitespace-nowrap"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/80 to-transparent rounded-t-full" />
                    <svg className="w-4 h-4 shrink-0 fill-current relative z-10" viewBox="0 0 24 24">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                    </svg>
                    <span className="font-extrabold text-xs tracking-tight relative z-10">
                      Book a Call
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
