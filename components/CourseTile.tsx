"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import CourseIcon from "./CourseIcon";
import ProgressBar from "./ProgressBar";

interface CourseTileProps {
  course: Course;
}

const CARD_GRADIENTS: Record<string, string> = {
  Code: "from-purple-900/40 via-surface to-surface",
  FileCode: "from-blue-900/40 via-surface to-surface",
  Layers: "from-cyan-900/40 via-surface to-surface",
  Server: "from-emerald-900/40 via-surface to-surface",
  BookOpen: "from-amber-900/40 via-surface to-surface",
  Database: "from-violet-900/40 via-surface to-surface",
  Globe: "from-sky-900/40 via-surface to-surface",
  Cpu: "from-red-900/40 via-surface to-surface",
  BrainCircuit: "from-pink-900/40 via-surface to-surface",
  Terminal: "from-green-900/40 via-surface to-surface",
};

const ICON_COLORS: Record<string, string> = {
  Code: "text-purple-400",
  FileCode: "text-blue-400",
  Layers: "text-cyan-400",
  Server: "text-emerald-400",
  BookOpen: "text-amber-400",
  Database: "text-violet-400",
  Globe: "text-sky-400",
  Cpu: "text-red-400",
  BrainCircuit: "text-pink-400",
  Terminal: "text-green-400",
};

export default function CourseTile({ course }: CourseTileProps) {
  const gradient =
    CARD_GRADIENTS[course.icon_name] ?? "from-accent/20 via-surface to-surface";
  const iconColor = ICON_COLORS[course.icon_name] ?? "text-accent";

  return (
    <motion.article
      whileHover={{
        scale: 1.025,
        boxShadow:
          "0 12px 48px rgba(0,0,0,0.7), 0 0 24px rgba(108,99,255,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`grain-overlay relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient} shadow-card`}
    >
      {/* Subtle glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-current opacity-5 blur-2xl"
      />

      <div className="relative flex flex-col gap-4 p-5">
        {/* Icon + badge */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${iconColor}`}
          >
            <CourseIcon iconName={course.icon_name} size={22} />
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              course.progress >= 80
                ? "bg-success/15 text-success"
                : course.progress >= 50
                ? "bg-warning/15 text-warning"
                : "bg-accent/15 text-accent"
            }`}
          >
            {course.progress >= 80
              ? "Almost done"
              : course.progress >= 50
              ? "Halfway"
              : "In progress"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold leading-snug text-textPrimary line-clamp-2">
          {course.title}
        </h2>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-textSecondary">Progress</span>
            <span className={`text-xs font-bold ${iconColor}`}>
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} color={iconColor} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-textSecondary">
            {Math.ceil((100 - course.progress) / 10)} lessons left
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="rounded-lg bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-textPrimary transition-colors hover:bg-white/10"
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
