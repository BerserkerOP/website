"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import TiltButton from './TiltButton';
import LightRays from './Backgrounds/LightRays';
import ScrollFloat from './TextAnimations/ScrollFloat';

const phrases = [
  "Captivates Your Audience",
  "Elevates Your Brand",
  "Brings Ideas to Life",
  "Tells Your Story",
  "Drives Engagement"
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const lightRaysOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative bg-apple-bg overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
      <motion.div style={{ opacity: lightRaysOpacity }} className="absolute inset-0 z-0 pointer-events-none">
        <LightRays className="opacity-80" />
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full py-10 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-apple-card border border-apple-border text-apple-subtext text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-apple-blue shrink-0"></span>
              Elevating Digital Experiences
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-[64px] font-bold text-apple-text leading-[1.1] tracking-tight max-w-4xl"
          >
            Professional Motion Design that <br/>
            <span className="text-apple-blue relative block h-[1.2em] w-full overflow-hidden mt-2">
              <AnimatePresence>
                <motion.span
                  key={index}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                >
                  {phrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <div className="max-w-2xl mt-4">
            <ScrollFloat
              animationDuration={1}
              ease="back.out(2)"
              scrollStart="top bottom"
              scrollEnd="bottom center"
              stagger={0.02}
              textClassName="text-base sm:text-lg text-apple-subtext"
            >
              We collaborate with brands to deliver premium motion design and video assets, ensuring a seamless and efficient process from concept to final delivery.
            </ScrollFloat>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full px-4 sm:px-0"
          >
            <TiltButton href="/#contact" className="w-full sm:w-auto font-semibold text-apple-text px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/80 dark:border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_4px_24px_-8px_rgba(255,255,255,0.05)] transition-all hover:scale-[1.02]">
              Start Your Project
            </TiltButton>
            <TiltButton href="/work" glow={true} className="w-full sm:w-auto font-semibold text-apple-text rounded-full shadow-sm text-sm sm:text-base" innerClassName="px-6 py-3.5 sm:px-8 sm:py-4">
              View Our Work
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </TiltButton>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20 opacity-50 dark:opacity-40"
        style={{
          backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />
      
      {/* Background soft glow effect */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center">
        <div className="w-[800px] h-[400px] bg-apple-blue/5 rounded-full blur-[100px] absolute top-10"></div>
      </div>
    </section>
  );
}
