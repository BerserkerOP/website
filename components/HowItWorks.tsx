"use client";

import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Discovery & Intake",
    desc: "Share your brief, brand assets, and UI references through our structured intake form. If you have a script, great. If not, we'll write it together."
  },
  {
    num: "02",
    title: "Storyboard Approval",
    desc: "We build a full storyboard and walk you through it on a short call. You approve every frame before we even start animating. No surprises."
  },
  {
    num: "03",
    title: "Animation & Revisions",
    desc: "We bring your project to life. You get one consolidated round of feedback via timestamped comments to keep things perfectly streamlined."
  },
  {
    num: "04",
    title: "Final Delivery",
    desc: "Your premium motion graphics video is delivered in under 2 weeks, ready to convert browsers into buyers and elevate your brand."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 px-6 lg:px-16 max-w-7xl mx-auto border-t border-apple-border/50 relative overflow-hidden">
      
      <div className="mb-20 text-center max-w-2xl mx-auto relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3"
        >
          Our Process
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-text leading-tight tracking-tight"
        >
          From concept to final render in days.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative bg-apple-card/60 backdrop-blur-2xl rounded-[32px] p-10 border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500 hover:bg-apple-card/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)]"
          >
            {/* Massive Background Number */}
            <div className="absolute -bottom-10 -right-6 text-[180px] font-bold leading-none text-black/[0.02] dark:text-white/[0.02] pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4">
              {step.num}
            </div>

            {/* Glowing Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-apple-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 border border-black/5 dark:border-white/5">
                <span className="text-apple-text font-bold text-lg">{step.num}</span>
              </div>
              <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight group-hover:text-apple-blue transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-apple-subtext text-base leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
