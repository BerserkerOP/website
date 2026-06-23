"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MacbookScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate rotations and scales
  // As user scrolls, the laptop lid tilts back slightly, and the whole unit scales down
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 0.6]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="h-[200vh] w-full relative -mt-32 z-10 hidden md:block">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center [perspective:800px] overflow-hidden">
        
        <motion.div
          style={{
            scale,
            rotateX,
            y,
            transformStyle: "preserve-3d",
          }}
          className="relative origin-bottom max-w-[1200px] w-[90vw] flex flex-col items-center justify-center pt-24"
        >
          {/* Lid (Screen) */}
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-[32px] rounded-b-md border-[6px] border-[#222] shadow-2xl flex flex-col overflow-hidden z-20">
            {/* Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/80 flex items-center justify-center z-50">
              <div className="w-[3px] h-[3px] rounded-full bg-blue-900/30"></div>
            </div>
            
            {/* Screen Content: After Effects Mockup */}
            <AfterEffectsMockup />

            {/* Screen Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay z-40"></div>
          </div>

          {/* Base Keyboard Deck */}
          <div className="relative w-[114%] h-[28px] bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] rounded-b-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] -mt-[2px] z-10 flex justify-center border-t border-[#444]/50">
             {/* Notch indent */}
             <div className="w-24 h-[6px] bg-[#111] rounded-b-[4px] mt-[1px]"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function AfterEffectsMockup() {
  return (
    <div className="w-full h-full bg-[#181818] text-[#cccccc] font-sans text-[9px] sm:text-[11px] flex flex-col pt-6 select-none relative z-30 overflow-hidden">
      {/* Menu Bar */}
      <div className="h-6 bg-[#232323] border-b border-black/60 flex items-center px-3 gap-4 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex gap-3 font-medium text-[#999]">
          <span>File</span>
          <span>Edit</span>
          <span>Composition</span>
          <span>Layer</span>
          <span>Effect</span>
          <span>Animation</span>
          <span>View</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel (Project) */}
        <div className="w-[18%] bg-[#1e1e1e] border-r border-black/60 flex flex-col shrink-0">
          <div className="h-6 bg-[#2d2d2d] border-b border-black/60 flex items-center px-3 font-semibold text-[#eee] tracking-wide">Project</div>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex items-center gap-2 p-1 bg-[#2a2a2a] rounded shadow-inner">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-[2px]"></div>
              <span>Main Comp</span>
            </div>
            <div className="flex items-center gap-2 p-1">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-[2px]"></div>
              <span>Assets</span>
            </div>
            <div className="flex items-center gap-2 p-1">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px]"></div>
              <span>Audio</span>
            </div>
          </div>
        </div>

        {/* Center Panel (Viewer) */}
        <div className="flex-1 bg-[#111] flex flex-col relative overflow-hidden">
          <div className="h-6 bg-[#2d2d2d] border-b border-black/60 flex items-center px-3 font-semibold text-[#eee] tracking-wide">Composition: Main Comp</div>
          
          <div className="flex-1 relative flex items-center justify-center p-6 lg:p-12">
             {/* The preview window */}
             <div className="w-full h-full bg-black shadow-[0_0_30px_rgba(0,0,0,1)] rounded flex items-center justify-center relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 to-purple-900/30"></div>
                
                {/* 3D Geometry representation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-64 h-64 border border-apple-blue/30 rounded-full"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-48 h-48 border border-purple-500/30 rounded-full"
                ></motion.div>

                <h1 className="text-3xl lg:text-6xl font-bold text-white z-10 tracking-tighter drop-shadow-2xl">Halftone</h1>
                
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-apple-blue/40 rounded-full blur-[40px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/40 rounded-full blur-[50px]"></div>
                
                {/* Rule of thirds grid lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-[0.15]">
                  <div className="border-r border-b border-white"></div>
                  <div className="border-r border-b border-white"></div>
                  <div className="border-b border-white"></div>
                  <div className="border-r border-b border-white"></div>
                  <div className="border-r border-b border-white"></div>
                  <div className="border-b border-white"></div>
                  <div className="border-r border-white"></div>
                  <div className="border-r border-white"></div>
                  <div></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Panel (Effects) */}
        <div className="w-[18%] bg-[#1e1e1e] border-l border-black/60 shrink-0 hidden md:flex flex-col">
          <div className="h-6 bg-[#2d2d2d] border-b border-black/60 flex items-center px-3 font-semibold text-[#eee] tracking-wide">Effects & Presets</div>
          <div className="p-3">
            <div className="w-full h-5 bg-[#111] border border-black/80 rounded flex items-center px-2 mb-3">
               <span className="text-[#555]">Search...</span>
            </div>
            <div className="space-y-1.5">
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Animation Presets</div>
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Blur & Sharpen</div>
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Color Correction</div>
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Distort</div>
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Generate</div>
              <div className="pl-3 text-[#aaa] border-l-2 border-[#333]">Keying</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel (Timeline) */}
      <div className="h-[35%] bg-[#1e1e1e] border-t border-black/80 flex flex-col shrink-0">
        <div className="h-6 bg-[#2d2d2d] border-b border-black/60 flex items-center px-3 font-semibold text-[#eee] tracking-wide gap-4">
          <span>Main Comp - Timeline</span>
          <div className="flex-1 flex items-center">
            {/* Timeline ruler */}
            <div className="flex-1 h-3 border-b border-[#444] flex justify-between px-2 text-[8px] text-[#777]">
               <span>0:00</span><span>0:05</span><span>0:10</span><span>0:15</span><span>0:20</span><span>0:25</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Layer Controls */}
          <div className="w-48 lg:w-64 bg-[#222] border-r border-black/60 flex flex-col gap-[1px]">
            <div className="h-6 bg-[#282828] flex items-center px-2 gap-2 text-white">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-[2px] shadow-sm"></div>
              <span className="w-4 text-[#666] text-right">1</span>
              <span className="truncate">Halftone Text.mp4</span>
            </div>
            <div className="h-6 bg-[#282828] flex items-center px-2 gap-2 text-[#bbb]">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-[2px] shadow-sm"></div>
              <span className="w-4 text-[#666] text-right">2</span>
              <span className="truncate">Optical Glow</span>
            </div>
            <div className="h-6 bg-[#282828] flex items-center px-2 gap-2 text-[#bbb]">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-[2px] shadow-sm"></div>
              <span className="w-4 text-[#666] text-right">3</span>
              <span className="truncate">Background Matte</span>
            </div>
            <div className="h-6 bg-[#282828] flex items-center px-2 gap-2 text-[#bbb]">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px] shadow-sm"></div>
              <span className="w-4 text-[#666] text-right">4</span>
              <span className="truncate">Ambient Audio.wav</span>
            </div>
          </div>

          {/* Timeline Tracks */}
          <div className="flex-1 bg-[#151515] flex flex-col gap-[1px] relative overflow-hidden px-2 pt-1">
            {/* Playhead */}
            <div className="absolute top-0 bottom-0 left-[35%] w-px bg-red-500/80 z-10 pointer-events-none">
               <div className="absolute -top-1 -left-[5px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-red-500"></div>
            </div>

            {/* Blocks */}
            <div className="h-6 flex items-center">
              <div className="h-4 bg-red-500/70 rounded-[2px] border border-black/40 ml-[10%] w-[80%] flex items-center px-1 shadow-sm"></div>
            </div>
            <div className="h-6 flex items-center">
              <div className="h-4 bg-purple-500/70 rounded-[2px] border border-black/40 ml-[25%] w-[60%] flex items-center px-1 justify-between shadow-sm">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#eee] shadow-sm"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#eee] shadow-sm"></div>
              </div>
            </div>
            <div className="h-6 flex items-center">
              <div className="h-4 bg-blue-500/70 rounded-[2px] border border-black/40 ml-0 w-full flex items-center px-1 shadow-sm"></div>
            </div>
            <div className="h-6 flex items-center">
              <div className="h-4 bg-orange-500/70 rounded-[2px] border border-black/40 ml-0 w-[90%] flex items-center px-1 shadow-sm">
                 {/* Waveform lines */}
                 <div className="w-full h-2 flex gap-[1px] items-end opacity-40 px-1">
                    <div className="w-[1px] h-[30%] bg-white"></div>
                    <div className="w-[1px] h-[60%] bg-white"></div>
                    <div className="w-[1px] h-[100%] bg-white"></div>
                    <div className="w-[1px] h-[50%] bg-white"></div>
                    <div className="w-[1px] h-[80%] bg-white"></div>
                    <div className="w-[1px] h-[20%] bg-white"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
