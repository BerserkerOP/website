"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';
import GlareHover from './GlareHover';

interface ProjectCardProps {
  title: string;
  category: string;
  delay?: number;
  videoUrl?: string;
  hoverGradient?: boolean;
}

function getYouTubeEmbedUrl(url: string | undefined) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`
    : null;
}

export default function ProjectCard({ title, category, delay = 0, videoUrl, hoverGradient = false }: ProjectCardProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  
  // Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);
  const xSpring = useSpring(xPct, { stiffness: 400, damping: 30 });
  const ySpring = useSpring(yPct, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(ySpring, [0, 1], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [0, 1], ["-5deg", "5deg"]);
  
  // Glare
  const glareX = useTransform(xSpring, [0, 1], ["100%", "0%"]);
  const glareY = useTransform(ySpring, [0, 1], ["100%", "0%"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const mx = clientX - left;
    const my = clientY - top;
    
    // For spotlight
    mouseX.set(mx);
    mouseY.set(my);
    
    // For tilt
    xPct.set(mx / width);
    yPct.set(my / height);
  }

  function handleMouseLeave() {
    xPct.set(0.5);
    yPct.set(0.5);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative [perspective:1000px] flex flex-col group rounded-[24px] border border-transparent hover:border-apple-border/30 transition-colors duration-500"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex flex-col h-full w-full rounded-[23px] overflow-hidden bg-apple-card shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none"
      >
        {/* Spotlight Hover Glow (Behind Content) */}
        {!hoverGradient && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  var(--spotlight-color),
                  transparent 80%
                )
              `,
            }}
          />
        )}

        {/* Colorful Gradient Hover Glow */}
        {hoverGradient && (
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        
        {/* Glare Layer (ReactBits) */}
        <GlareHover className="absolute inset-0 z-50 rounded-[23px] mix-blend-overlay" transitionDuration={600} glareOpacity={0.8} />

        <div className="relative z-10 w-full aspect-video bg-zinc-900 overflow-hidden">
          {embedUrl ? (
            <iframe 
              className="w-full h-full"
              src={embedUrl} 
              title={title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
              <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">[ VIDEO PLACEHOLDER ]</span>
            </div>
          )}
        </div>

        {/* Text Container */}
        <div className="relative z-10 px-6 py-6 flex flex-col gap-1.5 flex-1 bg-apple-card">
          <h3 className="text-lg font-bold text-apple-text tracking-tight">{title}</h3>
          <p className="text-sm text-apple-subtext leading-relaxed">
            {category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
