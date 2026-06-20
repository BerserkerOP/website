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
            <Link href="/contact" className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 backdrop-blur-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_24px_-8px_rgba(255,255,255,0.1)] text-apple-text px-5 py-2.5 text-sm active:scale-[0.98]">
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-apple-card border-b border-apple-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-apple-text font-medium py-2">Home</Link>
              <Link href="/work" onClick={() => setMobileMenuOpen(false)} className="text-apple-text font-medium py-2 border-t border-apple-border/50">Our Work</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-apple-text font-medium py-2 border-t border-apple-border/50">Contact</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center font-semibold rounded-full backdrop-blur-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_24px_-8px_rgba(255,255,255,0.1)] text-apple-text px-5 py-3 text-sm mt-2 w-full active:scale-[0.98] transition-all">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
