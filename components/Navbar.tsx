"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-apple-border shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold tracking-tight text-apple-text">HalftoneMotion</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-apple-subtext hover:text-apple-text transition-colors duration-200">Home</Link>
            <Link href="/work" className="text-sm font-medium text-apple-subtext hover:text-apple-text transition-colors duration-200">Our Work</Link>
            <Link href="/contact" className="text-sm font-medium text-apple-subtext hover:text-apple-text transition-colors duration-200">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/80 dark:border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_4px_24px_-8px_rgba(255,255,255,0.05)] text-apple-text px-5 py-2.5 text-sm active:scale-[0.98] hover:scale-[1.02]">
              Get Started
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Mobile Nav Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-apple-text hover:bg-apple-gray transition-colors" 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Apple-style Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 h-[100vh] md:hidden bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-t border-apple-border/50 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col h-full max-h-[calc(100vh-80px)]">
              <div className="flex flex-col space-y-6">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Our Work', path: '/work' },
                  { name: 'Contact', path: '/contact' }
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      href={item.path} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="text-3xl font-semibold text-apple-text block py-2"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 pt-8 border-t border-apple-border/50"
              >
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center justify-center font-bold rounded-full bg-apple-blue text-white shadow-lg shadow-apple-blue/20 py-4 text-lg active:scale-[0.98] transition-all w-full"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
