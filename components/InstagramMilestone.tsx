"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, ArrowUpRight, TrendingUp } from "lucide-react";

export default function InstagramMilestone() {
  const [isHovered, setIsHovered] = useState(false);
  const [viewsCount, setViewsCount] = useState(0);

  // Smooth count-up animation for the views metric
  useEffect(() => {
    let start = 0;
    const end = 720;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setViewsCount(Math.floor(start + easeProgress * (end - start)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <a
      href="https://instagram.com/atharvf.x"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-lg mb-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative group cursor-pointer w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Iridescent Instagram Gradient Background Glow (Apple UI style) */}
        <div 
          className="absolute -inset-[1px] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[24px] opacity-15 dark:opacity-20 blur-sm group-hover:opacity-40 group-hover:blur-md transition-all duration-500" 
          style={{ transform: "translateZ(0)" }}
        />

        {/* Main Container Card */}
        <div className="relative overflow-hidden rounded-[23px] bg-white/40 dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.06] backdrop-blur-xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          
          {/* Left Side: Stats and Info */}
          <div className="flex flex-col items-start gap-1 z-10">
            
            {/* Badge Label */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="p-1 rounded-md bg-[#ee2a7b]/10 text-[#ee2a7b] dark:bg-[#ee2a7b]/20 dark:text-[#ff599c] flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#ee2a7b] dark:text-[#ff599c] uppercase">
                Instagram Organic growth
              </span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ee2a7b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ee2a7b]"></span>
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-bold text-apple-text dark:text-white tracking-tight flex items-center">
                {viewsCount}K+
              </span>
              <span className="text-xs font-bold text-[#ee2a7b] dark:text-[#ff599c] tracking-tight">
                Views
              </span>
            </div>

            {/* Metric Description */}
            <span className="text-[11px] sm:text-xs font-semibold text-apple-subtext dark:text-zinc-400">
              Generated organically in <strong className="text-apple-text dark:text-zinc-200 font-bold">2 weeks</strong>
            </span>
          </div>

          {/* Right Side: Growth Chart Visual */}
          <div className="flex flex-col items-end gap-1.5 z-10 shrink-0 w-28 sm:w-32">
            {/* Growth rate indicators */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3 h-3" />
              <span>Explosive</span>
            </div>

            {/* Custom SVG Sparkline Trend Graph */}
            <div className="w-full h-10 mt-1 relative">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ee2a7b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ee2a7b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Shaded Area Under Line */}
                <motion.path
                  d="M0 25 Q15 22, 30 18 T60 12 T85 5 T100 0 L100 30 L0 30 Z"
                  fill="url(#chartGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
                
                {/* Animated Trendline */}
                <motion.path
                  d="M0 25 Q15 22, 30 18 T60 12 T85 5 T100 0"
                  fill="none"
                  stroke="url(#chartLineGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                />
                
                {/* Multi-color gradient for line */}
                <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f9ce34" />
                  <stop offset="50%" stopColor="#ee2a7b" />
                  <stop offset="100%" stopColor="#6228d7" />
                </linearGradient>

                {/* Drawing Tracing Dot (moves along line) */}
                <motion.circle
                  r="3.5"
                  fill="#6228d7"
                  stroke="#ffffff"
                  strokeWidth="1"
                  initial={{ cx: 0, cy: 25, opacity: 1 }}
                  animate={{ 
                    cx: [0, 15, 30, 60, 85, 100],
                    cy: [25, 22, 18, 12, 5, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut", 
                    delay: 0.1 
                  }}
                />

                {/* Pulsating End Indicator Dot (fades in and pulses after line is drawn) */}
                <motion.circle
                  cx="100"
                  cy="0"
                  r="3.5"
                  fill="#6228d7"
                  stroke="#ffffff"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: 1
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { delay: 1.6, duration: 0.2 }
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Dynamic Chevron Arrow that translates on card hover */}
          <div className="absolute top-4 right-4 text-apple-subtext dark:text-zinc-500 group-hover:text-apple-text dark:group-hover:text-white transition-colors duration-300">
            <motion.div
              animate={{ 
                x: isHovered ? 2 : 0, 
                y: isHovered ? -2 : 0 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </a>
  );
}
