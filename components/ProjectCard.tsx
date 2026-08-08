"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import VideoModal from './VideoModal';

interface ProjectCardProps {
  title: string;
  category: React.ReactNode;
  delay?: number;
  videoUrl?: string;
  hoverGradient?: boolean;
  thumbnailUrl?: string;
  themeColor?: string;
  textColorTheme?: 'light' | 'dark';
  tag?: string;
}

export default function ProjectCard({ 
  title, 
  category, 
  delay = 0, 
  videoUrl, 
  thumbnailUrl,
  tag
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const videoIdMatch = videoUrl?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/);
  const videoId = (videoIdMatch && videoIdMatch[2].length === 11) ? videoIdMatch[2] : null;
  const imageUrl = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);

  // Mouse Cursor Follower position relative to card
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col rounded-3xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 p-2.5 sm:p-3 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
      >
        {/* Hover Cursor Follower Badge ("View Project ↗") */}
        {isHovered && (
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            className="pointer-events-none absolute -top-4 -left-16 z-30 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-black font-extrabold text-xs shadow-xl border border-white/20 dark:border-black/20"
          >
            <span>View Project</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        )}

        {/* Video Thumbnail Container (matching Image 1) */}
        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden bg-zinc-950 isolate">
          {tag && (
            <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider select-none">
              {tag}
            </div>
          )}

          {imageUrl ? (
            <div className="relative w-full h-full">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-[0_10px_35px_rgba(0,0,0,0.3)] transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">[ VIDEO PREVIEW ]</span>
            </div>
          )}
        </div>

        {/* Bottom Title Row (matching Image 1) */}
        <div className="px-3 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-extrabold text-black dark:text-white tracking-tight group-hover:text-apple-blue transition-colors">
              {title}
            </h3>
            <div className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {category}
            </div>
          </div>

          {/* Right View Project Link */}
          <div className="flex items-center gap-1 text-xs font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0">
            <span>View Project</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Video Modal Popup (matching Image 2) */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        category={category}
        videoUrl={videoUrl}
      />
    </>
  );
}
