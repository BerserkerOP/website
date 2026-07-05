"use client";

import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 px-6 lg:px-16 max-w-7xl mx-auto bg-apple-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">
        
        {/* Left Column: Text & Stats */}
        <div className="flex flex-col">
          <p className="text-apple-blue text-sm font-bold uppercase tracking-widest mb-4">
            Apply to work with us
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-apple-text leading-[1.1] tracking-tight mb-6">
            Let's talk about your project.
          </h2>
          <p className="text-lg text-apple-subtext mb-12 max-w-lg">
            Fill out a quick form and book a time directly. We will walk through your goals, the type of video you need, and what the process looks like from there.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[13px] text-apple-subtext max-w-[100px] leading-tight">Average delivery time</span>
                <span className="text-[12px] font-medium text-apple-subtext">Consistent</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-apple-text block mb-1">10 <span className="text-2xl">days</span></span>
                <span className="text-[13px] font-medium text-apple-subtext">per project</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[13px] text-apple-subtext max-w-[100px] leading-tight">Satisfaction rate</span>
                <span className="text-[12px] font-medium text-[#34C759]">↑ 18% vs last month</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-apple-text block mb-1">96%</span>
                <span className="text-[13px] font-medium text-[#34C759]">↑ from last quarter</span>
              </div>
            </div>


          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full h-full lg:pl-10">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-black/5 dark:border-white/5 p-2 sm:p-4">
            <ContactForm />
          </div>
        </div>

      </div>
    </section>
  );
}
