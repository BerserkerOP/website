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
  { name: 'Contact', path: '/contact' }
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
      className={`group fixed top-4 md:top-6 left-1/2 z-50 flex items-center justify-between p-1.5 rounded-[32px] bg-white/95 dark:bg-[#2A2A2A]/95 backdrop-blur-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-black/10 dark:border-white/10 gap-6 md:gap-16 w-auto max-w-4xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(0,122,255,0.15)]`}
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 overflow-hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.2),
              transparent 80%
            )
          `,
        }}
      />

      {/* Left Profile Picture */}
      <motion.div 
        whileHover={{ scale: 1.15, rotateZ: -2 }} 
        transition={{ type: "spring", stiffness: 400, damping: 15 }} 
        className="z-10 ml-1"
      >
        <Link href="/" className="block w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,122,255,0.7)] border border-[#007AFF]/40 shrink-0 relative overflow-hidden group/logo bg-black">
          {/* Sphere reflection effects */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,0.8),inset_0_4px_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none transition-all duration-300 group-hover/logo:shadow-[inset_0_-3px_15px_rgba(0,122,255,0.7),inset_0_5px_12px_rgba(255,255,255,0.8)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#007AFF]/40 via-transparent to-white/20 z-10 pointer-events-none mix-blend-overlay rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
          <Image src="/profile.jpg" alt="HalftoneMotion" fill className="object-cover rounded-full" />
        </Link>
      </motion.div>
      
      {/* Desktop Nav */}
      <div 
        className="hidden md:flex items-center justify-center space-x-2 relative z-10"
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
                className={`relative px-4 py-2 transition-all duration-300 inline-block font-bold tracking-[0.15em] text-[11px] uppercase hover:scale-110 ${isActive ? 'text-[#007AFF] drop-shadow-[0_0_8px_rgba(0,122,255,0.4)]' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    initial={{ scaleX: 1, borderRadius: "50%" }}
                    animate={{ scaleX: [1, 3.5, 1], borderRadius: ["50%", "20%", "50%"] }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-1 inset-x-0 mx-auto w-1.5 h-1.5 bg-[#007AFF] shadow-[0_0_8px_rgba(0,122,255,0.9)] origin-center"
                  />
                )}
              </Link>
            );
          })}
        </LayoutGroup>
      </div>

      <div className="flex items-center gap-4 z-10">
        {/* Theme Switcher as Cart Button */}
        <ThemeToggle className="w-[42px] h-[42px] mr-1 rounded-full bg-[#007AFF] flex items-center justify-center shadow-[0_0_15px_rgba(0,122,255,0.5)] shrink-0 hover:scale-105 transition-transform text-white group/theme" />
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden gap-1 pl-1">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-black/40 border border-white/10 hover:bg-black/60 transition-colors" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
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
            className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-zinc-900/95 backdrop-blur-3xl border border-white/20 overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
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
                      className="text-2xl font-bold tracking-wide uppercase text-white block py-2"
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
