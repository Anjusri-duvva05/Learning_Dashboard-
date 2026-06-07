"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";

interface DashboardShellProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const tileVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function DashboardShell({ courses }: DashboardShellProps) {
  return (
    <section
      className="min-h-screen p-4 pb-20 md:p-6 lg:p-8 md:pb-8"
      aria-label="Dashboard content"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid auto-rows-min gap-4 lg:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Hero tile — full width */}
        <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
          <HeroTile courseCount={courses.length} />
        </motion.div>

        {/* Activity tile — spans 2 cols on large */}
        <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
          <ActivityTile />
        </motion.div>

        {/* Stats tile */}
        <motion.div variants={tileVariants} className="col-span-1">
          <StatsTile courses={courses} />
        </motion.div>

        {/* Course tiles */}
        {courses.map((course) => (
          <motion.div key={course.id} variants={tileVariants} className="col-span-1">
            <CourseTile course={course} />
          </motion.div>
        ))}

        {/* Fallback if no courses */}
        {courses.length === 0 && (
          <motion.div
            variants={tileVariants}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <article className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center shadow-card h-full min-h-[180px]">
              <p className="text-textSecondary text-sm">
                No courses found. Add some rows to your Supabase{" "}
                <code className="font-mono text-accent">courses</code> table.
              </p>
            </article>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
