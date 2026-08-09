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

      {/* Outer Floating Wrapper — hover anywhere on glass to trigger */}
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
          style={{ width: '220px', height: '42px' }}
        >
          {/* Specular Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 rounded-t-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/10 to-transparent z-0" />

          {/* Left Text Label — slides out left & fades when hovered */}
          <div 
            className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-4 z-10 pointer-events-none"
            style={{
              opacity: hovered ? 0 : 1,
              transform: hovered ? 'translateX(-14px)' : 'translateX(0)',
              transition: 'opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span className="text-[13px] font-medium text-black dark:text-white tracking-tight leading-tight whitespace-nowrap">
              Get in touch
            </span>
          </div>

          {/* Black Contact Button — anchored right, smoothly expands left to fill */}
          <div 
            className="absolute top-1 bottom-1 right-1 flex items-center justify-center gap-2 rounded-full z-20 overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-950 text-white shadow-lg border border-white/10"
            style={{
              width: hovered ? 'calc(100% - 8px)' : '108px',
              transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Static specular highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/15 to-transparent" />

            {/* Animated light sweep */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full z-10 overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 55%, transparent 60%)',
                  animation: 'btn-light-sweep 3s ease-in-out infinite',
                }}
              />
            </div>

            {/* Keyframes injected via style tag */}
            <style>{`
              @keyframes btn-light-sweep {
                0%   { transform: translateX(-120%); }
                60%  { transform: translateX(120%); }
                100% { transform: translateX(120%); }
              }
            `}</style>
            
            {/* Envelope Icon */}
            <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>

            {/* "Contact" Text */}
            <span className="whitespace-nowrap font-extrabold text-xs text-white tracking-tight relative z-10">
              Contact
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
