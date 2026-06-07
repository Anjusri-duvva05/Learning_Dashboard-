import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase";
import type { Course } from "@/types";
import Sidebar from "@/components/Sidebar";
import DashboardShell from "@/components/DashboardShell";
import SkeletonDashboard from "@/components/SkeletonDashboard";

const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code",
    created_at: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    progress: 45,
    icon_name: "FileCode",
    created_at: new Date(Date.now() - 3600000 * 24 * 8).toISOString(),
  },
  {
    id: "3",
    title: "Next.js 14 & App Router",
    progress: 90,
    icon_name: "Layers",
    created_at: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
  },
  {
    id: "4",
    title: "Node.js Backend Engineering",
    progress: 30,
    icon_name: "Server",
    created_at: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
  },
];

async function fetchCourses(): Promise<Course[]> {
  const supabase = createServerClient();
  if (!supabase) {
    console.log("Supabase not configured. Using local mock courses.");
    return MOCK_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn(`Database connection error, falling back to mock courses: ${error.message}`);
      return MOCK_COURSES;
    }

    return (data as Course[]) ?? [];
  } catch (err) {
    console.warn("Unhandled exception fetching from Supabase, falling back to mock courses:", err);
    return MOCK_COURSES;
  }
}

async function DashboardContent() {
  const courses = await fetchCourses();
  return <DashboardShell courses={courses} />;
}

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="relative flex-1 overflow-y-auto">
        <Suspense fallback={<SkeletonDashboard />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
