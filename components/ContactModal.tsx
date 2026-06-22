"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setTimeout(() => setIsSuccess(false), 500); // Reset success state after closing
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
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className={`shadow-2xl pointer-events-auto overflow-hidden flex flex-col ${isSuccess ? 'bg-[#34C759] rounded-3xl w-64 h-64 text-white items-center justify-center' : 'bg-apple-card rounded-2xl w-full max-w-md max-h-[85vh]'}`}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative"
                  >
                    <button 
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-black/10"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3, bounce: 0.5 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg"
                    >
                      <svg className="w-8 h-8 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Success!</h3>
                    <p className="text-sm text-white/90 font-medium">Your application has been received.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex flex-col w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-apple-border shrink-0">
                      <h2 className="text-lg font-bold text-apple-text">Apply for a Project</h2>
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
                    <ContactForm onSuccess={() => setIsSuccess(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
