"use client";

import { motion, AnimatePresence, LayoutGroup, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, MouseEvent } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Work', path: '#work' },
  { name: 'Process', path: '#process' },
  { name: 'Contact', path: '#contact' },
  { name: 'FAQ', path: '#faq' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('work');
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
      setScrolled(window.scrollY > 30);

      // Section tracking for single page
      const sections = ['work', 'process', 'contact', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
  };

  return (
    <motion.nav 
      layout
      layoutRoot
      initial={{ y: -100, x: "-50%" }}
      animate={{ 
        y: 0, 
        x: "-50%",
        scale: scrolled ? 0.95 : 1,
        paddingTop: scrolled ? "6px" : "10px",
        paddingBottom: scrolled ? "6px" : "10px",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onMouseMove={handleMouseMove}
      className={`group fixed top-3 md:top-5 left-1/2 z-50 flex items-center justify-between rounded-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1),0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-black/10 dark:border-white/15 gap-3 md:gap-8 w-auto px-3 sm:px-5 transition-all duration-300`}
    >
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

      {/* Left HalftoneMotion Brand Logo Image */}
      <motion.div 
        whileHover={{ scale: 1.03 }} 
        transition={{ type: "spring", stiffness: 400, damping: 15 }} 
        className="z-10"
      >
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-white text-black border border-black/10 shadow-sm group/logo transition-all"
        >
          <div className="h-5 sm:h-5.5 w-auto flex items-center shrink-0">
            <Image 
              src="/logo.png" 
              alt="HalftoneMotion" 
              width={130} 
              height={26} 
              className="h-5 sm:h-5.5 w-auto object-contain scale-[1.1]" 
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
        <LayoutGroup id="navbar-pills">
          {NAV_LINKS.map((link) => {
            const linkSection = link.path.replace('#', '');
            const isActive = activeSection === linkSection || hoveredPath === link.path;
            
            return (
              <a 
                key={link.path}
                href={link.path} 
                onClick={(e) => scrollToSection(e, link.path)}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={`relative px-4 py-1.5 transition-colors duration-200 inline-block font-semibold text-xs sm:text-[13px] rounded-full z-10 ${
                  isActive 
                    ? 'text-black dark:text-white font-bold' 
                    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Clip Masters Style Sliding Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full border border-black/10 dark:border-white/15 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </LayoutGroup>
      </div>

      <div className="flex items-center gap-2.5 z-10">
        {/* Theme Switcher as Glass Pill Button */}
        <ThemeToggle className="w-8.5 h-8.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm hover:scale-105 shrink-0 transition-all text-black dark:text-white group/theme" />
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+10px)] left-0 right-0 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border border-black/10 dark:border-white/20 overflow-hidden rounded-[24px] shadow-2xl"
          >
            <div className="px-5 py-5 flex flex-col space-y-3">
              {NAV_LINKS.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, item.path);
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="text-base font-bold text-black dark:text-white block py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
