"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Code, CheckCircle2, Linkedin, Laptop } from 'lucide-react';

export default function Experiments() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@kritikasharma.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const daysData = [
    {
      id: 1,
      title: "Kairo Productivity Hub",
      description: "MacOST app now available. Meet the new way to Get Things Done.",
      bgColor: "bg-zinc-950 text-white",
      tagColor: "bg-pink-600",
      logo: "Kairo"
    },
    {
      id: 2,
      title: "Vesper Workspace Engine",
      description: "Collaborative canvas for distributed engineering teams.",
      bgColor: "bg-blue-900 text-white",
      tagColor: "bg-yellow-500",
      logo: "Vesper"
    },
    {
      id: 3,
      title: "Oasis Mindfulness App",
      description: "Daily breathing routines and physical feedback integrations.",
      bgColor: "bg-emerald-950 text-emerald-100",
      tagColor: "bg-emerald-500",
      logo: "Oasis"
    },
    {
      id: 4,
      title: "Aura Audio Interface",
      description: "Dynamic soundscapes matching browser performance parameters.",
      bgColor: "bg-violet-950 text-violet-100",
      tagColor: "bg-purple-500",
      logo: "Aura"
    },
    {
      id: 5,
      title: "Chronos Calendar widget",
      description: "Minimal scheduling grid with multi-zone support.",
      bgColor: "bg-amber-900 text-amber-50",
      tagColor: "bg-orange-600",
      logo: "Chronos"
    },
    {
      id: 6,
      title: "Zephyr Analytics board",
      description: "Vector charts mapping user behavior in real time.",
      bgColor: "bg-slate-900 text-white",
      tagColor: "bg-cyan-500",
      logo: "Zephyr"
    },
    {
      id: 7,
      title: "Nova Design System core",
      description: "Token compiler output mapping directly into React modules.",
      bgColor: "bg-rose-950 text-rose-50",
      tagColor: "bg-rose-600",
      logo: "Nova"
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-28 pb-16 px-6 md:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-36">
        
        {/* HERO HEADER */}
        <section className="space-y-6 max-w-3xl pt-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Experiments &amp; Exploration
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed">
            I love experimenting and seeing where ideas go 🚀. Here you'll find concepts, side projects, and work that didn't make it into full case studies - but still deserves a spot.
          </p>
        </section>

        {/* 3-COLUMN GRID EXPLORATION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[var(--text-secondary)]">21 Days Challenge 🚀</h4>
            <div className="aspect-video rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-3 gap-1.5 p-3 w-full h-full">
                <div className="bg-amber-100 rounded border border-amber-200" />
                <div className="bg-purple-100 rounded border border-purple-200" />
                <div className="bg-emerald-100 rounded border border-emerald-200" />
                <div className="bg-pink-100 rounded border border-pink-200" />
                <div className="bg-cyan-100 rounded border border-cyan-200" />
                <div className="bg-orange-100 rounded border border-orange-200" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[var(--text-secondary)]">Remote Airbnb Concept</h4>
            <div className="aspect-video rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
              <div className="w-16 h-28 bg-white rounded-xl shadow-lg border border-zinc-300/40 p-2 flex flex-col gap-1">
                <div className="w-full h-1 bg-red-500 rounded" />
                <div className="w-full h-12 bg-zinc-100 rounded-lg" />
                <div className="w-full h-8 bg-zinc-100 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-[var(--text-secondary)]">Music Production</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">More Songs 🎵</span>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-r from-orange-500 to-red-500 border border-orange-600 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-4.5 h-4.5 text-orange-600 fill-orange-600 ml-0.5" />
                </div>
                <span className="text-[9px] font-black text-white/80 bg-black/25 px-2 py-0.5 rounded">SoundCloud</span>
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-white text-xs">Places &amp; Visuals</h5>
                <p className="text-[9px] text-white/70">Kritika Sharma &mdash; Instrumental Synth</p>
              </div>
            </div>
          </div>

        </section>

        {/* 7 DAYS HERO CHALLENGE SHOWCASE WIDGET */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-8 shadow-sm space-y-6">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded">Experiment</span>
            <h2 className="text-3xl font-black text-[var(--text-primary)] mt-3">7 Days Hero Challenge</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              I organised a challenge for me and people in my community to design one hero section per day to explore new concepts (with a limited time of 90 minutes/day).
            </p>
          </div>

          {/* Browser frame and Day Navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Viewport Frame */}
            <div className="lg:col-span-9 rounded-2xl overflow-hidden border border-[var(--border-color)] flex flex-col justify-between min-h-[380px] bg-zinc-950 text-white relative">
              <div className="w-full h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="text-[10px] font-bold text-zinc-500 tracking-wider">hero-challenge-day-{activeDay}.com</div>
                <div className="w-8" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`flex-1 p-8 flex flex-col justify-center items-center text-center space-y-4 ${daysData[activeDay - 1].bgColor}`}
                >
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1.5 rounded-full text-white ${daysData[activeDay - 1].tagColor}`}>
                    {daysData[activeDay - 1].logo} App Now Available
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none max-w-xl">
                    Meet the new way to {daysData[activeDay - 1].title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 max-w-md">
                    {daysData[activeDay - 1].description}
                  </p>
                  <button className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-md mt-4 text-white ${daysData[activeDay - 1].tagColor}`}>
                    Try {daysData[activeDay - 1].logo} for free
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Day selector List */}
            <div className="lg:col-span-3 flex flex-col justify-center gap-1.5">
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 px-2">Select Day</span>
              {daysData.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                    activeDay === day.id 
                      ? 'bg-[var(--badge-bg)] text-[var(--text-primary)] border-[var(--border-color)] shadow-sm' 
                      : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-zinc-100 hover:text-[var(--text-primary)]'
                  }`}
                >
                  Day {day.id}: {day.logo}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* PURPLE CONNECT BANNER */}
        <section className="bg-violet-200 dark:bg-violet-900/60 border border-violet-300/40 p-8 md:p-14 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Interested in collaborating? Let's connect!
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm">
              I'd be happy to tell you more about this project and how I can support your goals.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button 
              onClick={() => window.open('https://linkedin.com')}
              className="w-12 h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 flex items-center justify-center shadow-md transition-transform active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 fill-white" />
            </button>
            <button 
              onClick={copyEmail}
              className="btn-black px-6 py-3.5 rounded-full font-bold text-xs shadow-md"
            >
              {emailCopied ? "Email Copied!" : "Copy my email"}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}