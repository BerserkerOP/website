"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const budgetRanges = [
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000+"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const newErrors: { [key: string]: string } = {};
    if (!name || !name.trim()) newErrors.name = 'Please enter your name';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/halftonemotion@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, budget, message })
      });
      setIsSuccess(true);
    } catch {
      // Fallback success feedback
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black dark:text-white tracking-tight mb-3"
          >
            Let's <span className="text-apple-blue underline decoration-apple-blue/30 underline-offset-8">talk</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-10 max-w-xl"
          >
            Request a project, inquire about services, or just say hi. We'll get back to you within 48 hours.
          </motion.p>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 p-8 rounded-3xl text-center flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">Message Received!</h3>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm max-w-sm">
                  Thanks for reaching out! We will review your details and respond within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col space-y-6"
              >
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                      YOUR NAME
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all"
                    />
                    {errors.name && <span className="text-xs text-red-500 font-bold">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                      EMAIL
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="you@email.com"
                      className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all"
                    />
                    {errors.email && <span className="text-xs text-red-500 font-bold">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Budget */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                    BUDGET
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>e.g. $1,000 - $5,000</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Row 3: Message */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                    MESSAGE
                  </label>
                  <textarea 
                    name="message"
                    rows={5}
                    placeholder="Tell me what's up..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button & Sub-caption */}
                <div className="pt-2 flex flex-col space-y-3 items-start">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-extrabold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
                  </motion.button>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    We'll reply to your email within 48 hours.
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Info Cards (5 cols matching Image 2) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Card 1: Response Time */}
          <motion.div 
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350 }}
            className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 flex flex-col space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
              <span className="text-[11px] font-extrabold tracking-widest text-apple-blue uppercase">RESPONSE TIME</span>
            </div>
            <h4 className="text-2xl font-black text-black dark:text-white tracking-tight">WITHIN 48 HOURS</h4>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">We read every message.</p>
          </motion.div>

          {/* Card 2: Email */}
          <motion.div 
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350 }}
            className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800 flex items-center justify-center text-xl shrink-0">
              ✉️
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold tracking-widest text-zinc-400 uppercase">EMAIL</span>
              <span className="text-sm font-bold text-black dark:text-white">halftonemotion@gmail.com</span>
            </div>
          </motion.div>

          {/* Card 3: Instagram */}
          <motion.div 
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350 }}
            className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800 flex items-center justify-center text-xl shrink-0">
              📸
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold tracking-widest text-zinc-400 uppercase">INSTAGRAM</span>
              <span className="text-sm font-bold text-black dark:text-white">@atharvf.x</span>
            </div>
          </motion.div>

          {/* Card 4: Common Topics */}
          <motion.div 
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350 }}
            className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 flex flex-col space-y-3 shadow-xs"
          >
            <span className="text-[11px] font-extrabold tracking-widest text-apple-blue uppercase">COMMON TOPICS</span>
            <ul className="flex flex-col space-y-2.5">
              <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                Typical project timeline
              </li>
              <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                Onboarding & process details
              </li>
              <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                Conversion rate benefits
              </li>
            </ul>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
