"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We begin with a deep dive into your brand, audience, and goals. Whether you have a script ready or need us to write one from scratch, we establish the core narrative before moving forward."
  },
  {
    num: "02",
    title: "Storyboarding",
    desc: "We craft a comprehensive frame-by-frame storyboard. This allows you to visualize the flow, pacing, and visual direction, ensuring we are perfectly aligned before any design work begins."
  },
  {
    num: "03",
    title: "Design & Asset Creation",
    desc: "Our designers build out the custom illustrations, UI mockups, and typography that will define your video. You approve the final visual style, guaranteeing it matches your brand identity perfectly."
  },
  {
    num: "04",
    title: "Animation & Motion",
    desc: "This is where the magic happens. We bring the approved assets to life with buttery-smooth motion design and sound effects. You get consolidated feedback rounds via timestamped comments."
  },
  {
    num: "05",
    title: "Final Delivery",
    desc: "After final polishing and quality assurance, your premium motion graphics video is rendered and delivered in multiple formats, ready to captivate your audience and elevate your brand."
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 items-start">
        
        {/* Left Column: Interactive List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left rounded-2xl px-6 py-5 transition-all duration-300 focus:outline-none flex items-center gap-4 border ${
                  isActive 
                    ? 'bg-apple-blue shadow-lg shadow-apple-blue/20 border-transparent' 
                    : 'bg-apple-card/40 backdrop-blur-sm border-black/5 dark:border-white/5 hover:bg-apple-card/80 hover:border-black/10 dark:hover:border-white/10'
                }`}
              >
                <span 
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-inner' 
                      : 'bg-apple-blue/10 text-apple-blue dark:bg-white/5 dark:text-white/60'
                  }`}
                >
                  {step.num}
                </span>
                <h3 
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-apple-text'
                  }`}
                >
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Card Display */}
        <div className="lg:col-span-7 relative h-full min-h-[300px] lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0 w-full h-fit bg-apple-card/80 backdrop-blur-2xl rounded-[32px] p-10 lg:p-14 border border-black/5 dark:border-white/5 overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)]"
            >
              {/* Massive Background Number */}
              <div className="absolute -bottom-10 -right-6 text-[220px] font-bold leading-none bg-gradient-to-br from-black/10 to-transparent dark:from-white/10 dark:to-transparent bg-clip-text text-transparent pointer-events-none select-none">
                {steps[activeStep].num}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-[14px] bg-apple-blue/10 dark:bg-apple-blue/20 flex items-center justify-center mb-8">
                  <span className="text-apple-blue font-bold text-2xl">{steps[activeStep].num}</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-apple-blue mb-6 tracking-tight">
                  {steps[activeStep].title}
                </h3>
                
                <p className="text-apple-text text-lg leading-relaxed font-medium max-w-xl">
                  {steps[activeStep].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
