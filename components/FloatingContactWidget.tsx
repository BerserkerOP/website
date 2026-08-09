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
      {/* === HEAVY FROSTED BLUR ZONE — wide diffused backdrop behind widget === */}
      {/* Layer 1: tall color fade */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 z-40"
        style={{
          height: '160px',
          background: 'linear-gradient(to top, var(--apple-bg, #F8F9FA) 0%, color-mix(in srgb, var(--apple-bg, #F8F9FA) 85%, transparent) 45%, transparent 100%)',
        }}
      />
      {/* Layer 2: strong backdrop blur with feathered mask */}
      <div
        className="pointer-events-none fixed bottom-0 inset-x-0 z-40"
        style={{
          height: '140px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
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
          className="relative rounded-full overflow-hidden p-[1.5px]"
          style={{
            width: '220px',
            height: '44px',
            /* Frosted glass border via a subtle gradient outline */
            background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 100%)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(255,255,255,0.3), inset 0 0.5px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Inner frosted glass fill */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
          >
            {/* Top specular arc */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-t-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
              }}
            />

            {/* Left Text Label — slides out left & fades when hovered */}
            <div 
              className="absolute left-0 top-0 bottom-0 flex items-center pl-5 z-10 pointer-events-none"
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered ? 'translateX(-14px)' : 'translateX(0)',
                transition: 'opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <span className="text-[13px] font-medium text-black/80 tracking-tight whitespace-nowrap">
                Get in touch
              </span>
            </div>

            {/* Black Contact Button — anchored right, smoothly expands left to fill */}
            <div 
              className="absolute top-[3px] bottom-[3px] right-[3px] flex items-center justify-center gap-2 rounded-full z-20 overflow-hidden text-white"
              style={{
                width: hovered ? 'calc(100% - 6px)' : '106px',
                transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                background: 'linear-gradient(180deg, #3a3a3c 0%, #1c1c1e 50%, #0a0a0a 100%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.12)',
              }}
            >
              {/* Glass-edge arc sweep on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden z-10">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '80%',
                    height: '160%',
                    top: '-40%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)',
                    transform: hovered ? 'translateX(110%)' : 'translateX(-90%)',
                    transition: hovered ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                  }}
                />
              </div>
              
              {/* Envelope Icon */}
              <svg className="w-4 h-4 shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>

              {/* "Contact" Text */}
              <span className="whitespace-nowrap font-semibold text-[12px] text-white tracking-tight relative z-10">
                Contact
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
