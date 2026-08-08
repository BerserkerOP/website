"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1];

export default function FloatingContactWidget() {
  const [hovered, setHovered] = useState(false);

  const handleOpenModal = () => {
    window.location.hash = '#inquiry';
  };

  return (
    <>
      {/* Smooth Feathered Bottom Blur Overlay (Matches Clip Masters style in both Light & Dark themes) */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 z-40 h-[100px] sm:h-[130px] bg-gradient-to-t from-apple-bg via-apple-bg/75 to-transparent backdrop-blur-md"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
        }}
      />


      {/* Floating Widget Container */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26, delay: 0.5 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleOpenModal}
          className="relative flex items-center rounded-full overflow-hidden cursor-pointer select-none"
          style={{
            padding: '5px',
            gap: '6px',
            minWidth: '180px',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            background: hovered 
              ? 'rgba(18, 18, 20, 0.85)' 
              : 'rgba(255, 255, 255, 0.65)',
            border: hovered 
              ? '1px solid rgba(255, 255, 255, 0.15)' 
              : '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: hovered
              ? '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
              : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.75)',
            transition: 'background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease',
          }}
        >
          {/* Glass Top Specular Highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 rounded-t-full h-1/2 z-0"
            style={{
              background: hovered
                ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)'
                : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.75), transparent)',
              transition: 'background 0.35s ease',
            }}
          />

          {/* Default State: "Get in touch" Text (slides out left on hover) */}
          <AnimatePresence initial={false}>
            {!hovered && (
              <motion.div
                key="label"
                initial={{ opacity: 0, x: 15, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="flex flex-col pl-4 pr-3 overflow-hidden shrink-0 z-10"
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

          {/* Single Black Button — Expands on hover to fill the full rectangle */}
          <motion.button
            layout
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center gap-2 rounded-full z-10 overflow-hidden select-none w-full"
            style={{
              padding: hovered ? '10px 22px' : '9px 12px',
              background: 'linear-gradient(180deg, #3c3c3e 0%, #111113 100%)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div 
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full" 
              style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)' }} 
            />
            
            {/* Envelope Icon */}
            <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>

            {/* Label inside the button when expanded */}
            <span className="whitespace-nowrap font-extrabold text-xs text-white tracking-tight relative z-10">
              Get in touch
            </span>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
