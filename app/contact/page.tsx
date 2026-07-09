"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SpotlightButton from '@/components/SpotlightButton';

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const budgets = ["$350 - $500", "$500 - $800", "$800 - $1500", "$1500 - $3000", "$3000+"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
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
    if (!budget) {
      newErrors.budget = 'Please select a budget range.';
    }
    if (!message || message.trim() === '') {
      newErrors.message = 'Please tell us what you need help with.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);
    // Add real form submission logic here if needed
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const ErrorMessage = ({ message }: { message: string }) => {
    if (!message) return null;
    return (
      <motion.p 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#FF3B30] text-xs font-bold mt-1.5 ml-1 flex items-center gap-1.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
        {message}
      </motion.p>
    );
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
            Request a project, inquire about how we work, or just say hi. We'll get back to you within 48 hours.
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
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="e.g. Alex" 
                      onChange={handleChange}
                      className={`w-full bg-black/5 dark:bg-white/5 border ${errors.name ? 'border-[#FF3B30] focus:border-[#FF3B30]' : 'border-black/10 dark:border-white/10 focus:border-apple-blue'} rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none transition-all backdrop-blur-md shadow-inner`}
                    />
                    <ErrorMessage message={errors.name} />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="you@email.com" 
                      onChange={handleChange}
                      className={`w-full bg-black/5 dark:bg-white/5 border ${errors.email ? 'border-[#FF3B30] focus:border-[#FF3B30]' : 'border-black/10 dark:border-white/10 focus:border-apple-blue'} rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none transition-all backdrop-blur-md shadow-inner`}
                    />
                    <ErrorMessage message={errors.email} />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Budget</label>
                  <div className="relative">
                    <input type="hidden" name="budget" value={selectedBudget} />
                    <div 
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
                      }}
                      className={`w-full px-5 py-4 pr-12 rounded-2xl border ${errors.budget ? 'border-[#FF3B30]' : isDropdownOpen ? 'border-apple-blue' : 'border-black/10 dark:border-white/10'} bg-black/5 dark:bg-white/5 transition-all text-apple-text dark:text-white backdrop-blur-md shadow-inner cursor-pointer flex items-center justify-between`}
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      <span className={selectedBudget ? 'text-apple-text dark:text-white' : 'text-black/30 dark:text-white/30'}>
                        {selectedBudget || 'e.g. $1,000 - $5,000'}
                      </span>
                      <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <svg className="w-5 h-5 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </motion.div>
                    </div>
                    
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white/95 dark:bg-[#2A2A2E]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl py-2 shadow-2xl overflow-hidden"
                      >
                        {budgets.map(b => (
                          <div 
                            key={b}
                            onClick={() => {
                              setSelectedBudget(b);
                              setIsDropdownOpen(false);
                              if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
                            }}
                            className={`px-5 py-3 cursor-pointer transition-colors ${selectedBudget === b ? 'bg-apple-blue/10 text-apple-blue font-bold' : 'text-apple-text dark:text-white hover:bg-black/5 dark:hover:bg-white/10'} mx-2 rounded-xl my-1 flex items-center justify-between`}
                          >
                            {b}
                            {selectedBudget === b && (
                              <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <ErrorMessage message={errors.budget} />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-apple-text/60 dark:text-white/50 uppercase tracking-[0.15em]">Message</label>
                  <textarea 
                    name="message"
                    placeholder="Tell me what's up..." 
                    rows={6}
                    onChange={handleChange}
                    className={`w-full bg-black/5 dark:bg-white/5 border ${errors.message ? 'border-[#FF3B30] focus:border-[#FF3B30]' : 'border-black/10 dark:border-white/10 focus:border-apple-blue'} rounded-2xl px-5 py-4 text-apple-text dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none transition-all backdrop-blur-md shadow-inner resize-none`}
                  ></textarea>
                  <ErrorMessage message={errors.message} />
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

            {/* Box 4: YouTube */}
            <motion.a 
              href="https://www.youtube.com/channel/UCh5P2qR4MUeahOXECT5pm-Q"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, x: 1, scale: 1.01, boxShadow: "0 12px 24px -10px rgba(0, 122, 255, 0.3)", borderColor: "rgba(0, 122, 255, 0.4)" }} 
              whileTap={{ x: 6, y: -2, scale: 0.98 }}
              transition={{ 
                x: { duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: 0.55 },
                type: 'spring', stiffness: 400, damping: 25 
              }}
              className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-apple-text/70 dark:text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-apple-blue uppercase tracking-[0.2em]">YouTube</span>
                <span className="text-sm font-bold text-apple-text dark:text-white tracking-wide">@halftonemotion</span>
              </div>
            </motion.a>

            {/* Box 5: Common Topics */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, x: 1, scale: 1.01, boxShadow: "0 12px 24px -10px rgba(48, 209, 88, 0.2)", borderColor: "rgba(48, 209, 88, 0.3)" }} 
              transition={{ 
                x: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: 0.6 },
                type: 'spring', stiffness: 400, damping: 25 
              }}
              className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] cursor-default"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold text-[#30D158] uppercase tracking-[0.2em]">Common Topics</span>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  { text: "Plugin installation help", link: "/faq?q=07" },
                  { text: "Product not working as expected", link: "/faq?q=08" },
                  { text: "Refund request", link: "/faq?q=09" },
                  { text: "Licensing question", link: "/faq?q=10" },
                  { text: "Collab or custom work", link: "/faq?q=11" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 py-1 border-b border-black/[0.05] dark:border-white/[0.05] last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] shrink-0" />
                    <Link href={item.link} className="text-sm font-semibold text-apple-text/80 dark:text-white/80 hover:text-[#30D158] dark:hover:text-[#30D158] transition-colors hover:underline">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
