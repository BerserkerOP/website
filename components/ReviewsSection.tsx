"use client";

import { motion } from 'framer-motion';

const reviews = [
  {
    headline: "Game-changing quality",
    text: "The dynamic lyric visualizer completely transformed my new single's release. The energy is unmatched and the team is incredibly professional. I've never seen my music brought to life this way.",
    name: "Jane Doe",
    role: "Indie Artist"
  },
  {
    headline: "Perfect for our SaaS",
    text: "Our product demo finally makes sense to our users. HalftoneMotion nailed the cinematic vibe we were looking for. The conversion rates on our landing page have skyrocketed since we added the video.",
    name: "John Smith",
    role: "Founder & CEO"
  },
  {
    headline: "Incredible attention to detail",
    text: "The onboarding sequence increased our user retention by 30%. Their attention to detail, smooth motion design, and quick turnaround times make them the absolute best in the business.",
    name: "Sarah Jenkins",
    role: "Product Manager"
  }
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto border-t border-apple-border/50">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <p className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">Client Feedback</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-text leading-tight tracking-tight">Loved by creators and founders</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-apple-card rounded-[24px] p-8 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative overflow-hidden group"
          >
            {/* Subtle Gradient Glow inside the card */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-apple-blue/10 blur-3xl group-hover:bg-apple-blue/20 transition-colors duration-500 pointer-events-none" />
            
            <StarRating />
            
            <h3 className="text-lg font-bold text-apple-text mb-3 tracking-tight">"{review.headline}"</h3>
            
            <p className="text-[15px] leading-relaxed text-apple-subtext mb-8 flex-1">
              {review.text}
            </p>
            
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-sm shrink-0">
                {review.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-apple-text">{review.name}</span>
                <span className="text-xs text-apple-subtext font-medium">{review.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
