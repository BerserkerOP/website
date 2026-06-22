"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const budgets = ["$200 - $500", "$500 - $800", "$800 - $1500", "$1500 - $3000", "$3000+"];
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      className="p-5 flex flex-col gap-4 overflow-y-auto"
      noValidate
      onSubmit={handleSubmit}
    >
      {/* FormSubmit Config */}
      <input type="hidden" name="_subject" value="New Project Application!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://halftonemotion.vercel.app/" />

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
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.name ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-apple-border focus:border-apple-blue focus:ring-apple-blue'} focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text text-sm`}
        />
        <ErrorMessage message={errors.name} />
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
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.email ? 'border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-apple-border focus:border-apple-blue focus:ring-apple-blue'} focus:ring-1 outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text text-sm`}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-apple-text">
          Budget <span className="text-apple-blue">*</span>
        </label>
        
        {/* Apple UI Inspired Segmented Control Grid */}
        <div className="grid grid-cols-2 gap-2">
          {budgets.map(b => (
            <label key={b} className="relative cursor-pointer group">
              <input type="radio" name="budget" value={b} onChange={handleChange} className="peer sr-only" required />
              <div className={`rounded-xl border ${errors.budget ? 'border-[#FF3B30]/50' : 'border-apple-border'} px-3 py-2.5 text-center transition-all peer-checked:border-apple-blue peer-checked:bg-apple-blue/10 peer-checked:text-apple-blue group-hover:border-apple-gray text-apple-text text-sm font-medium shadow-sm peer-checked:shadow-apple-blue/20`}>
                {b}
              </div>
            </label>
          ))}
        </div>
        <ErrorMessage message={errors.budget} />
        
        <div className="mt-1 text-[12px] text-zinc-500 leading-relaxed space-y-4">
          <p>Qualified projects will be directed to our scheduling page.</p>
        </div>
      </div>

      {submitError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[13px] font-medium text-center">
          Oops! Something went wrong submitting the form.
        </div>
      )}

      <button 
        type="submit"
        disabled={isSubmitting}
        className="mt-2 shrink-0 w-full bg-apple-blue text-white font-bold py-3 rounded-xl hover:bg-apple-blue-hover transition-colors shadow-sm active:scale-[0.98] text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
