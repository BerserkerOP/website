"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FloatingContactButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only display the button after scroll or after mount
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide completely on the contact page
  if (pathname === '/contact') {
    return null;
  }

  const handleClick = () => {
    window.location.hash = 'contact';
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 bg-[#007AFF] text-white font-bold text-sm rounded-full px-5 py-3 shadow-[0_10px_30px_rgba(0,122,255,0.4),0_0_15px_rgba(0,122,255,0.2)] hover:bg-[#007AFF]/95 flex items-center justify-center gap-2 cursor-pointer transition-colors border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Apply for a Project</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
