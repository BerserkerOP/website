"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure hydration matches by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    // Add transition class to html element
    document.documentElement.classList.add('theme-transition');
    
    // Switch theme
    setTheme(isDark ? "light" : "dark");
    
    // Remove class after transition completes (700ms match css)
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 700);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't') {
        const activeEl = document.activeElement?.tagName.toLowerCase();
        if (activeEl !== 'input' && activeEl !== 'textarea' && activeEl !== 'select') {
          toggleTheme();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  if (!mounted) {
    return (
      <button className={className || "p-2 rounded-full text-apple-subtext hover:text-apple-text hover:bg-apple-gray transition-colors duration-200 ml-4 flex items-center justify-center w-9 h-9"} aria-label="Toggle Dark Mode" disabled>
      </button>
    ); // Placeholder to prevent layout shift and hydration errors
  }

  return (
    <button
      onClick={toggleTheme}
      className={className || "p-2 rounded-full text-apple-subtext hover:text-apple-text hover:bg-apple-gray transition-colors duration-200 ml-4 flex items-center justify-center"}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}
