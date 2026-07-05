"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import LiquidEther from '@/components/Backgrounds/LiquidEther';
import FadeIn from '@/components/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  return (
    <div className="bg-apple-bg h-[100dvh] w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <FadeIn 
        duration={1.5}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        >
          <LiquidEther />
        </div>
      </FadeIn>
      <FadeIn duration={0.8} delay={0.2} className="flex flex-col relative z-10 w-full max-w-lg items-center w-full">
        <motion.div 
          layout
          className={`backdrop-blur-3xl border border-black/5 dark:border-white/5 flex flex-col relative transition-transform duration-500 hover:scale-[1.01] overflow-hidden ${isSuccess ? 'bg-[#34C759] rounded-3xl w-64 h-64 text-white items-center justify-center shadow-[0_20px_80px_-15px_rgba(52,199,89,0.5)]' : 'bg-white/95 dark:bg-[#1C1C1E]/95 rounded-3xl w-full shadow-[0_16px_64px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_16px_64px_-12px_rgba(255,255,255,0.02)]'}`}
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
                <div className="px-6 py-5 border-b border-apple-border text-center">
                  <h1 className="text-2xl font-bold text-apple-text tracking-tight">Apply for a Project</h1>
                </div>

                {/* Form Body */}
                <ContactForm onSuccess={() => setIsSuccess(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </FadeIn>
    </div>
  );
}
