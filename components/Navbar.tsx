"use client";

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Our Work', path: '/work' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

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
      className={`fixed top-4 md:top-6 left-1/2 z-50 flex items-center justify-between p-1.5 rounded-[32px] bg-[#2A2A2C]/80 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 gap-8 md:gap-16 w-[95%] sm:w-auto max-w-4xl`}
    >
      {/* Left Profile Picture */}
      <Link href="/" className="w-[42px] h-[42px] ml-1 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(0,122,255,0.5)] border border-[#007AFF] shrink-0 overflow-hidden relative group">
        <div className="absolute inset-0 bg-[#007AFF] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity z-10" />
        <Image src="/icon.png" alt="HalftoneMotion" fill className="object-cover p-[3px] rounded-full" />
      </Link>
      
      {/* Desktop Nav */}
      <div 
        className="hidden md:flex items-center justify-center space-x-2 relative"
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
                className={`relative px-4 py-2 transition-colors duration-300 font-semibold tracking-[0.15em] text-[11px] uppercase ${isActive ? 'text-[#007AFF]' : 'text-white/70'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 inset-x-0 mx-auto w-4 h-[3px] rounded-full bg-[#007AFF] shadow-[0_0_10px_rgba(0,122,255,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </LayoutGroup>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Switcher as Cart Button */}
        <ThemeToggle className="w-[42px] h-[42px] mr-1 rounded-full bg-[#007AFF] flex items-center justify-center shadow-[0_0_15px_rgba(0,122,255,0.5)] shrink-0 hover:scale-105 transition-transform text-white group" />
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden gap-1 pl-1">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-black/20 hover:bg-black/40 transition-colors" 
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
            className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-zinc-800/95 backdrop-blur-2xl border border-white/10 overflow-hidden rounded-[32px] shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {[
                  { name: 'HOME', path: '/' },
                  { name: 'OUR WORK', path: '/work' },
                  { name: 'CONTACT', path: '/contact' }
                ].map((item, i) => (
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
                      className="text-2xl font-bold tracking-wide text-white block py-2"
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
