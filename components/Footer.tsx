import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        {/* Pages Column */}
        <div>
          <h3 className="text-[#a1a1aa] text-sm font-semibold tracking-wider uppercase mb-6">Pages</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Home</Link></li>
            <li><Link href="/work" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Our Work</Link></li>
            <li><Link href="/contact" className="text-[15px] hover:text-[#a1a1aa] transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        {/* Socials & Contact Column */}
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

        {/* Brand / Extra Info Column (Optional, keeping it clean to match image) */}
        <div className="flex flex-col justify-between">
           <div className="hidden md:block">
             <span className="text-2xl font-bold tracking-tight text-white">HalftoneMotion</span>
           </div>
        </div>
      </div>
      
      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-[#a1a1aa] text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} HalftoneMotion. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-[#a1a1aa] text-sm hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="text-[#a1a1aa] text-sm hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
