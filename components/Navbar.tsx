"use client";

import { motion, AnimatePresence, LayoutGroup, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, MouseEvent } from 'react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { name: 'Work', path: '/work', sectionId: 'work' },
  { name: 'Process', path: '/process', sectionId: 'process' },
  { name: 'FAQ', path: '/faq', sectionId: 'faq' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dotsMenuOpen, setDotsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Work');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      if (pathname === '/') {
        const sections = ['work', 'process', 'faq', 'contact'];
        const scrollPos = window.scrollY + 250;

        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              if (sec === 'work') setActiveTab('Work');
              if (sec === 'process') setActiveTab('Process');
              if (sec === 'faq') setActiveTab('FAQ');
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Sync activeTab with route pathname
  useEffect(() => {
    if (pathname === '/work') setActiveTab('Work');
    else if (pathname === '/process') setActiveTab('Process');
    else if (pathname === '/faq') setActiveTab('FAQ');
    else if (pathname === '/contact') setActiveTab('Contact');
    else if (pathname === '/') setActiveTab('Work');
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string; path: string; sectionId: string }) => {
    if (pathname === '/') {
      const elem = document.getElementById(link.sectionId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(link.name);
        setDotsMenuOpen(false);
      }
    }
  };

  return (
    <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      <motion.nav 
        layout
        layoutRoot
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          scale: scrolled ? 0.94 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onMouseMove={handleMouseMove}
        className={`group relative flex items-center justify-between rounded-full backdrop-blur-3xl transition-all duration-500 overflow-hidden ${
          scrolled 
            ? 'bg-white/40 dark:bg-zinc-950/40 border border-white/60 dark:border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-white/40 px-4 py-2 gap-4' 
            : 'bg-white/90 dark:bg-zinc-950/90 border border-black/10 dark:border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-5 py-2.5 gap-6 sm:gap-8 w-auto max-w-4xl'
        }`}
      >
        {/* Liquid Glass Highlight Reflection Curve */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/60 via-white/20 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent rounded-t-full z-0" />

        {/* Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 overflow-hidden"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 122, 255, 0.12),
                transparent 80%
              )
            `,
          }}
        />

        {/* Left Brand Mark & Name */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          transition={{ type: "spring", stiffness: 400, damping: 15 }} 
          className="z-10 shrink-0"
        >
          <Link 
            href="/" 
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 group/logo"
          >
            {/* Blue Clapper Icon */}
            <div className="w-6 h-6 rounded-md bg-apple-blue flex items-center justify-center shrink-0 shadow-sm text-white p-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4H9L7 4H5c-1.1 0-1.99.9-1.99 2L3 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4h-3z"/>
              </svg>
            </div>
            <span className="font-extrabold text-sm sm:text-base text-black dark:text-white tracking-tight font-sans">
              HalftoneMotion
            </span>
          </Link>
        </motion.div>
        
        {/* Middle Desktop Nav Links (Shown when scrolled === false OR when dots menu is open) */}
        <AnimatePresence mode="wait">
          {(!scrolled || dotsMenuOpen) && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden md:flex items-center justify-center space-x-1 relative z-10 overflow-hidden"
              onMouseLeave={() => setHoveredTab(null)}
            >
              <LayoutGroup id="liquid-glass-pills">
                {NAV_LINKS.map((link) => {
                  const isTabActive = activeTab === link.name || hoveredTab === link.name;
                  
                  return (
                    <Link 
                      key={link.name}
                      href={link.path} 
                      onClick={(e) => handleNavClick(e, link)}
                      onMouseEnter={() => setHoveredTab(link.name)}
                      className={`relative px-4 py-1.5 transition-colors duration-200 inline-block font-bold text-xs sm:text-[13px] rounded-full z-10 ${
                        isTabActive 
                          ? 'text-black dark:text-white' 
                          : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>

                      {/* Sliding Active Pill */}
                      {isTabActive && (
                        <motion.div
                          layoutId="liquidActiveTab"
                          className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full border border-black/10 dark:border-white/15 shadow-2xs"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </LayoutGroup>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 z-10 shrink-0">
          {/* Top of page: Show Contact Button */}
          {!scrolled && (
            <Link
              href="/contact"
              onClick={(e) => {
                if (pathname === '/') {
                  const elem = document.getElementById('contact');
                  if (elem) {
                    e.preventDefault();
                    elem.scrollIntoView({ behavior: 'smooth' });
                    setActiveTab('Contact');
                  }
                }
              }}
              className="px-4 py-1.5 rounded-full border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 text-xs sm:text-[13px] font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
          )}

          {/* Scrolled down state: macOS 3-Dots Glass Trigger */}
          {scrolled && (
            <button
              onClick={() => setDotsMenuOpen(!dotsMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle liquid menu"
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
            </button>
          )}

          {/* Theme Switcher Button */}
          <ThemeToggle className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-xs hover:scale-105 shrink-0 transition-all text-black dark:text-white group/theme" />
          
          {/* Mobile Nav Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors" 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className="absolute top-[calc(100%+10px)] left-0 right-0 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border border-black/10 dark:border-white/20 overflow-hidden rounded-[24px] shadow-2xl p-4 flex flex-col space-y-2"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item);
                  }}
                  className="text-base font-bold text-black dark:text-white py-2 px-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-apple-blue py-2 px-4 rounded-xl hover:bg-apple-blue/10 transition-colors border border-apple-blue/20 text-center mt-2"
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Liquid Glass Bottom Indicator Dot (matching Image 1) */}
      {scrolled && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-3.5 h-3.5 mt-1 rounded-full bg-white/60 dark:bg-white/30 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-apple-blue shadow-[0_0_6px_#007AFF]" />
        </motion.div>
      )}
    </div>
  );
}
