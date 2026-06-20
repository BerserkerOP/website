"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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
              <form 
                action="https://formsubmit.co/atharvasharma1002006@gmail.com" 
                method="POST"
                className="p-6 flex flex-col gap-6"
              >
                {/* FormSubmit Config */}
                <input type="hidden" name="_subject" value="New Project Application!" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-apple-text">
                    Full Name <span className="text-apple-blue">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-apple-text">
                    Email <span className="text-apple-blue">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm font-bold text-apple-text">
                    Budget <span className="text-apple-blue">*</span>
                  </label>
                  <select 
                    id="budget"
                    name="budget"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all bg-transparent text-apple-text appearance-none"
                  >
                    <option value="" disabled selected>Select...</option>
                    <option value="< $200">&lt; $200</option>
                    <option value="$200 - $500">$200 - $500</option>
                    <option value="$500 - $800">$500 - $800</option>
                    <option value="$800 - $1500">$800 - $1500</option>
                    <option value="$1500 - $3000">$1500 - $3000</option>
                    <option value="$3000+">$3000+</option>
                  </select>
                  
                  <div className="mt-2 text-[13px] text-zinc-500 leading-relaxed space-y-4">
                    <p>Qualified projects will be directed to my scheduling page. Please use the same email to ensure seamless communication.</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="mt-2 w-full bg-apple-blue text-white font-bold py-3.5 rounded-xl hover:bg-apple-blue-hover transition-colors shadow-sm active:scale-[0.98]"
                >
                  Apply for a Project
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
