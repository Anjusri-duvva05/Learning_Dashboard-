"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({ value, color = "text-accent" }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const bgColorMap: Record<string, string> = {
    "text-purple-400": "bg-purple-400",
    "text-blue-400": "bg-blue-400",
    "text-cyan-400": "bg-cyan-400",
    "text-emerald-400": "bg-emerald-400",
    "text-amber-400": "bg-amber-400",
    "text-violet-400": "bg-violet-400",
    "text-sky-400": "bg-sky-400",
    "text-red-400": "bg-red-400",
    "text-pink-400": "bg-pink-400",
    "text-green-400": "bg-green-400",
    "text-accent": "bg-accent",
  };

  const glowMap: Record<string, string> = {
    "text-purple-400": "rgba(192,132,252,0.6)",
    "text-blue-400": "rgba(96,165,250,0.6)",
    "text-cyan-400": "rgba(34,211,238,0.6)",
    "text-emerald-400": "rgba(52,211,153,0.6)",
    "text-amber-400": "rgba(251,191,36,0.6)",
    "text-violet-400": "rgba(167,139,250,0.6)",
    "text-sky-400": "rgba(56,189,248,0.6)",
    "text-red-400": "rgba(248,113,113,0.6)",
    "text-pink-400": "rgba(244,114,182,0.6)",
    "text-green-400": "rgba(74,222,128,0.6)",
    "text-accent": "rgba(108,99,255,0.6)",
  };

  const bgColor = bgColorMap[color] ?? "bg-accent";
  const glowColor = glowMap[color] ?? "rgba(108,99,255,0.6)";

  return (
    <div
      ref={ref}
      className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`absolute left-0 top-0 h-full rounded-full ${bgColor}`}
        style={{ boxShadow: `0 0 8px ${glowColor}` }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          delay: 0.1,
        }}
      />
    </div>
  );
}
