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
  const { scrollY } = useScroll();
  // Fade out as the user scrolls down (e.g. from 0 to 600px)
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative bg-apple-bg overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">

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
            <span className="text-apple-blue relative block h-[2.4em] sm:h-[1.2em] w-full overflow-hidden mt-2">
              <AnimatePresence>
                <motion.span
                  key={index}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center text-center px-4"
                >
                  {phrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <div className="max-w-2xl mt-4">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg text-apple-subtext"
            >
              We collaborate with brands to deliver premium motion design and video assets, ensuring a seamless and efficient process from concept to final delivery.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full px-4 sm:px-0"
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
