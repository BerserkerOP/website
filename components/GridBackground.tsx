"use client";

export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Full-page SVG grid — both vertical and horizontal lines, like Clip Masters */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Grid pattern: 80px cells */}
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical line on left edge of each cell */}
            <line
              x1="0" y1="0" x2="0" y2="80"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-black/[0.06] dark:text-white/[0.06]"
            />
            {/* Horizontal line on top edge of each cell */}
            <line
              x1="0" y1="0" x2="80" y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-black/[0.06] dark:text-white/[0.06]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Subtle radial fade-out vignette so grid feels editorial, not overwhelming */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--apple-bg) 100%)",
        }}
      />
    </div>
  );
}
