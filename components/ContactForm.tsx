"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const budgets = ["$350 - $500", "$500 - $800", "$800 - $1500", "$1500 - $3000", "$3000+"];
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
    const description = formData.get('description') as string;

    const newErrors: { [key: string]: string } = {};

    if (!name || name.trim() === '') {
      newErrors.name = 'Please enter your full name.';
    }
    if (!email || email.trim() === '') {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!budget) {
      newErrors.budget = 'Please select an estimated budget.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(false);

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
            budget,
            description,
            _subject: "New Project Application!"
        })
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
    setSubmitError(false);
  };

  const ErrorMessage = ({ message }: { message: string }) => (
    <AnimatePresence>
      {message && (
        <motion.p 
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          className="text-[#FF3B30] text-[13px] font-medium flex items-center gap-1.5 mt-1.5 ml-1 overflow-hidden"
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
    <form 
      className="p-4 flex flex-col gap-3 overflow-y-auto"
      noValidate
      onSubmit={handleSubmit}
    >
      {/* FormSubmit Config */}
      <input type="hidden" name="_subject" value="New Project Application!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://halftonemotion.vercel.app/" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[13px] font-bold text-apple-text dark:text-white">
          Full Name <span className="text-apple-blue">*</span>
        </label>
        <input 
          type="text" 
          id="name"
          name="name"
          required
          placeholder="Your name"
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-xl border ${errors.name ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20 bg-white dark:bg-[#1C1C1E]' : 'border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue bg-white/70 dark:bg-black/40'} focus:ring-1 outline-none transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-apple-text dark:text-white text-[13px] backdrop-blur-md`}
        />
        <ErrorMessage message={errors.name} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13px] font-bold text-apple-text dark:text-white">
          Email <span className="text-apple-blue">*</span>
        </label>
        <input 
          type="email" 
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-xl border ${errors.email ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20 bg-white dark:bg-[#1C1C1E]' : 'border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue bg-white/70 dark:bg-black/40'} focus:ring-1 outline-none transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-apple-text dark:text-white text-[13px] backdrop-blur-md`}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-apple-text dark:text-white">
          Budget <span className="text-apple-blue">*</span>
        </label>
        
        {/* Styled Dropdown Menu */}
        <div className="relative">
          <input type="hidden" name="budget" value={selectedBudget} />
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full px-3 py-2 pr-10 rounded-xl border ${errors.budget ? 'border-[#FF3B30] bg-white dark:bg-[#1C1C1E]' : 'border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40'} ${isDropdownOpen ? 'border-apple-blue ring-1 ring-apple-blue' : 'focus:border-apple-blue focus:ring-apple-blue focus:ring-1'} outline-none transition-all text-[13px] backdrop-blur-md cursor-pointer flex items-center justify-between`}
            tabIndex={0}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}
          >
            <span className={selectedBudget ? 'text-apple-text dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}>
              {selectedBudget || 'Select your budget'}
            </span>
            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
              <svg className="w-4 h-4 text-apple-text/50 dark:text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </motion.div>
          </div>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white/90 dark:bg-[#2A2A2E]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl py-1.5 shadow-2xl overflow-hidden"
              >
                {budgets.map(b => (
                  <div 
                    key={b}
                    onClick={() => {
                      setSelectedBudget(b);
                      setIsDropdownOpen(false);
                      if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
                    }}
                    className={`px-4 py-2 text-[13px] cursor-pointer transition-colors ${selectedBudget === b ? 'bg-apple-blue/10 text-apple-blue font-bold' : 'text-apple-text dark:text-white hover:bg-black/5 dark:hover:bg-white/10'} mx-1.5 rounded-lg my-0.5 flex items-center justify-between`}
                  >
                    {b}
                    {selectedBudget === b && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ErrorMessage message={errors.budget} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-[13px] font-bold text-apple-text dark:text-white flex justify-between items-center">
          <span>Project Description</span>
          <span className="text-apple-subtext font-normal text-[11px] uppercase tracking-wider">Optional</span>
        </label>
        <textarea 
          id="description"
          name="description"
          placeholder="Topic name and what the project is about..."
          rows={2}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 focus:border-apple-blue focus:ring-apple-blue focus:ring-1 outline-none transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-400 bg-white/70 dark:bg-black/40 text-apple-text dark:text-white text-[13px] resize-none backdrop-blur-md`}
        />
      </div>

      {submitError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[13px] font-medium text-center">
          Oops! Something went wrong submitting the form.
        </div>
      )}

      <button 
        type="submit"
        disabled={isSubmitting}
        className="mt-1 shrink-0 w-full bg-apple-blue text-white font-bold py-2.5 rounded-xl hover:bg-[#007AFF]/90 hover:shadow-[0_8px_25px_-5px_rgba(0,122,255,0.6)] hover:-translate-y-0.5 transition-all active:scale-[0.98] text-[13px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : 'Apply for a Project'}
      </button>
    </form>
  );
}
