"use client";

import { useState } from 'react';
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
        <div className="mb-16 max-w-2xl">
          <p className="text-apple-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Get in touch
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Let's <span className="text-apple-blue">Talk</span>
          </h1>
          <p className="text-apple-subtext text-lg leading-relaxed">
            Question about a product, something not working, or just want to say hi - we'll get back to you within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="bg-[#34C759]/10 border border-[#34C759]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#34C759] rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(52,199,89,0.5)]">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-apple-subtext">We'll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alex" 
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@email.com" 
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Budget</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $1,000 - $5,000" 
                    className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-apple-blue transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Message</label>
                  <textarea 
                    required
                    placeholder="Tell me what's up..." 
                    rows={6}
                    className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-apple-blue transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="mt-4">
                  <SpotlightButton type="submit" text="SEND MESSAGE" />
                  <p className="text-xs text-white/40 mt-4 ml-2">We'll reply to your email within 48 hours.</p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Info Boxes */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Box 1: Response Time */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 flex flex-col items-start justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-apple-blue shadow-[0_0_10px_rgba(0,122,255,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold text-apple-blue uppercase tracking-[0.2em]">Response Time</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">WITHIN 48 HOURS</h3>
              <p className="text-sm text-white/40">We read every message.</p>
            </div>

            {/* Box 2: Email */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-apple-blue uppercase tracking-[0.2em] mb-1">Email</span>
                <span className="text-sm font-semibold text-white">halftonemotion@gmail.com</span>
              </div>
            </div>

            {/* Box 3: Instagram */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a3 3 0 013 3v11a3 3 0 01-3 3h-11a3 3 0 01-3-3v-11a3 3 0 013-3z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-apple-blue uppercase tracking-[0.2em] mb-1">Instagram</span>
                <span className="text-sm font-semibold text-white">@halftone.motion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
