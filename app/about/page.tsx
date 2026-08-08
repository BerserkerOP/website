"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, CheckCircle2, Play, Smile, Heart, Users, Zap, Figma, ArrowUpRight } from 'lucide-react';

export default function About() {
  const [activePhotoTab, setActivePhotoTab] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@kritikasharma.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const photoTabs = [
    { id: 0, icon: "✌️", label: "My Portrait", color: "from-amber-100 to-orange-200" },
    { id: 1, icon: "⛰️", label: "Mountain Trek", color: "from-blue-100 to-cyan-200" },
    { id: 2, icon: "🌊", label: "Surfing Coast", color: "from-emerald-100 to-teal-200" },
    { id: 3, icon: "💻", label: "Coding Ideas", color: "from-purple-100 to-pink-200" }
  ];

  const howIWork = [
    {
      title: "Curiosity",
      description: "I love questioning things and finding new ways to innovate, always driven by curiosity.",
      color: "text-pink-600 bg-pink-50 border-pink-100",
      icon: <Smile className="w-5 h-5 text-pink-600" />
    },
    {
      title: "Honesty",
      description: "Keeping things clear, transparent, and open, with everyone on the same page.",
      color: "text-purple-600 bg-purple-50 border-purple-100",
      icon: <Heart className="w-5 h-5 text-purple-600" />
    },
    {
      title: "Collaboration",
      description: "I love teamwork and believe in synergy, creating results beyond what's achievable alone.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      icon: <Users className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Driving change",
      description: "I enjoy working in dynamic environments, turning challenges into opportunities.",
      color: "text-red-600 bg-red-50 border-red-100",
      icon: <Zap className="w-5 h-5 text-red-600" />
    }
  ];

  const toolsList = {
    creativity: [
      { name: "Figma & FigJam", desc: "UX/UI design, prototyping, collaboration", link: "https://figma.com" },
      { name: "Framer", desc: "Web design, templates", link: "https://framer.com" },
      { name: "Miro", desc: "Brainstorming, workshops", link: "https://miro.com" },
      { name: "Ableton Live", desc: "Music production and sound design", link: "https://ableton.com" },
      { name: "Goodnotes", desc: "Sketches and brainstorming", link: "https://goodnotes.com" }
    ],
    documentation: [
      { name: "Craft Docs", desc: "My second brain (knowledge base)", link: "https://craft.do" },
      { name: "ChatGPT", desc: "Brainstorming, content refinement", link: "https://openai.com" },
      { name: "Perplexity", desc: "UX/UI design, prototyping, collaboration", link: "https://perplexity.ai" },
      { name: "Mac Whisper", desc: "Amazing for transcripts", link: "https://whisper.com" }
    ],
    productivity: [
      { name: "Things 3", desc: "Minimal and amazing task manager", link: "https://culturedcode.com" },
      { name: "Toggl", desc: "Tracking my time and invoices", link: "https://toggl.com" },
      { name: "Discord", desc: "Community, book clubs, resources", link: "https://discord.com" },
      { name: "Rotato", desc: "Cool 3D mockups", link: "https://rotato.xyz" }
    ]
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-28 pb-16 px-6 md:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-36">
        
        {/* HERO TITLE */}
        <section className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">About me</h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
            A bit about me - where I've been, what I do, and how I work.
          </p>
        </section>

        {/* PROFILE RETROSPECTIVE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Background Text Card */}
          <div className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[var(--text-primary)]">My background</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Originally from Germany, I currently navigate life between Berlin and London. With more than a decade of professional experience in product design and management, I've worked with international corporations, startups, and creative agencies; built a solid foundation of structure, and balanced my creative and open-minded soul.
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Many years of traveling and living in different cultures have given me unique perspectives on how people live and behave, enabling me to connect and empathize easily.
              </p>
            </div>

            <div className="pt-8">
              <a 
                href="https://drive.google.com/drive/folders/template-placeholder" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-white px-5 py-3 rounded-full font-bold text-xs inline-flex items-center gap-1.5"
              >
                Check my Resume ↗
              </a>
            </div>
          </div>

          {/* Interactive Portrait Selector Card */}
          <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-6 shadow-sm flex flex-col justify-between h-[420px]">
            <div className="flex-1 rounded-2xl overflow-hidden relative border border-[var(--border-color)] flex items-center justify-center bg-zinc-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhotoTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-tr ${photoTabs[activePhotoTab].color} flex flex-col items-center justify-center p-6`}
                >
                  <span className="text-6xl">{photoTabs[activePhotoTab].icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider mt-4 text-zinc-700/80">
                    {photoTabs[activePhotoTab].label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector badge overlay */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)]">
                {photoTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePhotoTab(tab.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                      activePhotoTab === tab.id 
                        ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm font-bold border border-[var(--border-color)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    aria-label={tab.label}
                  >
                    {tab.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* INTERESTS PILLS BOX */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-black text-[var(--text-primary)]">I love to do...</h3>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Surfing", "Making music", "Experimenting", "Getting lost in the streets", 
              "Meeting new people", "DJing", "Journaling", "Learning new things", "Exploring places around the world"
            ].map((pill, idx) => (
              <span key={idx} className="text-xs font-semibold px-4 py-2 rounded-full bg-[var(--badge-bg)] text-[var(--text-primary)]">
                {pill}
              </span>
            ))}
          </div>
        </section>

        {/* HOW I WORK SECTION */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]">How I work</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">A few things that shape how I work and create.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howIWork.map((item, idx) => (
              <div key={idx} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center md:text-left">
            <button onClick={() => window.open('mailto:hello@kritikasharma.com')} className="btn-white px-6 py-3 rounded-full font-bold text-xs">
              Book a call with me ↗
            </button>
          </div>
        </section>

        {/* MY FAVORITE TOOLS SECTION */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]">My Favorite Tools</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">Software I use often to design, create, and stay productive.</p>
          </div>

          <div className="space-y-8">
            
            {/* Category 1: Creativity */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-3">Creativity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolsList.creativity.map((tool, idx) => (
                  <a key={idx} href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:scale-[1.01] transition-transform">
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{tool.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] font-normal">{tool.desc}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Category 2: Documentation & Research */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-3">Documentation &amp; Research</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolsList.documentation.map((tool, idx) => (
                  <a key={idx} href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:scale-[1.01] transition-transform">
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{tool.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] font-normal">{tool.desc}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Category 3: Productivity & Others */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.2rem] p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-3">Productivity &amp; Others</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolsList.productivity.map((tool, idx) => (
                  <a key={idx} href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:scale-[1.01] transition-transform">
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{tool.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] font-normal">{tool.desc}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)]" />
                  </a>
                ))}
              </div>
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