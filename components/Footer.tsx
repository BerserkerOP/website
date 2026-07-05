"use client";

import Link from 'next/link';
import { useState } from 'react';
import GetInTouchModal from './GetInTouchModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="relative bg-apple-bg pt-20 pb-0 border-t border-black/5 dark:border-white/5 overflow-hidden flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:justify-between items-start z-10">
        
        {/* Left Side: Copyright and Location */}
        <div className="flex flex-col gap-4 text-apple-subtext text-sm font-medium">
          <p className="text-base text-apple-text">
            Still have questions? <button onClick={() => setIsModalOpen(true)} className="text-[#007AFF] hover:underline transition-all">Get in touch.</button>
          </p>
          <div className="flex flex-col gap-1 mt-4">
            <span>Crafted with precision</span>
            <span>© {new Date().getFullYear()} HalftoneMotion</span>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="grid grid-cols-2 w-full md:w-auto md:flex gap-4 md:gap-16 mt-12 md:mt-0 text-sm font-medium text-apple-subtext">
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:text-apple-text transition-colors">Home</Link>
            <Link href="/work" className="hover:text-apple-text transition-colors">Our Work</Link>
            <Link href="/contact" className="hover:text-apple-text transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/atharvf.x/" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors">Instagram</a>
            <a href="https://www.behance.net/gamingandfun1" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors">Behance</a>
            <a href="https://www.youtube.com/channel/UCh5P2qR4MUeahOXECT5pm-Q" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors">YouTube</a>
          </div>
        </div>

      </div>

      {/* Giant Faded Text */}
      <div className="w-full mt-10 md:mt-0 flex justify-center items-end pointer-events-none select-none px-4 pb-4 md:pb-8">
        <h1 
          className="text-[25vw] md:text-[22vw] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 dark:to-transparent"
        >
          Halftone
        </h1>
      </div>

      <GetInTouchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
