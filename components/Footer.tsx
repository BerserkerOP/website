export default function Footer() {
  return (
    <footer className="border-t border-apple-border bg-apple-bg py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="text-apple-subtext text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} atharvf.x. All rights reserved.
        </div>
        <div className="flex space-x-6 text-apple-subtext text-sm font-medium">
          <a href="https://www.youtube.com/channel/UCh5P2qR4MUeahOXECT5pm-Q" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors duration-200">YouTube</a>
          <a href="https://www.instagram.com/atharvf.x/" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors duration-200">Instagram</a>
          <a href="https://www.behance.net/gamingandfun1" target="_blank" rel="noopener noreferrer" className="hover:text-apple-text transition-colors duration-200">Behance</a>
        </div>
      </div>
    </footer>
  );
}
