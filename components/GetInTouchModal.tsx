"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GetInTouchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const newErrors: { [key: string]: string } = {};

    if (!name || name.trim() === '') {
      newErrors.name = 'Please enter your name.';
    }
    if (!email || email.trim() === '') {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!message || message.trim() === '') {
      newErrors.message = 'Please enter a message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
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

  const ErrorMessage = ({ message }: { message: string }) => (
    <AnimatePresence>
      {message && (
        <motion.p 
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          className="text-[#FF3B30] text-xs font-medium flex items-center gap-1.5 mt-1.5 ml-1 overflow-hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );

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

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue'} focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm`}
                      />
                      <ErrorMessage message={errors.name} />
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
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue'} focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm`}
                      />
                      <ErrorMessage message={errors.email} />
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
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue'} focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-white dark:bg-[#2C2C2E] text-apple-text text-sm resize-none`}
                      />
                      <ErrorMessage message={errors.message} />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full bg-[#007AFF] hover:bg-[#007AFF]/90 hover:shadow-[0_8px_25px_-5px_rgba(0,122,255,0.6)] hover:-translate-y-0.5 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
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
