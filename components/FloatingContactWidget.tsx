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
      {/* Feathered Bottom Blur */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 h-20 z-40"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
        }}
      />

      {/* Floating Widget */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.5 }}
          onMouseEnter={() => setIsWidgetHovered(true)}
          onMouseLeave={() => setIsWidgetHovered(false)}
          /* Container morphs between light (default) and dark frosted glass (hovered) */
          className="relative flex items-center rounded-full overflow-hidden transition-all duration-400"
          style={{
            padding: '5px 5px',
            gap: '6px',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            background: isWidgetHovered
              ? 'rgba(30, 30, 32, 0.75)'
              : 'rgba(255,255,255,0.55)',
            border: isWidgetHovered
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(255,255,255,0.75)',
            boxShadow: isWidgetHovered
              ? '0 8px 32px rgba(0,0,0,0.45)'
              : '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {/* Top gloss highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 rounded-t-full z-0 transition-opacity duration-300"
            style={{
              height: '45%',
              background: isWidgetHovered
                ? 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)'
                : 'linear-gradient(to bottom, rgba(255,255,255,0.65), transparent)',
            }}
          />

          {/* === DEFAULT state: "Get in touch" label === */}
          <AnimatePresence initial={false}>
            {!isWidgetHovered && (
              <motion.div
                key="label"
                initial={{ opacity: 0, x: 16, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -16, width: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col pl-4 pr-2 overflow-hidden shrink-0 z-10"
              >
                <span className="text-[13px] font-extrabold text-black tracking-tight leading-tight whitespace-nowrap">
                  Get in touch
                </span>
                <span className="text-[11px] font-medium text-zinc-500 leading-tight whitespace-nowrap">
                  Email or book a call
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* === BLACK CONTACT BUTTON — always visible === */}
          <motion.button
            onClick={openContactModal}
            whileTap={{ scale: 0.94 }}
            layout
            className="relative flex items-center gap-2 rounded-full z-10 overflow-hidden select-none transition-all duration-300"
            style={{
              padding: isWidgetHovered ? '9px 18px' : '9px',
              background: 'linear-gradient(180deg, #3a3a3a 0%, #111 100%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {/* Inner gloss */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)' }} />
            {/* Envelope icon */}
            <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <AnimatePresence initial={false}>
              {isWidgetHovered && (
                <motion.span
                  key="contact-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.22 }}
                  className="whitespace-nowrap font-extrabold text-xs text-white tracking-tight relative z-10 overflow-hidden"
                >
                  Contact
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* === BOOK A CALL — bounces in from right on hover === */}
          <AnimatePresence initial={false}>
            {isWidgetHovered && (
              <motion.div
                key="book-a-call"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 26,
                  mass: 0.7,
                }}
                className="flex items-center gap-2 pr-2 z-10 select-none"
              >
                {/* Small white circle calendar icon */}
                <button
                  onClick={openApplyModal}
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)' }} />
                  <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="#1a1a1a">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                  </svg>
                </button>

                {/* Plain "Book a Call" text label */}
                <span className="text-[13px] font-semibold text-white/90 whitespace-nowrap tracking-tight pr-1">
                  Book a Call
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
