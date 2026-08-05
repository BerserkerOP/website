"use client";

import { motion } from "framer-motion";
import { Star, Users, Zap, MessageSquare, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface MetricItem {
  id: string;
  icon: React.ElementType;
  value: string;
  title: string;
  subtext: string;
  iconBg: string;
  iconColor: string;
  glowColor: string;
  extraWidget?: React.ReactNode;
}

export default function TrustMetrics() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const metrics: MetricItem[] = [
    {
      id: "rating",
      icon: Star,
      value: "4.7",
      title: "Loved by Founders",
      subtext: "avg client rating",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
      iconColor: "text-amber-500 dark:text-amber-400",
      glowColor: "#FFB800",
      extraWidget: (
        <div className="flex items-center gap-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      )
    },
    {
      id: "demand",
      icon: Users,
      value: "20+",
      title: "Project Inquiries",
      subtext: "monthly client requests",
      iconBg: "bg-[#007AFF]/10 dark:bg-[#007AFF]/20",
      iconColor: "text-[#007AFF] dark:text-blue-400",
      glowColor: "#007AFF"
    },
    {
      id: "turnaround",
      icon: Zap,
      value: "5 days",
      title: "Avg Delivery Speed",
      subtext: "rapid project turnarounds",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      glowColor: "#10B981"
    },
    {
      id: "responsive",
      icon: MessageSquare,
      value: "100%",
      title: "Responsive Support",
      subtext: "same-day communication",
      iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
      iconColor: "text-purple-500 dark:text-purple-400",
      glowColor: "#A855F7"
    },
    {
      id: "satisfaction",
      icon: ShieldCheck,
      value: "96%",
      title: "Client Satisfaction",
      subtext: "guaranteed quality & precision",
      iconBg: "bg-pink-500/10 dark:bg-pink-500/20",
      iconColor: "text-pink-500 dark:text-pink-400",
      glowColor: "#EC4899"
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <p className="text-apple-subtext text-xs sm:text-sm font-mono uppercase tracking-[0.2em] mb-3 text-black/50 dark:text-white/50">
          WHY CLIENTS TRUST HALFTONEMOTION
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-apple-text tracking-tight mb-4 leading-tight">
          Real outreach. Real speed.
        </h2>
        <p className="text-base sm:text-lg text-apple-subtext font-medium">
          Transparent metrics, rapid turnarounds, and dedicated collaboration with zero fluff.
        </p>
      </div>

      {/* Main Glassmorphic 5-Metric Capsule Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-[2.5rem] bg-white/70 dark:bg-black/50 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06] dark:divide-white/[0.08]">
          {metrics.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group p-6 sm:p-7 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Subtle Top-Left Ambient Radial Gradient Shadow Glow on Hover */}
                <div
                  className={`absolute -top-16 -left-16 w-44 h-44 rounded-full pointer-events-none transition-all duration-500 blur-2xl -z-0 ${
                    isHovered ? "opacity-100 scale-110" : "opacity-0 scale-90"
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${item.glowColor}35 0%, ${item.glowColor}00 70%)`
                  }}
                />

                {/* Top Row: Icon Badge & Stat Value */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  {/* Icon Circle */}
                  <div className={`p-3 rounded-2xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>

                  {/* Main Value */}
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-extrabold text-apple-text tracking-tight leading-none">
                      {item.value}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Label, Subtext & Rating Stars (if present) */}
                <div className="mt-6 relative z-10 flex flex-col items-start">
                  <h3 className="text-sm font-bold text-apple-text tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-apple-subtext transition-colors">
                    {item.subtext}
                  </p>
                  {item.extraWidget}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
