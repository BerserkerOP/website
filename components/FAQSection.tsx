"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      number: "01",
      question: "What types of videos does HalftoneMotion produce?",
      answer: "We specialize in premium SaaS walkthroughs, high-converting explainer videos, cinematic landing page animations, and micro-content for social channels. Every video is custom-crafted to elevate your visual identity."
    },
    {
      number: "02",
      question: "How long does a typical project take?",
      answer: "A standard video takes 1 to 2 weeks at most. Our pipeline goes from briefing, scripting, and storyboarding, to custom style frames, animation, and sound design. We align on key milestones upfront so you know exactly what is happening."
    },
    {
      number: "03",
      question: "How does your onboarding and production process work?",
      answer: "After your 50% deposit, we send a direct intake form where you share your brief, brand assets, and design references (like Figma links). We then construct a visual storyboard and custom style frames. Once approved, we animate, design the soundscape, and deliver the final files."
    },
    {
      number: "04",
      question: "How many revision rounds are included?",
      answer: "We include one major, comprehensive revision round on the final animation. Because we lock in the script, storyboards, and style frames in the initial stages, major changes are rarely necessary at the end."
    },
    {
      number: "05",
      question: "Do you offer white-label services for agencies?",
      answer: "Absolutely. We partner with ad agencies, marketing firms, and product studios as a white-label production engine. All work ships under your brand with complete NDA protection and zero attribution."
    },
    {
      number: "06",
      question: "Do you work with startups, or only large companies?",
      answer: "We work with brands at all stages. We help early-stage startups communicate their MVP clearly to investors and users, and we help enterprise teams explain complex product updates."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-32 px-6 lg:px-16 max-w-5xl mx-auto bg-apple-bg border-t border-black/5 dark:border-white/5">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-apple-blue/10 border border-apple-blue/20">
          <p className="text-apple-blue text-xs font-bold uppercase tracking-widest">Questions</p>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-apple-text dark:text-white tracking-tight">
          FAQ
        </h2>
      </div>

      <div className="flex flex-col border-t border-black/10 dark:border-white/10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border-b border-black/10 dark:border-white/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-200"
              >
                <div className="flex items-center gap-4 pr-4">
                  <span className="text-xs sm:text-sm font-mono font-bold text-apple-subtext/50 group-hover:text-apple-blue transition-colors">
                    {faq.number}
                  </span>
                  <span className="text-base sm:text-[17px] font-bold text-apple-text dark:text-white group-hover:text-apple-blue transition-colors leading-snug">
                    {faq.question}
                  </span>
                </div>

                <div className="shrink-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-apple-blue/10 transition-colors">
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-4 h-4 text-apple-subtext dark:text-white/60 group-hover:text-apple-blue transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 pb-6 pr-12 text-sm sm:text-[15px] leading-relaxed text-apple-subtext dark:text-white/70 font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
