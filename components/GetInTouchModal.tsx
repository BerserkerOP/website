"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GetInTouchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch("https://formsubmit.co/ajax/halftonemotion@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            message,
            _subject: "New Question / Get in touch!"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-apple-text transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-[#34C759]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-2xl text-apple-text mb-2">Message Sent</h3>
                  <p className="text-apple-subtext font-medium">We'll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-apple-blue text-xs font-bold uppercase tracking-widest mb-1">
                      CONTACT
                    </p>
                    <h2 className="text-3xl font-bold text-apple-text tracking-tight">
                      Get in touch
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-name" className="text-sm font-bold text-apple-text">
                        Name
                      </label>
                      <input 
                        type="text" 
                        id="modal-name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-email" className="text-sm font-bold text-apple-text">
                        Email
                      </label>
                      <input 
                        type="email" 
                        id="modal-email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-message" className="text-sm font-bold text-apple-text">
                        Message
                      </label>
                      <textarea 
                        id="modal-message"
                        name="message"
                        required
                        placeholder="Tell us what you have in mind..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-bold py-3.5 rounded-xl transition-colors active:scale-[0.98] text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
