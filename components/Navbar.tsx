"use client";

import { motion, AnimatePresence, LayoutGroup, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, MouseEvent } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Our Work', path: '/work' },
  { name: 'Process', path: '/process' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <motion.nav 
      layoutRoot
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className={`group fixed top-4 md:top-6 left-1/2 z-50 flex items-center justify-between p-2 rounded-full bg-gradient-to-r from-white/90 via-white/80 to-white/90 dark:from-zinc-950/90 dark:via-zinc-900/85 dark:to-zinc-950/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-black/10 dark:border-white/15 gap-4 md:gap-10 w-auto max-w-4xl`}
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 overflow-hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 122, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Left HalftoneMotion Brand Badge Logo */}
      <motion.div 
        whileHover={{ scale: 1.04 }} 
        transition={{ type: "spring", stiffness: 400, damping: 15 }} 
        className="z-10 ml-1"
      >
        <Link 
          href="/" 
          className="flex items-center px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black border border-black/10 shadow-sm group/logo transition-all"
        >
          {/* Official HalftoneMotion Image Logo */}
          <div className="h-5 sm:h-6 w-auto flex items-center shrink-0">
            <Image 
              src="/logo.png" 
              alt="HalftoneMotion" 
              width={140} 
              height={28} 
              className="h-5 sm:h-6 w-auto object-contain scale-[1.15]" 
              priority 
            />
          </div>
        </Link>
      </motion.div>
      
      {/* Desktop Nav */}
      <div 
        className="hidden md:flex items-center justify-center space-x-1 relative z-10"
        onMouseLeave={() => setHoveredPath(null)}
      >
        <LayoutGroup>
          {NAV_LINKS.map((link) => {
            const isActive = hoveredPath === link.path || (!hoveredPath && pathname === link.path);
            return (
              <Link 
                key={link.path}
                href={link.path} 
                onMouseEnter={() => setHoveredPath(link.path)}
                className={`relative px-4 py-2 transition-all duration-300 inline-block font-bold tracking-[0.12em] text-[11px] uppercase ${
                  isActive 
                    ? 'text-black dark:text-white font-extrabold' 
                    : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    layout
                    className="absolute -bottom-1 inset-x-0 mx-auto w-1.5 h-1.5 flex items-center justify-center pointer-events-none"
                    transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.38 }}
                  >
                    <motion.div
                      initial={{ scaleX: 1, filter: "blur(0px)" }}
                      animate={{ 
                        scaleX: [1, 4.5, 1],
                        filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"]
                      }}
                      transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.38 }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </LayoutGroup>
      </div>

      <div className="flex items-center gap-3 z-10 mr-1">
        {/* Theme Switcher as Glass Pill Button */}
        <ThemeToggle className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm hover:scale-105 shrink-0 transition-all text-black dark:text-white group/theme" />
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden gap-1">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border border-black/10 dark:border-white/20 overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="px-6 py-6 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      href={item.path} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="text-xl font-bold tracking-wide uppercase text-black dark:text-white block py-2"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
