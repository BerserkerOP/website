"use client";

import ProjectCard from '@/components/ProjectCard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'commercial' | 'lyrical'>('all');

  const categories = [
    { id: 'all' as const, label: "All Work" },
    { id: 'commercial' as const, label: "Commercial" },
    { id: 'lyrical' as const, label: "Lyrical & Kinetic" },
  ];

  const projects = [
    { 
      title: "PayPal Ad", 
      category: (
        <>
          <strong>High-impact brand animation</strong> for commercial campaign releases.
        </>
      ), 
      videoUrl: "https://youtu.be/FMt2LcZDSnI",
      themeColor: "#003087",
      textColorTheme: "light" as const,
      tag: "Promo",
      type: "commercial" as const
    },
    { 
      title: "SaaS Demo Videos", 
      category: (
        <>
          <strong>Cinematic feature walkthroughs</strong> that convert browsers into buyers.
        </>
      ), 
      videoUrl: "https://youtu.be/ixG3a8z213k",
      themeColor: "#0A0D14",
      textColorTheme: "light" as const,
      tag: "SaaS Demo",
      type: "commercial" as const
    },
    { 
      title: "Discord Animation", 
      category: (
        <>
          <strong>Community platform walkthroughs</strong> highlighting custom brand visuals.
        </>
      ), 
      videoUrl: "https://www.youtube.com/watch?v=diH5NhlPvGM",
      themeColor: "#0E0F13",
      textColorTheme: "light" as const,
      tag: "Walkthrough",
      type: "commercial" as const
    },
    { 
      title: "Explainer Videos", 
      category: (
        <>
          <strong>Complex features made instantly clear</strong> in 60 seconds or less.
        </>
      ), 
      videoUrl: "https://youtu.be/L3MB9hYLbBI", 
      thumbnailUrl: "https://img.youtube.com/vi/L3MB9hYLbBI/hqdefault.jpg",
      themeColor: "#120E16",
      textColorTheme: "light" as const,
      tag: "Explainer",
      type: "commercial" as const
    },
    { 
      title: "ChatGPT Animation", 
      category: (
        <>
          <strong>High-energy kinetic typography</strong> visualizers designed for artists.
        </>
      ), 
      videoUrl: "https://youtube.com/shorts/altZ7ZOHWNo?feature=share",
      themeColor: "#EAEAEA",
      textColorTheme: "dark" as const,
      tag: "Brand Animation",
      type: "commercial" as const
    },
    { 
      title: "Onboarding Sequences", 
      category: (
        <>
          <strong>Get users to their aha moment</strong> without a single support ticket.
        </>
      ), 
      videoUrl: "https://youtu.be/NhGNe4KJ1cU",
      themeColor: "#0A0B10",
      textColorTheme: "light" as const,
      tag: "Onboarding",
      type: "commercial" as const
    },

    { 
      title: "Hit The Gas", 
      category: (
        <>
          <strong>High-energy kinetic lyrics</strong> featuring custom fast-paced text tracking.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/hnRYOCYitbA",
      themeColor: "#0F172A",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
    { 
      title: "Ran to Atlanta", 
      category: (
        <>
          <strong>Rhythmic typography layout</strong> synchronized with stylized visual cues.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/SxBE1VYPMtE",
      themeColor: "#1E1B4B",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
    { 
      title: "J. Cole - 39 Intro", 
      category: (
        <>
          <strong>Sleek motion type sequencing</strong> designed for vertical visual feeds.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/_87r8kmzot8",
      themeColor: "#022C22",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
    { 
      title: "Sweet Home - Don Toliver", 
      category: (
        <>
          <strong>Vibrant color-mapped kinetic text</strong> synced with custom music beats.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/cQegz-mCh3I",
      themeColor: "#311005",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
    { 
      title: "Quik Stop", 
      category: (
        <>
          <strong>Punchy typographic visualizer</strong> featuring quick cuts and transitions.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/_0D0_b2x8Hg",
      themeColor: "#0F172A",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
    { 
      title: "Champion & Vacay", 
      category: (
        <>
          <strong>Dynamic text animation transitions</strong> synced with high-bpm rhythms.
        </>
      ), 
      videoUrl: "https://www.youtube.com/shorts/zs2-Yl4w_Dc",
      themeColor: "#172554",
      textColorTheme: "light" as const,
      tag: "Lyrical",
      type: "lyrical" as const
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.type === activeCategory
  );

  return (
    <div className="bg-apple-bg min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">
              Selected Work
            </h1>
            <p className="text-base sm:text-lg text-apple-subtext max-w-2xl">
              A collection of our recent projects, from SaaS product tours to high-energy visualizers.
            </p>
          </div>

          {/* Apple Segmented Control */}
          <div className="flex items-center self-start md:self-auto">
            <div className="inline-flex bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-md rounded-full border border-black/[0.06] dark:border-white/[0.06] p-1 relative">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 select-none z-10 ${
                      isActive
                        ? "text-white dark:text-black"
                        : "text-apple-subtext hover:text-apple-text"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#007AFF] dark:bg-white rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Animated layout grid */}
        <motion.div 
          layout="position"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.videoUrl}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ProjectCard 
                  title={project.title}
                  category={project.category}
                  delay={0}
                  videoUrl={project.videoUrl}
                  thumbnailUrl={project.thumbnailUrl}
                  themeColor={project.themeColor}
                  textColorTheme={project.textColorTheme}
                  hoverGradient={true}
                  tag={project.tag}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
