"use client";

import { motion } from "framer-motion";
import { Target, Clock, CheckCircle2, Star } from "lucide-react";
import type { Course } from "@/types";
import ProgressBar from "./ProgressBar";

interface StatsTileProps {
  courses: Course[];
}

export default function StatsTile({ courses }: StatsTileProps) {
  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  const completed = courses.filter((c) => c.progress === 100).length;

  const stats = [
    {
      icon: Target,
      label: "Avg. Progress",
      value: `${avgProgress}%`,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: completed.toString(),
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Clock,
      label: "Hours Left",
      value: `${courses.length * 4}h`,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Star,
      label: "Points",
      value: "2,840",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <motion.article
      whileHover={{
        scale: 1.018,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(108,99,255,0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="grain-overlay relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="relative flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-textPrimary">Your Progress</h2>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                  delay: 0.2 + i * 0.07,
                }}
                className={`flex flex-col gap-2 rounded-xl border border-border ${s.bg} p-3`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${s.bg}`}>
                  <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                </div>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-textSecondary leading-tight">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Overall progress bar */}
        <div className="space-y-1.5 rounded-xl border border-border bg-white/3 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-textSecondary">Overall completion</span>
            <span className="text-xs font-bold text-accent">{avgProgress}%</span>
          </div>
          <ProgressBar value={avgProgress} />
          <p className="text-[10px] text-textSecondary">
            {courses.length - completed} course{courses.length - completed !== 1 ? "s" : ""} remaining
          </p>
        </div>
      </div>
    </motion.article>
  );
}
