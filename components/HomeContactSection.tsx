"use client";

import ContactForm from "./ContactForm";
import { motion } from "framer-motion";

export default function HomeContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start"
      >
        {/* Left Column: Text & Stats */}
        <div className="flex flex-col">
          <p className="text-apple-blue text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            Project Inquiry
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-apple-text dark:text-white leading-[1.1] tracking-tight mb-6">
            Let's discuss your project.
          </h2>
          <p className="text-base sm:text-lg text-apple-subtext dark:text-zinc-400 mb-10 max-w-lg font-medium">
            Complete the brief form below to schedule a consultation. We'll discuss your goals, determine the right video solution, and outline the next steps.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Stat Card 1 */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-xs border border-black/5 dark:border-white/10 flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[13px] text-apple-subtext dark:text-zinc-400 max-w-[100px] leading-tight font-medium">Average delivery time</span>
                <span className="text-[12px] font-bold text-apple-blue">Consistent</span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-apple-text dark:text-white block mb-1">10 <span className="text-2xl">days</span></span>
                <span className="text-[13px] font-medium text-apple-subtext dark:text-zinc-400">per project</span>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-xs border border-black/5 dark:border-white/10 flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[13px] text-apple-subtext dark:text-zinc-400 max-w-[100px] leading-tight font-medium">Satisfaction rate</span>
                <span className="text-[12px] font-bold text-[#34C759]">↑ 18% vs last month</span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-apple-text dark:text-white block mb-1">96%</span>
                <span className="text-[13px] font-bold text-[#34C759]">↑ from last quarter</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full h-full">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-black/5 dark:border-white/10 p-4 sm:p-6">
            <ContactForm />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
