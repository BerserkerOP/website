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
    },
    {
      number: "07",
      question: "How do I install plugins or presets?",
      answer: "All our plugins and presets come with a detailed PDF installation guide. Generally, you just copy the plugin folder into your host application’s extensions folder (e.g., After Effects extensions). If you need direct assistance, contact support."
    },
    {
      number: "08",
      question: "What should I do if a product or preset isn't working as expected?",
      answer: "Please ensure your host application is updated to the required version specified on the product page. If it still fails, email us at halftonemotion@gmail.com with your system specs and a screenshot or screen recording of the error."
    },
    {
      number: "09",
      question: "What is your refund policy?",
      answer: "Due to the digital nature of our products (downloadable templates and presets), all sales are final and we generally do not offer refunds. However, if a product is corrupt or defective, please contact support and we will resolve it."
    },
    {
      number: "10",
      question: "What are the licensing terms for your presets and templates?",
      answer: "Every purchase includes a single-user commercial license. You can use our templates and presets in unlimited personal and commercial client projects. Sharing, reselling, or redistributing the source assets is strictly prohibited."
    },
    {
      number: "11",
      question: "Do you offer custom motion design work or collaborations?",
      answer: "Yes, we collaborate with creators, agencies, and brands for custom motion design assets, templates, and branding. Please fill out our contact form or email us directly at halftonemotion@gmail.com with details."
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
