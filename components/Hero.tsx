"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import TiltButton from './TiltButton';
import ContactForm from './ContactForm';


const phrases = [
  "Captivates Your Audience",
  "Elevates Your Brand",
  "Brings Ideas to Life",
  "Tells Your Story",
  "Drives Engagement"
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heroReviews = [
    {
      name: "Akil Gurram",
      role: "Founder of WTM",
      text: "Delivered it with great video quality in just a few days at a reasonable price.",
      rotation: -7,
      x: -65,
      y: -65,
      image: "/reviews/akil.jpg",
    },
    {
      name: "Rhythm Shandlya",
      role: "Founder of Vionna",
      text: "Highly responsive, communicate well, and take genuine ownership of their work.",
      rotation: 6,
      x: 55,
      y: 5,
      image: "/reviews/rhythm.jpg",
    },
    {
      name: "Sarah Jenkins",
      role: "Product Manager",
      text: "Their onboarding sequence increased our user retention by 30%. Absolute best.",
      rotation: -2,
      x: -10,
      y: 75,
    }
  ];

  return (
    <section className="relative bg-apple-bg overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 bg-apple-card border border-apple-border text-apple-subtext text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue shrink-0 animate-pulse"></span>
                Elevating Digital Experiences
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-[56px] font-bold text-apple-text dark:text-white leading-[1.1] tracking-tight max-w-2xl"
            >
              Professional Motion Design that <br/>
              <span className="text-apple-blue relative block h-[2.2em] sm:h-[1.2em] w-full overflow-hidden mt-1 lg:text-left text-center">
                {mounted && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 15, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center lg:justify-start text-center lg:text-left px-4 lg:px-0"
                    >
                      {phrases[index]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </span>
            </motion.h1>

            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-base sm:text-lg text-apple-subtext leading-relaxed font-medium"
              >
                We collaborate with brands to deliver premium motion design and video assets, ensuring a seamless and efficient process from concept to final delivery.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 w-full px-4 sm:px-0"
            >
              <TiltButton onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto font-bold bg-[#007AFF] text-white hover:bg-[#007AFF]/90 hover:shadow-[0_8px_25px_-5px_rgba(0,122,255,0.6)] hover:-translate-y-0.5 transition-all px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full">
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

          {/* Right Column: 3D Staggered Interactive Review Cards */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[400px] flex items-center justify-center select-none mt-10 lg:mt-0">
            {heroReviews.map((rev, idx) => {
              const isHovered = hoveredCard === idx;
              const isAnyHovered = hoveredCard !== null;
              
              // Calculate custom 3D transformations depending on hover state
              let cardZ = 10;
              if (idx === 0) cardZ = 10;
              if (idx === 1) cardZ = 20;
              if (idx === 2) cardZ = 30;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  animate={{
                    rotate: isHovered ? 0 : rev.rotation,
                    x: isHovered ? 0 : rev.x,
                    y: isHovered ? 0 : rev.y,
                    scale: isHovered ? 1.06 : isAnyHovered ? 0.94 : 1,
                    opacity: isHovered ? 1 : isAnyHovered ? 0.45 : 1,
                    zIndex: isHovered ? 50 : cardZ,
                    filter: isHovered ? "blur(0px)" : isAnyHovered ? "blur(1px)" : "blur(0px)",
                    borderColor: isHovered ? "rgba(0, 122, 255, 0.6)" : "rgba(128, 128, 128, 0.2)",
                    boxShadow: isHovered 
                      ? "0 25px 50px -12px rgba(0, 122, 255, 0.4), 0 0 25px rgba(0, 122, 255, 0.2)" 
                      : "0 15px 35px -10px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                  className="absolute w-[280px] sm:w-[320px] bg-white dark:bg-[#1E1E24] border border-black/[0.06] dark:border-white/5 rounded-[20px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-colors duration-300"
                >
                  <div className="flex flex-col gap-3">
                    {/* Star Rating */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                      “{rev.text}”
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                    {rev.image ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
                        <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-extrabold text-xs shrink-0 border border-black/5 dark:border-white/5">
                        {rev.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-zinc-900 dark:text-white leading-tight">{rev.name}</span>
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold leading-tight">{rev.role}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 pb-2 border-b border-black/5 dark:border-white/5 flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-bold text-apple-text tracking-tight">Start Your Project</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-apple-text transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="overflow-y-auto p-2">
                <ContactForm onSuccess={() => setIsModalOpen(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

