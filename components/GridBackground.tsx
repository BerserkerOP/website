"use client";

export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex justify-center overflow-hidden">
      {/* Outer Max-Width Container for Architectural Vertical Guide Lines (matching Clip Masters) */}
      <div className="relative w-full max-w-7xl h-full border-x border-black/[0.07] dark:border-white/[0.07]">
        {/* Interior Column Lines */}
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-black/[0.04] dark:bg-white/[0.04]" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-black/[0.04] dark:bg-white/[0.04]" />
      </div>
    </div>
  );
}
