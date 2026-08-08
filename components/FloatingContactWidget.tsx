"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

export default function FloatingContactWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'apply' | null>(null);

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
        className="pointer-events-none fixed bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-zinc-950/80 dark:via-zinc-950/30 to-transparent backdrop-blur-[4px] z-40"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Floating Bottom Action Widget (matching Image 1, 2 & 3) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.5 }}
          className="relative flex items-center gap-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-black/10 dark:border-white/15 px-5 py-2.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group"
        >
          {/* Top Liquid Glass Highlight Reflection Curve */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/60 via-white/20 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent rounded-t-full z-0" />

          {/* Left Text Label (hidden when button expands) */}
          <AnimatePresence>
            {!hoveredButton && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col z-10 overflow-hidden"
              >
                <span className="text-xs sm:text-[13px] font-extrabold text-black dark:text-white tracking-tight leading-tight whitespace-nowrap">
                  Get in touch
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-tight whitespace-nowrap">
                  Email or book a call
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Interactive Icon Action Buttons */}
          <div className="flex items-center gap-2 z-10">
            
            {/* 1. Email / Contact Button (Black Button) */}
            <motion.button
              onClick={openContactModal}
              onMouseEnter={() => setHoveredButton('contact')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center gap-2 rounded-full transition-all duration-300 shadow-md ${
                hoveredButton === 'contact' 
                  ? 'bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs font-extrabold' 
                  : 'bg-black text-white dark:bg-white dark:text-black w-9 h-9 justify-center'
              }`}
            >
              {/* Email Icon */}
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              {hoveredButton === 'contact' && (
                <motion.span 
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-nowrap font-extrabold text-xs tracking-tight"
                >
                  Contact
                </motion.span>
              )}
            </motion.button>

            {/* 2. Calendar / Apply Button (White Button) */}
            <motion.button
              onClick={openApplyModal}
              onMouseEnter={() => setHoveredButton('apply')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center gap-2 rounded-full transition-all duration-300 border border-black/10 dark:border-white/10 ${
                hoveredButton === 'apply' 
                  ? 'bg-white text-black dark:bg-zinc-800 dark:text-white px-4 py-2 text-xs font-extrabold shadow-md' 
                  : 'bg-white text-black dark:bg-zinc-800 dark:text-white w-9 h-9 justify-center shadow-sm'
              }`}
            >
              {/* Calendar Icon */}
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
              </svg>
              {hoveredButton === 'apply' && (
                <motion.span 
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-nowrap font-extrabold text-xs tracking-tight"
                >
                  Apply Now
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
