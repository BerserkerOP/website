"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import SpotlightButton from '@/components/SpotlightButton';

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // Add real form submission logic here if needed
  };

  return (
    <div className="bg-apple-bg min-h-screen w-full pt-32 pb-20 px-6 lg:px-16 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-apple-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Get in touch
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-apple-text dark:text-white tracking-tight mb-6">
            Let's <span className="text-apple-blue drop-shadow-[0_0_15px_rgba(0,122,255,0.4)]">Talk</span>
          </h1>
          <p className="text-apple-subtext text-lg leading-relaxed font-medium">
            Question about a product, something not working, or just want to say hi, we'll get back to you within 48 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#34C759]/10 border border-[#34C759]/20 rounded-[32px] p-12 flex flex-col items-center justify-center text-center shadow-lg"
              >
                <div className="w-20 h-20 bg-[#34C759] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,199,89,0.5)]">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-3xl text-apple-text dark:text-white mb-3">Message Sent!</h3>
                <p className="text-apple-subtext text-lg">We'll get back to you within 48 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alex" 
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-apple-blue transition-all backdrop-blur-md shadow-inner"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@email.com" 
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-apple-blue transition-all backdrop-blur-md shadow-inner"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Budget</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $1,000 - $5,000" 
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-apple-blue transition-all backdrop-blur-md shadow-inner"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Message</label>
                  <textarea 
                    required
                    placeholder="Tell me what's up..." 
                    rows={6}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-apple-blue transition-all backdrop-blur-md shadow-inner resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="mt-6">
                  <SpotlightButton type="submit" text="SEND MESSAGE" />
                  <p className="text-xs text-apple-subtext mt-4 ml-2 font-medium">We'll reply to your email within 48 hours.</p>
                </div>
              </form>
            )}
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Box 1: Response Time */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, x: 1, scale: 1.01, boxShadow: "0 12px 24px -10px rgba(0, 122, 255, 0.3)", borderColor: "rgba(0, 122, 255, 0.4)" }} 
              transition={{ 
                x: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: 0.3 },
                type: 'spring', stiffness: 400, damping: 25 
              }}
              className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-8 flex flex-col items-start justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] cursor-default"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-apple-blue shadow-[0_0_12px_rgba(0,122,255,1)] animate-pulse" />
                <span className="text-[11px] font-bold text-apple-blue uppercase tracking-[0.2em]">Response Time</span>
              </div>
              <h3 className="text-2xl font-bold text-apple-text dark:text-white mb-2 tracking-tight">WITHIN 48 HOURS</h3>
              <p className="text-sm font-medium text-apple-text/60 dark:text-white/50">We read every message.</p>
            </motion.div>

            {/* Box 2: Email */}
            <motion.a 
              href="mailto:halftonemotion@gmail.com"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, x: 1, scale: 1.01, boxShadow: "0 12px 24px -10px rgba(0, 122, 255, 0.3)", borderColor: "rgba(0, 122, 255, 0.4)" }} 
              whileTap={{ x: 6, y: -2, scale: 0.98 }}
              transition={{ 
                x: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: 0.4 },
                type: 'spring', stiffness: 400, damping: 25 
              }}
              className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:text-apple-blue transition-colors">
                <svg className="w-6 h-6 text-apple-text/70 dark:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-apple-blue uppercase tracking-[0.2em]">Email</span>
                <span className="text-sm font-bold text-apple-text dark:text-white tracking-wide">halftonemotion@gmail.com</span>
              </div>
            </motion.a>

            {/* Box 3: Instagram */}
            <motion.a 
              href="https://instagram.com/atharvf.x"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, x: 1, scale: 1.01, boxShadow: "0 12px 24px -10px rgba(0, 122, 255, 0.3)", borderColor: "rgba(0, 122, 255, 0.4)" }} 
              whileTap={{ x: 6, y: -2, scale: 0.98 }}
              transition={{ 
                x: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: 0.5 },
                type: 'spring', stiffness: 400, damping: 25 
              }}
              className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-apple-text/70 dark:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a3 3 0 013 3v11a3 3 0 01-3 3h-11a3 3 0 01-3-3v-11a3 3 0 013-3z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-apple-blue uppercase tracking-[0.2em]">Instagram</span>
                <span className="text-sm font-bold text-apple-text dark:text-white tracking-wide">@atharvf.x</span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
