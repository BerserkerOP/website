"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-20 border-t border-white/5 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
      >
        
        {/* Brand / Extra Info Column (Left) */}
        <div className="flex flex-col md:col-span-2 pr-0 md:pr-12">
           <div className="mb-4">
             <span className="text-2xl font-bold tracking-tight text-white">HalftoneMotion</span>
           </div>
           <p className="text-[#a1a1aa] text-[15px] leading-relaxed max-w-sm">
             Premium motion graphics for SaaS companies that want to look like they mean business.
           </p>
        </div>

        {/* Pages Column (Middle) */}
        <div>
          <h3 className="text-[#a1a1aa] text-sm font-semibold tracking-wider uppercase mb-6">Pages</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Home</Link></li>
            <li><Link href="/work" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Our Work</Link></li>
            <li><Link href="/contact" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        {/* Socials & Contact Column (Right) */}
        <div>
          <h3 className="text-[#a1a1aa] text-sm font-semibold tracking-wider uppercase mb-6">Follow Us</h3>
          <ul className="space-y-4">
            <li><a href="https://www.instagram.com/atharvf.x/" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Instagram</a></li>
            <li><a href="https://www.behance.net/gamingandfun1" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Behance</a></li>
            <li><a href="https://www.youtube.com/channel/UCh5P2qR4MUeahOXECT5pm-Q" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:text-[#a1a1aa] transition-colors">YouTube</a></li>
          </ul>
          
          <h3 className="text-[#a1a1aa] text-sm font-semibold tracking-wider uppercase mb-6 mt-12">Get In Touch</h3>
          <ul className="space-y-4">
            <li><Link href="/contact" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Contact us</Link></li>
          </ul>
        </div>
      </motion.div>
      
      {/* Copyright Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 lg:px-16 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="text-[#a1a1aa] text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} HalftoneMotion. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
