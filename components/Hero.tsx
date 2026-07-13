"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import TiltButton from './TiltButton';
import ContactForm from './ContactForm';
import InstagramMilestone from './InstagramMilestone';


const phrases = [
  "Captivates Your Audience",
  "Elevates Your Brand",
  "Brings Ideas to Life",
  "Tells Your Story",
  "Drives Engagement"
];

// iOS Notification Icons
const SlackIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M25 57.5C25 50.6 30.6 45 37.5 45S50 50.6 50 57.5V67.5H37.5C30.6 67.5 25 61.9 25 57.5Z" fill="#36C5F0"/>
      <path d="M25 77.5C25 70.6 30.6 65 37.5 65C44.4 65 50 70.6 50 77.5C50 84.4 44.4 90 37.5 90S25 84.4 25 77.5Z" fill="#36C5F0"/>
      <path d="M57.5 25C64.4 25 70 30.6 70 37.5S64.4 50 57.5 50H47.5V37.5C47.5 30.6 53.1 25 57.5 25Z" fill="#2EB67D"/>
      <path d="M37.5 25C44.4 25 50 30.6 50 37.5C50 44.4 44.4 50 37.5 50C30.6 50 25 44.4 25 37.5S30.6 25 37.5 25Z" fill="#2EB67D"/>
      <path d="M95 62.5C95 69.4 89.4 75 82.5 75S70 69.4 70 62.5V52.5H82.5C89.4 52.5 95 58.1 95 62.5Z" fill="#ECB22E"/>
      <path d="M95 42.5C95 49.4 89.4 55 82.5 55C75.6 55 70 49.4 70 42.5C70 35.6 75.6 30 82.5 30S95 35.6 95 42.5Z" fill="#ECB22E"/>
      <path d="M62.5 95C55.6 95 50 89.4 50 82.5S55.6 70 62.5 70H72.5V82.5C72.5 89.4 66.9 95 62.5 95Z" fill="#E01E5A"/>
      <path d="M82.5 95C75.6 95 70 89.4 70 82.5C70 75.6 75.6 70 82.5 70C89.4 70 95 75.6 95 82.5S89.4 95 82.5 95Z" fill="#E01E5A"/>
    </g>
  </svg>
);

const MessagesIcon = () => (
  <div className="w-4 h-4 rounded-md bg-[#34C759] flex items-center justify-center shadow-inner shrink-0">
    <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  </div>
);

const MailIcon = () => (
  <div className="w-4 h-4 rounded-md bg-gradient-to-b from-[#54a3ff] to-[#007AFF] flex items-center justify-center shadow-inner shrink-0">
    <svg className="w-2.5 h-2.5 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </div>
);

const InstagramNotificationIcon = () => (
  <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shrink-0 shadow-sm">
    <svg className="w-2.5 h-2.5 text-white fill-none stroke-[2.5]" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </div>
);

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroReviews.length) % heroReviews.length);
  };

  useEffect(() => {
    if (hoveredCard !== null) return; // Pause auto-rotation on hover
    
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Cycle every 6 seconds
    
    return () => clearInterval(interval);
  }, [hoveredCard]);

  const heroReviews = [
    {
      id: 0,
      app: "Slack",
      sender: "Akil Gurram",
      role: "Founder of WTM",
      text: "Delivered it with great video quality in just a few days at a reasonable price.",
      time: "2m ago",
      iconType: "slack",
      image: "/reviews/akil.jpg",
    },
    {
      id: 1,
      app: "iMessage",
      sender: "Rhythm Shandlya",
      role: "Founder of Vionna",
      text: "Highly responsive, communicate well, and take genuine ownership of their work.",
      time: "5m ago",
      iconType: "imessage",
      image: "/reviews/rhythm.jpg",
    },
    {
      id: 2,
      app: "Mail",
      sender: "Sarah Jenkins",
      role: "Product Manager",
      text: "Their onboarding sequence increased our user retention by 30%. Absolute best.",
      time: "12m ago",
      iconType: "mail",
    }
  ];

  return (
    <section className="relative bg-apple-bg overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-apple-blue/[0.06] border border-apple-blue/15 shadow-sm text-[11px] font-semibold text-apple-blue tracking-wider uppercase dark:bg-apple-blue/10 dark:border-apple-blue/20"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-blue"></span>
              </span>
              <span>Trusted by 30+ partners across 10+ global markets</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-[56px] font-bold text-apple-text dark:text-white leading-[1.1] tracking-tight max-w-2xl text-center lg:text-left"
            >
              Professional Motion Design
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

          {/* Right Column: Clean App Store-style single card reviews carousel */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center select-none mt-12 lg:mt-0 gap-6">
            <InstagramMilestone />

            {/* Reviews Card Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] min-h-[220px] flex flex-col justify-between">
              
              {/* Background ambient glow */}
              <div className="absolute inset-0 bg-apple-blue/5 rounded-2xl blur-[40px] -z-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredCard(activeIndex)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="w-full bg-white/70 dark:bg-[#1C1C1E]/80 border border-black/[0.08] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {/* Top Row: Rating */}
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.05] pb-4 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="flex-grow flex flex-col justify-center my-1.5 min-h-[80px]">
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium font-sans">
                      “{heroReviews[activeIndex].text}”
                    </p>
                  </div>

                  {/* Bottom Row: Profile info */}
                  <div className="flex items-center justify-between border-t border-black/[0.05] dark:border-white/[0.05] pt-4 mt-4">
                    <div className="flex items-center gap-3">
                      {heroReviews[activeIndex].image ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
                          <img src={heroReviews[activeIndex].image} alt={heroReviews[activeIndex].sender} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-extrabold text-xs shrink-0 border border-black/5 dark:border-white/5">
                          {heroReviews[activeIndex].sender.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-apple-text dark:text-white leading-tight">
                          {heroReviews[activeIndex].sender}
                        </span>
                        <span className="text-[10px] text-apple-subtext dark:text-zinc-500 font-semibold leading-tight mt-0.5">
                          {heroReviews[activeIndex].role}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls (Arrows & Dots) */}
              <div className="flex items-center justify-between mt-4 px-2 w-full">
                {/* Indicators Dots */}
                <div className="flex gap-2">
                  {heroReviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === idx 
                          ? 'bg-apple-blue w-4' 
                          : 'bg-black/15 dark:bg-white/20 hover:bg-black/35 dark:hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next/Prev buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/85 dark:hover:bg-white/10 text-apple-text dark:text-white transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Previous Review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/85 dark:hover:bg-white/10 text-apple-text dark:text-white transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Next Review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
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

