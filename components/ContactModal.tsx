"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check hash on mount and when it changes
    const checkHash = () => {
      if (window.location.hash === '#contact') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const closeModal = () => {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="bg-apple-card rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-apple-border">
                <h2 className="text-xl font-bold text-apple-text">Apply for a Project</h2>
                <button 
                  onClick={closeModal}
                  className="p-2 -mr-2 text-apple-subtext hover:text-apple-text transition-colors rounded-full hover:bg-apple-gray"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body */}
              <ContactForm />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
