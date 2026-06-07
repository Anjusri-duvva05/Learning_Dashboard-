"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";
import { useMemo } from "react";

function generateActivityData() {
  const weeks = 16;
  const days = 7;
  const data: { count: number; date: string }[][] = [];

  const now = new Date();
  for (let w = weeks - 1; w >= 0; w--) {
    const week: { count: number; date: string }[] = [];
    for (let d = 0; d < days; d++) {
      const date = new Date(now);
      date.setDate(now.getDate() - (w * 7 + (days - 1 - d)));
      const isFuture = date > now;
      week.push({
        count: isFuture ? 0 : Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 5) + 1,
        date: date.toISOString().split("T")[0],
      });
    }
    data.push(week);
  }
  return data;
}

const ACTIVITY_COLORS = [
  "bg-muted/20",
  "bg-accent/20",
  "bg-accent/40",
  "bg-accent/65",
  "bg-accent shadow-glow-sm",
];

const MONTHLY_STATS = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 91 },
  { label: "May", value: 63 },
  { label: "Jun", value: 88 },
];

export default function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(), []);
  const maxVal = Math.max(...MONTHLY_STATS.map((s) => s.value));

  const totalDays = activityData.flat().filter((d) => d.count > 0).length;

  return (
    <motion.article
      whileHover={{
        scale: 1.012,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(108,99,255,0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="grain-overlay relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card h-full flex flex-col"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-glow-purple opacity-60 blur-2xl"
      />

      <div className="relative flex flex-col gap-5 p-5 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
              <Activity className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-textPrimary">Learning Activity</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            <TrendingUp className="h-3 w-3" />
            +18% this month
          </div>
        </div>

        {/* Contribution graph */}
        <div>
          <p className="mb-2 text-xs text-textSecondary">
            <span className="font-semibold text-textPrimary">{totalDays} active days</span> in the last 4 months
          </p>
          <div className="flex gap-1 overflow-hidden">
            {activityData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <motion.div
                    key={`${wi}-${di}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (wi * 7 + di) * 0.003,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    title={`${day.date}: ${day.count} sessions`}
                    className={`h-3 w-3 rounded-sm ${ACTIVITY_COLORS[Math.min(day.count, 4)]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="mt-2 flex items-center gap-1 justify-end">
            <span className="text-[10px] text-textSecondary mr-1">Less</span>
            {ACTIVITY_COLORS.map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
            ))}
            <span className="text-[10px] text-textSecondary ml-1">More</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex-1">
          <p className="mb-3 text-xs font-medium text-textSecondary">Monthly Sessions</p>
          <div className="flex items-end gap-2 h-24">
            {MONTHLY_STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative flex w-full items-end justify-center h-20">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(stat.value / maxVal) * 100}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 18,
                      delay: 0.3 + i * 0.07,
                    }}
                    className="w-full rounded-t-md bg-accent/30 relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1/3 rounded-t-md bg-accent/60"
                    />
                  </motion.div>
                </div>
                <span className="text-[10px] text-textSecondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
          {[
            { label: "Total Hours", value: "142h" },
            { label: "Avg / Day", value: "1.2h" },
            { label: "Best Streak", value: "21 days" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-sm font-bold text-textPrimary">{s.value}</p>
              <p className="text-[10px] text-textSecondary">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
