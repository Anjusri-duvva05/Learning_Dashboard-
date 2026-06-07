"use client";

import { motion } from "framer-motion";
import { Flame, Sun, Trophy } from "lucide-react";

interface HeroTileProps {
  courseCount: number;
}

const STREAK_DAYS = 12;

export default function HeroTile({ courseCount }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      whileHover={{
        scale: 1.01,
        boxShadow:
          "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(108,99,255,0.18)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="grain-overlay relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
      aria-label="Welcome hero section"
    >
      {/* Background glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-blue-500/8 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
        {/* Left: greeting */}
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm font-medium text-textSecondary">
            <Sun className="h-4 w-4 text-warning" />
            {greeting}
          </p>
          <h1 className="text-2xl font-bold text-textPrimary sm:text-3xl lg:text-4xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Alex
            </span>{" "}
            👋
          </h1>
          <p className="text-sm text-textSecondary">
            You have{" "}
            <span className="font-semibold text-textPrimary">{courseCount}</span>{" "}
            active course{courseCount !== 1 ? "s" : ""} in progress. Keep pushing!
          </p>
        </div>

        {/* Right: streak + achievement */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Streak card */}
          <div className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/10 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/20">
              <Flame className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-textSecondary">Daily Streak</p>
              <p className="text-xl font-bold text-warning">{STREAK_DAYS} days</p>
            </div>
          </div>

          {/* Trophy card */}
          <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
              <Trophy className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-textSecondary">Rank</p>
              <p className="text-xl font-bold text-accent">Top 5%</p>
            </div>
          </div>

          {/* Streak indicator dots */}
          <div className="flex flex-col gap-1">
            <p className="text-xs text-textSecondary">This Week</p>
            <div className="flex gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: i * 0.05,
                      }}
                      className={`h-5 w-5 rounded-md ${
                        i < 5
                          ? "bg-accent shadow-glow-sm"
                          : "bg-muted/40"
                      }`}
                    />
                    <span className="text-[8px] text-textSecondary">{day[0]}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
