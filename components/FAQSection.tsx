"use client";

import { useState, useEffect } from "react";
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
      question: "How long does a typical project take?",
      answer: "A standard 60-second animated video takes 3 to 5 weeks to produce. We map out all milestones upfront so you know exactly when to expect script drafts, storyboards, and animated previews."
    },
    {
      number: "02",
      question: "How does your onboarding and production process work?",
      answer: "After a 50% deposit, you fill out a brief intake form sharing your brand assets, UI designs (Figma links), and reference videos. We design a full storyboard, write/refine the script with you, animate, produce custom soundscapes, and deliver the final 4K files with one included revision round."
    },
    {
      number: "03",
      question: "Can motion graphics actually improve our conversion rates?",
      answer: "Yes. Viewers retain 95% of a message via video compared to just 10% in text. Over 93% of marketers report increased brand awareness, and adding custom product animations makes abstract MVPs tangible, directly driving higher signups."
    },
    {
      number: "04",
      question: "Do you offer white-label services for agencies?",
      answer: "Yes. We partner with marketing, branding, and ad agencies as a silent production partner. All projects are protected by NDAs and ship under your brand name with zero attribution."
    },
    {
      number: "05",
      question: "What does the production process look like?",
      answer: "We follow a strict pipeline: Discovery -> Scripting -> Storyboard & Style Frames -> Animation -> Sound Design -> Delivery. Animation only begins once the storyboard is locked, ensuring there are no surprises at final delivery."
    },
    {
      number: "06",
      question: "How many revisions are included?",
      answer: "Two revision rounds are included on every project. You review the drafts via Frame.io, leave timestamped comments, and we apply your updates. Additional revision rounds are available for a flat fee."
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        const index = faqs.findIndex(item => item.number === q);
        if (index !== -1) {
          setOpenIndex(index);
          // Wait slightly for layout/render to complete before scrolling
          setTimeout(() => {
            const el = document.getElementById(`faq-item-${q}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 250);
        }
      }
    }
  }, []);

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
              id={`faq-item-${faq.number}`}
              className="border-b border-black/10 dark:border-white/10 scroll-mt-24"
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
