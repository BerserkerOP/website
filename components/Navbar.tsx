"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

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
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] md:w-auto md:min-w-[700px] flex items-center justify-between p-2 rounded-full bg-zinc-500/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-[0_0_20px_rgba(163,230,53,0.15)] border border-white/10`}
    >
      {/* Left Profile Picture */}
      <Link href="/" className="w-12 h-12 rounded-full bg-[#a3e635] flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)] shrink-0 overflow-hidden relative group">
        <div className="absolute inset-0 bg-[#a3e635] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity z-10" />
        <Image src="/icon.png" alt="HalftoneMotion" fill className="object-cover" />
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-center space-x-8 px-8">
        <Link href="/" className="text-white/90 hover:text-white transition-colors font-bold tracking-wider text-[13px] uppercase">Home</Link>
        <Link href="/work" className="text-white/90 hover:text-white transition-colors font-bold tracking-wider text-[13px] uppercase">Catalog</Link>
        <Link href="/#about" className="text-white/90 hover:text-white transition-colors font-bold tracking-wider text-[13px] uppercase">About</Link>
        <Link href="/#faq" className="text-white/90 hover:text-white transition-colors font-bold tracking-wider text-[13px] uppercase">FAQ</Link>
        <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-bold tracking-wider text-[13px] uppercase">Contact</Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        
        {/* Right Cart Button */}
        <Link href="/contact" className="w-12 h-12 rounded-full bg-[#a3e635] flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)] shrink-0 hover:scale-105 transition-transform text-black group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </Link>
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden gap-1 pl-1">
          <ThemeToggle />
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
            className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-zinc-800/95 backdrop-blur-2xl border border-white/10 overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {[
                  { name: 'HOME', path: '/' },
                  { name: 'CATALOG', path: '/work' },
                  { name: 'ABOUT', path: '/#about' },
                  { name: 'FAQ', path: '/#faq' },
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
